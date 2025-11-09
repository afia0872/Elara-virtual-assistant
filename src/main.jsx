import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UserContext from './context/UserContext.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // Use StrictMode for development checks
  <StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </StrictMode>
);
