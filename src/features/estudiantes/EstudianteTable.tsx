import  type { Estudiante } from "../../types/Estudiante";

const EstudianteTable = ({ estudiantes }: { estudiantes: Estudiante[] }) => {
  return (
    <table className="w-full bg-white rounded shadow text-left">
      <thead>
        <tr className="bg-blue-100">
          <th className="px-4 py-2">Código</th>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Dirección</th>
          <th className="px-4 py-2">Teléfono</th>
          <th className="px-4 py-2">Fecha Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((e) => (
          <tr key={e.cod_e} className="border-t hover:bg-blue-50">
            <td className="px-4 py-2">{e.cod_e}</td>
            <td className="px-4 py-2">{e.nom_e}</td>
            <td className="px-4 py-2">{e.dir_e}</td>
            <td className="px-4 py-2">{e.tel_e}</td>
            <td className="px-4 py-2">{e.fech_nac?.slice(0,10)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default EstudianteTable;
