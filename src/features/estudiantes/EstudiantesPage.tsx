import { useEffect, useState } from "react"
import EstudianteForm from "./EstudianteForm"
import EstudianteTable from "./EstudianteTable"
import { getEstudiantes } from "../../services/EstudiantesService"
import type { Estudiante } from "../../types/Estudiante"
import { GraduationCap } from "lucide-react"

const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEstudiantes()
  }, [])

  const fetchEstudiantes = async () => {
    try {
      const data = await getEstudiantes()
      setEstudiantes(data)
    } catch (error) {
      console.error("Error cargando estudiantes:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-8 h-8 text-blue-700" />
        <h1 className="text-3xl font-bold text-blue-800">Gestión de Estudiantes</h1>
      </div>

      <div className="mb-8">
        <EstudianteForm onSuccess={fetchEstudiantes} />
      </div>

      {loading ? (
        <p className="text-gray-500 text-lg">Cargando estudiantes...</p>
      ) : (
        <EstudianteTable estudiantes={estudiantes} />
      )}
    </div>
  )
}

export default EstudiantesPage
