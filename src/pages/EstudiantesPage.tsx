import { useEffect, useState } from "react";
import api from "../services/api";

type Estudiante = {
  codigo: string;
  nombre: string;
  // agrega más campos si los necesitas
};

function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  useEffect(() => {
    api.get("/estudiantes")
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error("Error al cargar estudiantes:", err));
  }, []);

  return (
    <div>
      <h1>Estudiantes</h1>
      <ul>
        {estudiantes.map(est => (
          <li key={est.codigo}>{est.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default EstudiantesPage;
