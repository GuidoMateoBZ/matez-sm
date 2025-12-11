// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { db } from "../firebase/config"; // Importamos la base de datos
import { collection, addDoc } from "firebase/firestore"; // Funciones de Firestore

export default function AdminDashboard() {
  // Estado para guardar los datos del formulario
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagen: "", // Por ahora será una URL de Google Imágenes
    descripcion: ""
  });

  // Estado para saber si se está enviando (feedback visual)
  const [loading, setLoading] = useState(false);

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Decimos "en qué colección" guardar (si no existe, Firebase la crea)
      const productsCollection = collection(db, "products");
      
      // 2. Guardamos el documento
      // Convertimos precio a número con Number() para poder filtrar después
      await addDoc(productsCollection, {
        ...form,
        precio: Number(form.precio) 
      });

      alert("¡Mate agregado con éxito! 🧉");
      
      // 3. Limpiamos el formulario
      setForm({ nombre: "", precio: "", categoria: "", imagen: "", descripcion: "" });
      
    } catch (error) {
      console.error("Error agregando producto:", error);
      alert("Hubo un error al subir el producto.");
    }
    
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h2>Panel de Administración</h2>
      <p>Carga un nuevo producto al catálogo.</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {/* Nombre */}
        <div>
          <label>Nombre del Mate:</label>
          <input 
            type="text" 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            required 
            placeholder="Ej: Mate Torpedo Imperial"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Precio */}
        <div>
          <label>Precio:</label>
          <input 
            type="number" 
            name="precio" 
            value={form.precio} 
            onChange={handleChange} 
            required 
            placeholder="Ej: 15000"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Categoría */}
        <div>
          <label>Categoría:</label>
          <select 
            name="categoria" 
            value={form.categoria} 
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Selecciona una opción</option>
            <option value="mate">Mate</option>
            <option value="bombilla">Bombilla</option>
            <option value="accesorio">Accesorio</option>
            <option value="termo">Termo</option>
            <option value="combo">Combo</option>
            <option value="matera">Matera</option>
          </select>
        </div>

        {/* Imagen (URL) */}
        <div>
          <label>URL de la imagen:</label>
          <input 
            type="text" 
            name="imagen" 
            value={form.imagen} 
            onChange={handleChange} 
            placeholder="https://..."
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Descripción */}
        <div>
            <label>Descripción:</label>
            <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows="3"
                style={{ width: "100%", padding: "8px" }}
            />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "10px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none" }}
        >
          {loading ? "Subiendo..." : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
}