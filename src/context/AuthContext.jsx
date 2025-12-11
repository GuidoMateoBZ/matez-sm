// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// 1. Creamos el contexto (la "nube" de información)
const AuthContext = createContext();

// 2. Creamos un hook propio para usar este contexto fácilmente
// Esto es buena práctica: abstraemos la complejidad de useContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

// 3. El componente proveedor (el que envuelve a la app)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta una sola vez cuando carga la app
  useEffect(() => {
    // onAuthStateChanged es un "escucha" de Firebase.
    // Nos avisa automáticamente si el usuario se logueó o deslogueó.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Usuario detectado:", currentUser); // Para depurar
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiamos el escucha al salir
  }, []);

  // Exponemos el usuario y el estado de carga a toda la app
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}