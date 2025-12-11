// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase/config"; // Importamos la base de datos
import { collection, getDocs } from "firebase/firestore"; // Funciones de Firestore (BD)
import { useAuth } from "../context/AuthContext"; // Importamos nuestro hook personalizado de autenticación

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Función para pedir los datos a Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products"); 
        const snapshot = await getDocs(productsRef);
        
        // 2. Mapeamos los documentos obtenidos
        // snapshot.docs es un array de documentos "crudos"
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id, // Es importante guardar el ID de Firebase
          ...doc.data() // Esparce el resto de datos (nombre, precio, etc.)
        }));

        setProducts(productsList);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío [] significa "ejecutar solo una vez al montar"

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      
      {/* Encabezado */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Tienda de Mates 🧉</h1>
        {user ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Modo Administrador ({user.email})
          </p>
        ) : (
          <p>Elegí el mate que vos quieras</p>
        )}
      </div>

      {/* Estado de Carga */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando catálogo...</p>
      ) : (
        /* Grilla de Productos */
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "20px" 
        }}>
          {products.map((prod) => (
            <div 
              key={prod.id} 
              style={{ 
                border: "1px solid #ddd", 
                borderRadius: "8px", 
                overflow: "hidden", 
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "transform 0.2s"
              }}
            >
              {/* Imagen */}
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img 
                  src={prod.imagen} 
                  alt={prod.nombre} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  onError={(e) => e.target.src = "https://via.placeholder.com/200?text=Sin+Imagen"} // Fallback si la url está rota
                />
              </div>

              {/* Info del producto */}
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>{prod.nombre}</h3>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>{prod.categoria}</p>
                <p style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#28a745" }}>
                  ${prod.precio.toLocaleString()} {/* Formato de moneda */}
                </p>
                <button style={{ 
                  width: "100%", 
                  padding: "10px", 
                  backgroundColor: "#007bff", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "5px",
                  cursor: "pointer"
                }}>
                  Ver Detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje si no hay productos */}
      {!loading && products.length === 0 && (
        <p style={{ textAlign: "center" }}>No hay productos disponibles por el momento.</p>
      )}
    </div>
  );
}