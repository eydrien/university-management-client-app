import React, { useState } from "react";
import { createEstudiante } from "../../services/EstudiantesService";

const EstudianteForm = ({ onSuccess }: { onSuccess: () => void }) => {
  // Estado para controlar el formulario
  const [form, setForm] = useState({
    cod_e: "",
    nom_e: "",
    dir_e: "",
    tel_e: "",
    fech_nac: "",
  });

  // Estado para mostrar alertas de éxito o error
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Manejador para los cambios en cada input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación mínima para evitar NaN
    if (isNaN(Number(form.cod_e))) {
      setAlert({ type: "error", message: "El código debe ser numérico 🧮" });
      return;
    }

    try {
      const estudiante = {
        ...form,
        cod_e: Number(form.cod_e),
        fech_nac: form.fech_nac.slice(0, 10),
      };

      await createEstudiante(estudiante);
      setAlert({ type: "success", message: "Estudiante creado con éxito 🎉" });

      // Limpiar formulario
      setForm({ cod_e: "", nom_e: "", dir_e: "", tel_e: "", fech_nac: "" });

      // Notificar al padre para recargar datos
      onSuccess();
    } catch (error) {
      setAlert({ type: "error", message: "Error al crear el estudiante 😓 Llene todos los campos" });
      console.error("Error en el envío:", error);
    }

    // Ocultar alerta después de 4 segundos
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div>
      {/* Alerta visual de éxito o error */}
      {alert && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg transition-all duration-300 ${
            alert.type === "success"
              ? "text-green-800 bg-green-100 border border-green-300"
              : "text-red-800 bg-red-100 border border-red-300"
          }`}
          role="alert"
          aria-live="polite"
        >
          {alert.message}
        </div>
      )}

      {/* Formulario para registrar estudiante */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-white p-6 rounded shadow"
      >
        <input
          name="cod_e"
          value={form.cod_e}
          onChange={handleChange}
          placeholder="Código"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="nom_e"
          value={form.nom_e}
          onChange={handleChange}
          placeholder="Nombre"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="dir_e"
          value={form.dir_e}
          onChange={handleChange}
          placeholder="Dirección"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
        />
        <input
          name="tel_e"
          value={form.tel_e}
          onChange={handleChange}
          placeholder="Teléfono"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
        />
        <input
          type="date"
          name="fech_nac"
          value={form.fech_nac}
          onChange={handleChange}
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default EstudianteForm;
