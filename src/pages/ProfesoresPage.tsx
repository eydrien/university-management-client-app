import { useEffect, useState } from "react";
import api from "../services/api";

type Profesor = {
  codigo: string;
  nombre: string;
  // Agrega más campos si tu modelo lo requiere
};

function ProfesoresPage() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  useEffect(() => {
    api.get("/profesores")
      .then(res => setProfesores(res.data))
      .catch(err => console.error("Error al cargar profesores:", err));
  }, []);

  return (
    <div>
      <h1>Profesores</h1>
      <ul>
        {profesores.map(prof => (
          <li key={prof.codigo}>{prof.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProfesoresPage;
