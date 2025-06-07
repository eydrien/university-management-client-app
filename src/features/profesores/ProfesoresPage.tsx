import { useEffect, useState, useCallback } from "react";
import { useToast } from "../../context/ToastContext";
import { Users } from "lucide-react"; // Icono para Profesores
import SearchBar from "../../components/SearchBar";

import { getProfesores, updateProfesor, deleteProfesor } from "../../services/ProfesoresService";
import type { Profesor } from "../../types/Profesor";

import ProfesorForm from "./ProfesoresForm";
import ProfesorTable from "./ProfesoresTable";
import ProfesorModal from "./ProfesoresModal";

const ProfesoresPage = () => {
  // Estado para lista, carga, modal y profesor a editar
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [profesorAEditar, setProfesorAEditar] = useState<Profesor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { showToast } = useToast();

  // Fetch inicial y al actualizar
  const fetchProfesores = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProfesores();
      setProfesores(data);
    } catch (error) {
      console.error("Error cargando profesores:", error);
      showToast("Error cargando profesores", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchProfesores();
  }, [fetchProfesores]);

  // Delete con confirmación
  const handleDelete = async (id_p: number) => {
    if (!confirm("¿Está seguro que desea eliminar este profesor?")) return;

    try {
      await deleteProfesor(id_p);
      showToast("Profesor eliminado correctamente", "success");
      fetchProfesores();
    } catch (error) {
      console.error("Error al eliminar profesor:", error);
      showToast("Error al eliminar profesor", "error");
    }
  };

  // Abrir modal para editar
  const handleEdit = (profesor: Profesor) => {
    setProfesorAEditar(profesor);
    setModalOpen(true);
  };

  // Guardar cambios desde modal (editar)
  const handleSave = async (data: Profesor) => {
    try {
      await updateProfesor(data.id_p, {
        nom_p: data.nom_p,
        dir_p: data.dir_p,
        tel_p: data.tel_p,
        profesion: data.profesion,
      });
      showToast("Profesor actualizado correctamente", "success");
      fetchProfesores();
      setModalOpen(false);
      setProfesorAEditar(null);
    } catch (error) {
      console.error("Error al actualizar profesor:", error);
      showToast("Error al actualizar profesor", "error");
    }
  };

  // Filtrar profesores según búsqueda (por id o nombre)
  const filteredProfesores = profesores.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.nom_p.toLowerCase().includes(term) ||
      p.id_p.toString().includes(term)
    );
  });

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-blue-700" />
        <h1 className="text-3xl font-bold text-blue-800">Gestión de Profesores</h1>
      </div>

      <div className="mb-8">
        <ProfesorForm onSuccess={fetchProfesores} />
      </div>

      {/* Barra de búsqueda arriba de la tabla */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por código o nombre..."
      />

      {loading ? (
        <p className="text-gray-500 text-lg">Cargando profesores...</p>
      ) : (
        <>
          {filteredProfesores.length === 0 ? (
            <p className="text-center text-gray-500">No hay registros que coincidan.</p>
          ) : (
            <ProfesorTable
              profesores={filteredProfesores}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      )}

      <ProfesorModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setProfesorAEditar(null);
        }}
        profesor={profesorAEditar}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfesoresPage;
