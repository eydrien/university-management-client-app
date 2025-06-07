import type { Estudiante } from "../../types/Estudiante";

interface Props {
  estudiantes: Estudiante[];
  onEdit: (estudiante: Estudiante) => void;
  onDelete: (codigo: number) => void;
}

const EstudianteTable = ({ estudiantes, onEdit, onDelete }: Props) => {
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
            <td className="p-2 border">{new Date(e.fech_nac).toLocaleDateString()}</td>
            {/* <td className="px-4 py-2">{e.fech_nac?.slice(0,10)}</td> */}
            <td className="p-2 border flex justify-center gap-2">
              <button
                onClick={() => onEdit(e)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(e.cod_e)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EstudianteTable;
