import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Importamos nuestro proveedor
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos la App para que TODOS los componentes accedan al usuario */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)