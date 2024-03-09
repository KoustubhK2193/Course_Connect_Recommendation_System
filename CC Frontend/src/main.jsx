import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DataProvider } from './custom_hooks/DataProvider';
import { CompareProvider } from './custom_hooks/CompareContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <CompareProvider>
    <DataProvider>

      <App />
    </DataProvider>
      </CompareProvider>
  </React.StrictMode>
);
