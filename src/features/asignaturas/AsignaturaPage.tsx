import { useEffect, useState, useCallback } from "react";
import { useToast } from "../../context/ToastContext";
import { BookOpen} from "lucide-react";
import SearchBar from "../../components/SearchBar";

import { getAsignaturas, updateAsignatura, deleteAsignatura } from "../../services/AsignaturasService";
import type { Asignatura } from "../../types/Asignatura";

import AsignaturaForm from "./AsignaturaForm";
import AsignaturaTable from "./AsignaturaTable";
import AsignaturaModal from "./AsignaturaModal";

const AsignaturasPage = () => {
  // Estado para lista, carga, modal y asignatura a editar
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [asignaturaAEditar, setAsignaturaAEditar] = useState<Asignatura | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { showToast } = useToast();

  // Fetch inicial y al actualizar
  const fetchAsignaturas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAsignaturas();
      setAsignaturas(data);
    } catch (error) {
      console.error("Error cargando asignaturas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAsignaturas();
  }, [fetchAsignaturas]);

  // Delete con confirmación
  const handleDelete = async (cod_a: number) => {
    if (!confirm("¿Está seguro que desea eliminar esta asignatura?")) return;

    try {
      await deleteAsignatura(cod_a);
      showToast("Asignatura eliminada correctamente", "success");
      fetchAsignaturas();
    } catch (error) {
      console.error("Error al eliminar asignatura:", error);
      showToast("Error al eliminar asignatura", "error");
    }
  };

  // Abrir modal para editar
  const handleEdit = (asignatura: Asignatura) => {
    setAsignaturaAEditar(asignatura);
    setModalOpen(true);
  };

  // Guardar cambios desde modal (editar)
  const handleSave = async (data: Asignatura) => {
    try {
      await updateAsignatura(data.cod_a, {
        nom_a: data.nom_a,
        int_h: data.int_h,
        creditos: data.creditos,
      });
      showToast("Asignatura actualizada correctamente", "success");
      fetchAsignaturas();
      setModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar asignatura:", error);
      showToast("Error al actualizar asignatura", "error");
    }
  };

  // Filtrar asignaturas según búsqueda (por código o nombre)
  const filteredAsignaturas = asignaturas.filter((a) => {
    const term = searchTerm.toLowerCase();
    return (
      a.nom_a.toLowerCase().includes(term) ||
      a.cod_a.toString().includes(term)
    );
  });

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <  BookOpen className="w-8 h-8 text-blue-700" />
        <h1 className="text-3xl font-bold text-blue-800">Gestión de Asignaturas</h1>
      </div>

      <div className="mb-8">
        <AsignaturaForm onSuccess={fetchAsignaturas} />
      </div>

      {/* Barra de búsqueda arriba de la tabla */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por código o nombre..."
      />

      {loading ? (
        <p className="text-gray-500 text-lg">Cargando asignaturas...</p>
      ) : (
        <>
          {filteredAsignaturas.length === 0 ? (
            <p className="text-center text-gray-500">No hay registros que coincidan.</p>
          ) : (
            <AsignaturaTable
              asignaturas={filteredAsignaturas}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      )}

      <AsignaturaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        asignatura={asignaturaAEditar}
        onSave={handleSave}
      />
    </div>
  );
};

export default AsignaturasPage;
