import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import { ProgressProvider } from './context/ProgressContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import './styles/index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_bmVhcmJ5LWpheWJpcmQtNjkxNy5jbGVyay5hY2NvdW50cy5kZXYk';

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key in environment variables.");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <ProgressProvider>
          <WorkspaceProvider>
            <App />
          </WorkspaceProvider>
        </ProgressProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
