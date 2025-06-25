import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'

 const root=createRoot(document.getElementById('root'));root.render(
  <UserContext>
    <App />
  </UserContext>,
)
