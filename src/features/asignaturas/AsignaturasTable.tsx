import type { Asignatura } from "../../types/Asignatura";

interface Props {
  asignaturas: Asignatura[];
  onEdit: (asignatura: Asignatura) => void;
  onDelete: (codigo: number) => void;
}

const AsignaturaTable = ({ asignaturas, onEdit, onDelete }: Props) => {
  const handleEdit = (asignatura: Asignatura) => () => onEdit(asignatura);
  const handleDelete = (codigo: number) => () => onDelete(codigo);

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-blue-100 text-blue-900">
          <th className="p-2 border">Código</th>
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Int. Horaria</th>
          <th className="p-2 border">Créditos</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {asignaturas.map((a) => (
          <tr key={a.cod_a} className="hover:bg-gray-50">
            <td className="p-2 border text-center">{a.cod_a}</td>
            <td className="p-2 border">{a.nom_a}</td>
            <td className="p-2 border text-center">{a.int_h}</td>
            <td className="p-2 border text-center">{a.creditos}</td>
            <td className="p-2 border">
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <button
                  onClick={handleEdit(a)}
                  title="Editar asignatura"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete(a.cod_a)}
                  title="Eliminar asignatura"
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

export default AsignaturaTable;
