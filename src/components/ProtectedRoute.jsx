// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // 1. Mientras Firebase averigua si estás logueado, mostramos "Cargando..."
  if (loading) return <h1>Cargando...</h1>;

  // 2. Si terminó de cargar y NO hay usuario, te expulsa al Login
  if (!user) return <Navigate to="/login" />;

  // 3. Si hay usuario, te deja pasar y muestra el contenido (children)
  return <>{children}</>;
}