import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Reverted to default import as the App component is typically exported as default
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);