import { useEffect, useState } from "react";
import api from "../services/api";

type Imparte = {
  codigo_profesor: string;
  codigo_asignatura: string;
  grupo: string;
  semestre: string;
};

function ImpartePage() {
  const [registros, setRegistros] = useState<Imparte[]>([]);

  useEffect(() => {
    api.get("/imparte")
      .then(res => setRegistros(res.data))
      .catch(err => console.error("Error al cargar datos de imparte:", err));
  }, []);

  return (
    <div>
      <h1>Registros de Imparte</h1>
      <ul>
        {registros.map((reg, i) => (
          <li key={i}>
            {reg.codigo_profesor} imparte {reg.codigo_asignatura} - Grupo {reg.grupo} ({reg.semestre})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImpartePage;
