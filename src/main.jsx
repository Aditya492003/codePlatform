import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ProgressProvider } from './context/ProgressContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <WorkspaceProvider>
          <App />
        </WorkspaceProvider>
      </ProgressProvider>
    </BrowserRouter>
  </React.StrictMode>
);
