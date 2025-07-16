import { useEffect, useState } from "react";
import "animate.css/animate.min.css";
import "./App.css";

const colores = [
  "#288573ff",
  "#2b75a7ff",
  "#9b59b6",
  "#f39c12",
  "#e74c3c",
  "#1e894bff",
  "#34495e",
  "#7f8c8d"
];

const getRandomColor = () => {
  const i = Math.floor(Math.random() * colores.length);
  return colores[i];
};

const App = () => {
  const [frase, setFrase] = useState(null);
  const [color] = useState(getRandomColor());
  
  // Estados para el formulario
  const [nuevaFrase, setNuevaFrase] = useState("");
  const [nuevoAutor, setNuevoAutor] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [color]);

  useEffect(() => {
    const obtenerFrase = async () => {
      try {
        const res = await fetch("http://localhost:5000/frases");
        const data = await res.json();
        setFrase(data);
      } catch (err) {
        console.error("Error al obtener la frase:", err);
      }
    };
    obtenerFrase();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nuevaFrase.trim() || !nuevoAutor.trim()) {
      setMensaje("Por favor completa ambos campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/frases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frase: nuevaFrase, autor: nuevoAutor }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("Frase añadida con éxito!");
        setNuevaFrase("");
        setNuevoAutor("");
      } else {
        setMensaje(data.error || "Error al agregar la frase");
      }
    } catch (err) {
      setMensaje("Error en la conexión");
    }
  };

  return (
    <div className="quote-container">
      {frase && (
        <>
          <p className="animate__animated animate__fadeIn quote-text" style={{ color }}>
            "{frase.frase}"
          </p>
          <h5 className="animate__animated animate__fadeIn author-text" style={{ color }}>
            - {frase.autor}
          </h5>
        </>
      )}
      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: color,
          color: "#fff",
          border: "none",
          padding: "0.5rem 1.2rem",
          cursor: "pointer",
          borderRadius: "4px",
          marginBottom: "1rem"
        }}
      >
        Nueva Frase
      </button>
      <form onSubmit={handleSubmit} className="quote-form">
        <input
          type="text"
          placeholder="Nueva frase"
          value={nuevaFrase}
          onChange={(e) => setNuevaFrase(e.target.value)}
          style={{ backgroundColor: "white", color: color }}
        />
        <input
          type="text"
          placeholder="Autor"
          value={nuevoAutor}
          onChange={(e) => setNuevoAutor(e.target.value)}
          style={{ backgroundColor: "white", color: color }}
        />
        <button type="submit" style={{ backgroundColor: color }}>
          Añadir Frase
        </button>
      </form>
      {mensaje && (
        <p className="message" style={{ color }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default App;