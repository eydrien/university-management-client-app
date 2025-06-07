import { useEffect, useState, useCallback } from "react"
import { useToast } from "../../context/ToastContext"
import EstudianteForm from "./EstudianteForm"
import EstudianteTable from "./EstudianteTable"
import EstudianteModal from "./EstudiantesModal"
import SearchBar from "../../components/SearchBar"
import { getEstudiantes, deleteEstudiante, updateEstudiante } from "../../services/EstudiantesService"
import type { Estudiante } from "../../types/Estudiante"
import { GraduationCap } from "lucide-react"

const EstudiantesPage = () => {
  // Estado para lista de estudiantes
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  // Estado para control de carga
  const [loading, setLoading] = useState(true)
  // Controla apertura/cierre del modal de edición
  const [modalOpen, setModalOpen] = useState(false)
  // Estudiante seleccionado para editar
  const [estudianteAEditar, setEstudianteAEditar] = useState<Estudiante | null>(null)
  // Estado para texto de búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  const { showToast } = useToast()

  /**
   * Función para obtener la lista completa de estudiantes desde la API.
   * Se usa useCallback para que no se re-cree en cada render.
   */
  const fetchEstudiantes = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getEstudiantes()
      setEstudiantes(data)
    } catch (error) {
      console.error("Error cargando estudiantes:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Carga inicial de estudiantes al montar el componente
  useEffect(() => {
    fetchEstudiantes()
  }, [fetchEstudiantes])

  /**
   * Elimina un estudiante tras confirmación.
   * Luego recarga la lista y muestra toast según resultado.
   */
  const handleDelete = async (codigo: number) => {
    const confirmed = confirm("¿Está seguro que desea eliminar este estudiante?")
    if (!confirmed) return

    try {
      await deleteEstudiante(codigo)
      showToast("Estudiante eliminado correctamente", "success")
      fetchEstudiantes()
    } catch (error) {
      console.error("Error al eliminar estudiante:", error)
      showToast("Error al eliminar el estudiante", "error")
    }
  }

  /**
   * Abre el modal con los datos del estudiante seleccionado para editar.
   */
  const handleEdit = (estudiante: Estudiante) => {
    setEstudianteAEditar(estudiante)
    setModalOpen(true)
  }

  /**
   * Actualiza un estudiante y recarga la lista.
   * Cierra el modal si todo sale bien.
   */
  const handleSave = async (data: Estudiante) => {
    try {
      await updateEstudiante(data.cod_e, data)
      showToast("Estudiante actualizado correctamente", "success")
      fetchEstudiantes()
      setModalOpen(false)
    } catch (error) {
      console.error("Error al actualizar estudiante:", error)
      showToast("Error al actualizar estudiante", "error")
    }
  }

  /**
   * Filtra la lista de estudiantes por nombre según searchTerm.
   */
 const estudiantesFiltrados = estudiantes.filter((e) => {
  const term = searchTerm.toLowerCase().trim()
  // Buscar si el término está incluido en el nombre o en el código (convertido a string)
  return (
    e.nom_e.toLowerCase().includes(term) ||
    e.cod_e.toString().includes(term)
  )
})

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg">
      {/* Header con ícono y título */}
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-8 h-8 text-blue-700" />
        <h1 className="text-3xl font-bold text-blue-800">Gestión de Estudiantes</h1>
      </div>

      {/* Formulario para crear estudiantes */}
      <div className="mb-8">
        <EstudianteForm onSuccess={fetchEstudiantes} />
      </div>

      {/* Barra de búsqueda justo encima de la tabla */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar estudiantes por código o nombre..."
      />

      {/* Renderizado condicional según estado de carga y filtro */}
      {loading ? (
        <p className="text-gray-500 text-lg">Cargando estudiantes...</p>
      ) : estudiantesFiltrados.length === 0 ? (
        <p className="text-center text-gray-400 italic">No hay registros que coincidan.</p>
      ) : (
        <EstudianteTable
          estudiantes={estudiantesFiltrados}
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
