import { useEffect, useState } from "react"
import EstudianteForm from "./EstudianteForm"
import EstudianteTable from "./EstudianteTable"
import { getEstudiantes } from "../../services/EstudiantesService"
import type { Estudiante } from "../../types/Estudiante"

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
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Gestión de Estudiantes</h1>

      <EstudianteForm onSuccess={fetchEstudiantes} />

      {loading ? (
        <p className="text-gray-600">Cargando estudiantes...</p>
      ) : (
        <EstudianteTable estudiantes={estudiantes} />
      )}
    </div>
  )
}

export default EstudiantesPage;