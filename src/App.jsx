// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard"; // <-- Importamos la página de admin
import Login from "./pages/Login"; // <-- Importamos la página de login
import { ProtectedRoute } from "./components/ProtectedRoute"; // <-- Importamos al guardia de rutas
import { AuthProvider, useAuth } from "./context/AuthContext"; // <-- Importamos nuestro hook personalizado de autenticación
import Home from "./pages/Home"; // Página de catálogo (home)

function App() {
  return (
    <AuthProvider> {/* Proveemos el contexto de autenticación a toda la app */}
      <BrowserRouter>
        <Routes>
          {/* Ruta 1: El home (Catálogo) */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta 2: El Login */}
          <Route path="/login" element={<Login />} />

          {/* RUTA PROTEGIDA */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Ruta Comodín: Si escriben cualquier otra cosa, van al home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;