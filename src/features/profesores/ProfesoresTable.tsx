import type { Profesor } from "../../types/Profesor";

interface Props {
  profesores: Profesor[];
  onEdit: (profesor: Profesor) => void;
  onDelete: (id: number) => void;
}

const ProfesorTable = ({ profesores, onEdit, onDelete }: Props) => {
  const handleEdit = (profesor: Profesor) => () => onEdit(profesor);
  const handleDelete = (id: number) => () => onDelete(id);

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-blue-100 text-blue-900">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Dirección</th>
          <th className="p-2 border">Teléfono</th>
          <th className="p-2 border">Profesión</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {profesores.map((p) => (
          <tr key={p.id_p} className="hover:bg-gray-50">
            <td className="p-2 border text-center">{p.id_p}</td>
            <td className="p-2 border">{p.nom_p}</td>
            <td className="p-2 border">{p.dir_p}</td>
            <td className="p-2 border text-center">{p.tel_p}</td>
            <td className="p-2 border">{p.profesion}</td>
            <td className="p-2 border">
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <button
                  onClick={handleEdit(p)}
                  title="Editar profesor"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete(p.id_p)}
                  title="Eliminar profesor"
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

export default ProfesorTable;
