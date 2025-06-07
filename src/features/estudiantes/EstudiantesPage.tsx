import { useEffect, useState } from "react"
import EstudianteForm from "./EstudianteForm"
import EstudianteTable from "./EstudianteTable"
import EstudianteModal from "./EstudiantesModal"
import { getEstudiantes, deleteEstudiante, updateEstudiante } from "../../services/EstudiantesService"
import type { Estudiante } from "../../types/Estudiante"
import { GraduationCap } from "lucide-react"

const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [estudianteAEditar, setEstudianteAEditar] = useState<Estudiante | null>(null)

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

  const handleDelete = async (codigo: number) => {
    const confirmed = confirm("¿Está seguro que desea eliminar este estudiante?")
    if (!confirmed) return

    try {
      await deleteEstudiante(codigo)
      alert("Estudiante eliminado correctamente")
      fetchEstudiantes()
    } catch (error) {
      console.error("Error al eliminar estudiante:", error)
      alert("Error al eliminar el estudiante")
    }
  }

  const handleEdit = (estudiante: Estudiante) => {
    setEstudianteAEditar(estudiante)
    setModalOpen(true)
  }

  const handleSave = async (data: Estudiante) => {
    try {
      await updateEstudiante(data.cod_e, data)
      alert("Estudiante actualizado correctamente")
      fetchEstudiantes()
      setModalOpen(false)
    } catch (error) {
      console.error("Error al actualizar estudiante:", error)
      alert("Error al actualizar estudiante")
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
        <EstudianteTable
          estudiantes={estudiantes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal para edición */}
      <EstudianteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        estudiante={estudianteAEditar}
        onSave={handleSave}
      />
    </div>
  )
}

export default EstudiantesPage
