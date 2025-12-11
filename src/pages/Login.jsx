// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Función de Firebase para loguearse
import { auth } from "../firebase/config"; // Nuestra conexión
import { useNavigate } from "react-router-dom"; // Hook para navegar entre páginas

export default function Login() {
  // 1. Estados para guardar lo que el usuario escribe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Herramienta para redirigir

  // 2. Función que se ejecuta al darle click a "Ingresar"
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue (comportamiento default de HTML)
    setError(""); // Limpiamos errores previos

    try {
      // Intentamos loguear con Firebase
      // "await" significa: esperá a que Firebase responda antes de seguir
      await signInWithEmailAndPassword(auth, email, password);
      
      // Si llegamos acá, es que salió bien
      console.log("Logueado con éxito");
      navigate("/"); // Redirigimos al Home (o al panel de admin luego)
      
    } catch (error) {
      // Si algo sale mal (contraseña incorrecta, usuario no existe), caemos acá
      console.error(error);
      setError("Error: Email o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
      <h1>Acceso Admin</h1>
      
      {/* Formulario */}
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <input
          type="email"
          placeholder="Tu email de admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Guardamos lo que se escribe
          required
          style={{ padding: "10px" }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px" }}
        />

        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Ingresar
        </button>

      </form>

      {/* Mensaje de error condicional: solo se ve si "error" tiene texto */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}