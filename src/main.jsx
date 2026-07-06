import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './styles/globals.css'

// One-time cleanup: purge any stale admin-draft-* entries from localStorage.
// The app always reads from JSON source files, not from browser cache.
Object.keys(localStorage)
  .filter(k => k.startsWith('admin-draft-'))
  .forEach(k => localStorage.removeItem(k));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
