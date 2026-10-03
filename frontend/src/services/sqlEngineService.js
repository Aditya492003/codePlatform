import initSqlJs from 'sql.js';

let SQLModule = null;

/**
 * Initializes the SQL.js WebAssembly runtime.
 * Reuses instance if already loaded.
 */
export async function getSqlModule() {
  if (SQLModule) return SQLModule;
  try {
    // 1. Try loading directly from local frontend /public directory (offline-ready, zero latency)
    SQLModule = await initSqlJs({
      locateFile: (file) => `/${file}`,
    });
    return SQLModule;
  } catch (localErr) {
    console.warn('Local WASM load failed, falling back to CDN:', localErr);
    try {
      // 2. Fallback to Cloudflare CDN if local serving differs
      SQLModule = await initSqlJs({
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
      });
      return SQLModule;
    } catch (cdnErr) {
      console.error('Failed to initialize sql.js WASM:', cdnErr);
      throw new Error('Could not load SQL Engine. Please check that WebAssembly is supported in your browser.');
    }
  }
}

export class SqlEngine {
  constructor() {
    this.db = null;
    this.isReady = false;
  }

  /**
   * Initializes or restores a SQLite database instance.
   * @param {string|Uint8Array} binaryState - Optional base64 string or Uint8Array of database
   */
  async init(binaryState = null) {
    const SQL = await getSqlModule();

    if (binaryState) {
      let uInt8Array;
      if (typeof binaryState === 'string') {
        // Decode base64
        const binaryString = atob(binaryState);
        const len = binaryString.length;
        uInt8Array = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          uInt8Array[i] = binaryString.charCodeAt(i);
        }
      } else {
        uInt8Array = binaryState;
      }
      this.db = new SQL.Database(uInt8Array);
    } else {
      this.db = new SQL.Database();
    }

    // Enable foreign keys
    try {
      this.db.exec('PRAGMA foreign_keys = ON;');
    } catch (e) {
      console.warn('Could not enable foreign keys pragma:', e);
    }

    this.isReady = true;
    return this;
  }

  /**
   * Execute SQL query/script.
   * Supports multiple statements separated by semicolons.
   * Returns details of execution, results, and table schema diffs.
   */
  execute(sqlText) {
    if (!this.db || !this.isReady) {
      throw new Error('Database is not initialized.');
    }

    const trimmed = (sqlText || '').trim();
    if (!trimmed) {
      return {
        success: true,
        results: [],
        executionTimeMs: 0,
        statementCount: 0,
        totalRows: 0,
      };
    }

    const startTime = performance.now();

    try {
      // db.exec returns an array of { columns: string[], values: any[][] }
      const rawResults = this.db.exec(trimmed);
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

      let totalRows = 0;
      const formattedResults = rawResults.map((res, index) => {
        const rowCount = res.values ? res.values.length : 0;
        totalRows += rowCount;
        return {
          id: `res_${index}_${Date.now()}`,
          columns: res.columns,
          values: res.values,
          rowCount,
        };
      });

      // Introspect updated schema
      const schema = this.introspectSchema();

      return {
        success: true,
        results: formattedResults,
        schema,
        executionTimeMs,
        statementCount: rawResults.length || 1,
        totalRows,
        rowsModified: this.db.getRowsModified ? this.db.getRowsModified() : 0,
      };
    } catch (error) {
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      return {
        success: false,
        error: error.message || 'SQL execution failed.',
        executionTimeMs,
        results: [],
        schema: this.introspectSchema(),
      };
    }
  }

  /**
   * Introspects all user-defined tables, views, columns, and foreign keys.
   */
  introspectSchema() {
    if (!this.db || !this.isReady) return { tables: [] };

    try {
      const tableQuery = this.db.exec(
        "SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name ASC;"
      );

      if (!tableQuery || tableQuery.length === 0 || !tableQuery[0].values) {
        return { tables: [] };
      }

      const tables = tableQuery[0].values.map(([tableName, ddlSql]) => {
        // Get column details
        const colInfo = this.db.exec(`PRAGMA table_info("${tableName}");`);
        const columns = [];
        if (colInfo && colInfo.length > 0 && colInfo[0].values) {
          colInfo[0].values.forEach((row) => {
            columns.push({
              cid: row[0],
              name: row[1],
              type: row[2] || 'TEXT',
              notNull: row[3] === 1,
              defaultValue: row[4],
              isPk: row[5] === 1 || row[5] > 0,
            });
          });
        }

        // Get foreign keys
        const fkInfo = this.db.exec(`PRAGMA foreign_key_list("${tableName}");`);
        const foreignKeys = [];
        if (fkInfo && fkInfo.length > 0 && fkInfo[0].values) {
          fkInfo[0].values.forEach((row) => {
            foreignKeys.push({
              id: row[0],
              fromColumn: row[3],
              toTable: row[2],
              toColumn: row[4],
              onUpdate: row[5],
              onDelete: row[6],
            });
          });
        }

        // Get row count
        let rowCount = 0;
        try {
          const countRes = this.db.exec(`SELECT COUNT(*) FROM "${tableName}";`);
          if (countRes && countRes[0] && countRes[0].values && countRes[0].values[0]) {
            rowCount = countRes[0].values[0][0];
          }
        } catch (e) {
          console.warn(`Failed to count rows for ${tableName}:`, e);
        }

        // Get sample preview rows (first 15 rows)
        let sampleRows = [];
        let sampleCols = [];
        try {
          const sampleRes = this.db.exec(`SELECT * FROM "${tableName}" LIMIT 15;`);
          if (sampleRes && sampleRes[0]) {
            sampleCols = sampleRes[0].columns;
            sampleRows = sampleRes[0].values;
          }
        } catch (e) {
          console.warn(`Failed to get sample rows for ${tableName}:`, e);
        }

        return {
          name: tableName,
          ddlSql: ddlSql || '',
          columns,
          foreignKeys,
          rowCount,
          sampleCols,
          sampleRows,
        };
      });

      return { tables };
    } catch (err) {
      console.warn('Schema introspection error:', err);
      return { tables: [] };
    }
  }

  /**
   * Exports the entire database as a Base64 string for cloud saving.
   */
  exportBase64() {
    if (!this.db || !this.isReady) return '';
    try {
      const uInt8Array = this.db.export();
      let binary = '';
      const len = uInt8Array.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(uInt8Array[i]);
      }
      return btoa(binary);
    } catch (e) {
      console.error('Failed to export DB as Base64:', e);
      return '';
    }
  }

  /**
   * Exports the database as a downloadable Uint8Array Blob.
   */
  exportBlob() {
    if (!this.db || !this.isReady) return null;
    const uInt8Array = this.db.export();
    return new Blob([uInt8Array], { type: 'application/x-sqlite3' });
  }

  /**
   * Close and free memory.
   */
  close() {
    if (this.db) {
      try {
        this.db.close();
      } catch (e) {
        console.warn('Error closing db:', e);
      }
      this.db = null;
    }
    this.isReady = false;
  }
}
