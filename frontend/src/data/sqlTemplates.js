export const SQL_TEMPLATES = [
  {
    id: 'ECOMMERCE',
    name: '🛒 E-Commerce & Orders',
    description: 'Customers, Products, Orders, and Order Items with relational Foreign Keys & JOIN examples.',
    badge: 'Popular for JOINs',
    sql: `-- ==========================================
-- 🛒 E-COMMERCE RELATIONAL DATABASE
-- ==========================================

-- 1. Customers Table
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  city TEXT,
  country TEXT DEFAULT 'USA',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE products (
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  stock_quantity INTEGER DEFAULT 0
);

-- 3. Orders Table
CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  order_date TEXT DEFAULT CURRENT_TIMESTAMP,
  total_amount REAL NOT NULL,
  status TEXT DEFAULT 'Completed',
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- 4. Order Items (Bridge Table)
CREATE TABLE order_items (
  item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Seed Customers
INSERT INTO customers (first_name, last_name, email, city, country) VALUES
('Alex', 'Mercer', 'alex.mercer@example.com', 'San Francisco', 'USA'),
('Sophia', 'Chen', 'sophia.chen@example.com', 'Seattle', 'USA'),
('Liam', 'Smith', 'liam.smith@example.com', 'London', 'UK'),
('Emma', 'Watson', 'emma.watson@example.com', 'Toronto', 'Canada'),
('Raj', 'Patel', 'raj.patel@example.com', 'Mumbai', 'India');

-- Seed Products
INSERT INTO products (name, category, price, stock_quantity) VALUES
('Mechanical Keyboard', 'Electronics', 129.99, 45),
('Ultra-Wide Monitor 34"', 'Electronics', 499.00, 18),
('Ergonomic Mesh Chair', 'Furniture', 249.50, 30),
('Noise Cancelling Headphones', 'Audio', 199.99, 60),
('USB-C Docking Station', 'Accessories', 89.00, 100);

-- Seed Orders
INSERT INTO orders (customer_id, total_amount, status) VALUES
(1, 628.99, 'Completed'),
(2, 199.99, 'Completed'),
(1, 89.00, 'Shipped'),
(3, 249.50, 'Processing'),
(4, 748.50, 'Completed');

-- Seed Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 129.99),
(1, 2, 1, 499.00),
(2, 4, 1, 199.99),
(3, 5, 1, 89.00),
(4, 3, 1, 249.50),
(5, 2, 1, 499.00),
(5, 3, 1, 249.50);

-- ==========================================
-- 💡 SAMPLE QUERY: Multi-Table INNER JOIN
-- ==========================================
SELECT 
  o.order_id,
  c.first_name || ' ' || c.last_name AS customer_name,
  c.city,
  p.name AS product_name,
  oi.quantity,
  oi.unit_price,
  (oi.quantity * oi.unit_price) AS line_total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id ASC;
`,
  },
  {
    id: 'UNIVERSITY',
    name: '🎓 University & Enrollment',
    description: 'Departments, Professors, Students, Courses, and Grade Enrollments.',
    badge: 'Academic Relations',
    sql: `-- ==========================================
-- 🎓 UNIVERSITY ACADEMIC DATABASE
-- ==========================================

CREATE TABLE departments (
  dept_id INTEGER PRIMARY KEY AUTOINCREMENT,
  dept_name TEXT NOT NULL,
  building TEXT NOT NULL,
  budget REAL
);

CREATE TABLE professors (
  prof_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  dept_id INTEGER,
  title TEXT DEFAULT 'Assistant Professor',
  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE students (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  gpa REAL DEFAULT 3.0,
  dept_id INTEGER,
  enrollment_year INTEGER,
  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE courses (
  course_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  credits INTEGER DEFAULT 3,
  prof_id INTEGER,
  FOREIGN KEY (prof_id) REFERENCES professors(prof_id)
);

CREATE TABLE enrollments (
  enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  grade TEXT DEFAULT 'A',
  semester TEXT DEFAULT 'Fall 2026',
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO departments (dept_name, building, budget) VALUES
('Computer Science', 'Turing Hall', 1200000),
('Mathematics', 'Euler Hall', 850000),
('Physics', 'Newton Hall', 950000);

INSERT INTO professors (name, email, dept_id, title) VALUES
('Dr. Alan Walker', 'awalker@uni.edu', 1, 'Professor'),
('Dr. Evelyn Reed', 'ereed@uni.edu', 1, 'Associate Professor'),
('Dr. Isaac Vance', 'ivance@uni.edu', 3, 'Professor');

INSERT INTO students (full_name, gpa, dept_id, enrollment_year) VALUES
('Maya Lin', 3.92, 1, 2024),
('Ethan Hunt', 3.45, 1, 2025),
('Chloe Bennett', 3.88, 2, 2024),
('Devon Vance', 3.20, 3, 2025);

INSERT INTO courses (title, credits, prof_id) VALUES
('Database Systems & SQL', 4, 1),
('Data Structures & Algorithms', 4, 2),
('Quantum Mechanics I', 3, 3);

INSERT INTO enrollments (student_id, course_id, grade, semester) VALUES
(1, 1, 'A+', 'Fall 2026'),
(1, 2, 'A', 'Fall 2026'),
(2, 1, 'B+', 'Fall 2026'),
(3, 2, 'A', 'Fall 2026'),
(4, 3, 'A-', 'Fall 2026');

-- 💡 SAMPLE QUERY: Professor & Student Course Rosters
SELECT 
  c.title AS course_title,
  p.name AS professor,
  s.full_name AS student_name,
  e.grade,
  d.dept_name
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
JOIN professors p ON c.prof_id = p.prof_id
JOIN students s ON e.student_id = s.student_id
JOIN departments d ON s.dept_id = d.dept_id
ORDER BY c.title, s.full_name;
`,
  },
  {
    id: 'HOSPITAL',
    name: '🏥 Hospital & Medical Care',
    description: 'Doctors, Patients, Appointments, and Prescribed Medications.',
    badge: 'Real-world System',
    sql: `-- ==========================================
-- 🏥 HOSPITAL APPOINTMENTS & MEDICAL RECORDS
-- ==========================================

CREATE TABLE doctors (
  doctor_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  room_number TEXT,
  phone TEXT
);

CREATE TABLE patients (
  patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT,
  blood_group TEXT,
  allergies TEXT DEFAULT 'None'
);

CREATE TABLE appointments (
  appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  doctor_id INTEGER NOT NULL,
  patient_id INTEGER NOT NULL,
  appointment_date TEXT DEFAULT CURRENT_TIMESTAMP,
  diagnosis TEXT,
  status TEXT DEFAULT 'Scheduled',
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

INSERT INTO doctors (name, specialty, room_number, phone) VALUES
('Dr. Sarah Connor', 'Cardiology', 'Room 301', '555-0101'),
('Dr. Gregory House', 'Diagnostics', 'Room 404', '555-0102'),
('Dr. James Wilson', 'Oncology', 'Room 205', '555-0103');

INSERT INTO patients (name, age, gender, blood_group, allergies) VALUES
('John Doe', 42, 'Male', 'O+', 'Penicillin'),
('Jane Smith', 29, 'Female', 'A+', 'None'),
('Robert Drake', 58, 'Male', 'B-', 'Sulfa');

INSERT INTO appointments (doctor_id, patient_id, diagnosis, status) VALUES
(1, 1, 'Hypertension Checkup', 'Completed'),
(2, 2, 'Unexplained Fatigue', 'In Progress'),
(3, 3, 'Routine Oncology Followup', 'Scheduled');

-- 💡 SAMPLE QUERY: Today's Appointments with Doctor & Patient Details
SELECT 
  a.appointment_id,
  a.appointment_date,
  d.name AS doctor_name,
  d.specialty,
  d.room_number,
  p.name AS patient_name,
  p.age,
  p.blood_group,
  a.diagnosis,
  a.status
FROM appointments a
JOIN doctors d ON a.doctor_id = d.doctor_id
JOIN patients p ON a.patient_id = p.patient_id;
`,
  },
  {
    id: 'BLANK',
    name: '✨ Blank SQL Canvas',
    description: 'A completely empty database ready for your custom table designs, DDL, and queries.',
    badge: 'Empty Canvas',
    sql: `-- ==========================================
-- ✨ SQL PLAYGROUND - BLANK CANVAS
-- ==========================================
-- Type your DDL (CREATE TABLE) and DML (INSERT, SELECT) queries below!
-- Hit [Run Query (Ctrl + Enter)] to execute.
-- Your created tables will appear live side-by-side below!

CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  salary REAL NOT NULL,
  department TEXT
);

INSERT INTO employees (name, role, salary, department) VALUES
('Alice Johnson', 'Senior Engineer', 120000, 'Engineering'),
('Bob Smith', 'Product Designer', 95000, 'Design'),
('Charlie Rose', 'DevOps Lead', 115000, 'Infrastructure');

SELECT * FROM employees;
`,
  },
];
