import { useEffect, useState } from "react";
import api from "../services/api";

type Inscribe = {
  codigo_estudiante: string;
  codigo_asignatura: string;
  grupo: string;
  semestre: string;
  nota: number;
};

function InscribePage() {
  const [inscripciones, setInscripciones] = useState<Inscribe[]>([]);

  useEffect(() => {
    api.get("/inscribe")
      .then(res => setInscripciones(res.data))
      .catch(err => console.error("Error al cargar inscripciones:", err));
  }, []);

  return (
    <div>
      <h1>Registros de Inscripción</h1>
      <ul>
        {inscripciones.map((reg, i) => (
          <li key={i}>
            {reg.codigo_estudiante} se inscribió en {reg.codigo_asignatura} (Grupo {reg.grupo}, {reg.semestre}) - Nota: {reg.nota}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InscribePage;
