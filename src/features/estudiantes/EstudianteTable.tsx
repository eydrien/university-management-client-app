import type { Estudiante } from "../../types/Estudiante";

interface Props {
  estudiantes: Estudiante[];
  onEdit: (estudiante: Estudiante) => void;
  onDelete: (codigo: number) => void;
}

// Función auxiliar para formatear fechas (dd/mm/aaaa)
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const EstudianteTable = ({ estudiantes, onEdit, onDelete }: Props) => {
  // Handlers para evitar crear funciones inline dentro del render
  const handleEdit = (estudiante: Estudiante) => () => onEdit(estudiante);
  const handleDelete = (codigo: number) => () => onDelete(codigo);

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-blue-100 text-blue-900">
          <th className="p-2 border">Código</th>
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Dirección</th>
          <th className="p-2 border">Teléfono</th>
          <th className="p-2 border">Fecha Nac.</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((e) => (
          <tr key={e.cod_e} className="hover:bg-gray-50">
            <td className="p-2 border text-center">{e.cod_e}</td>
            <td className="p-2 border">{e.nom_e}</td>
            <td className="p-2 border">{e.dir_e}</td>
            <td className="p-2 border">{e.tel_e}</td>
            <td className="p-2 border">{formatDate(e.fech_nac)}</td>
            <td className="p-2 border">
              {/* Flex para mejor adaptación en pantallas pequeñas */}
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <button
                  onClick={handleEdit(e)}
                  title="Editar estudiante"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete(e.cod_e)}
                  title="Eliminar estudiante"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EstudianteTable;
