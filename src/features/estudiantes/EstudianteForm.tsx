import React, { useState } from "react";
import { createEstudiante } from "../../services/EstudiantesService";

const EstudianteForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState({
    cod_e: "",
    nom_e: "",
    dir_e: "",
    tel_e: "",
    fech_nac: "",
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const estudiante = {
        ...form,
        cod_e: Number(form.cod_e),
        fech_nac: form.fech_nac.slice(0, 10),
      };

      await createEstudiante(estudiante);
      setAlert({ type: "success", message: "Estudiante creado con éxito 🎉" });

      setForm({ cod_e: "", nom_e: "", dir_e: "", tel_e: "", fech_nac: "" });
      onSuccess();
    } catch (error) {
      setAlert({ type: "error", message: "Error al crear el estudiante 😓" });
      console.error("Error en el envío:", error);
    }

    // Ocultar alerta después de 4 segundos
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div>
      {alert && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${
            alert.type === "success"
              ? "text-green-800 bg-green-100"
              : "text-red-800 bg-red-100"
          }`}
          role="alert"
        >
          {alert.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-6 bg-white p-6 rounded shadow"
      >
        <input
          name="cod_e"
          value={form.cod_e}
          onChange={handleChange}
          placeholder="Código"
          className="rounded p-2 w-full"
          required
        />
        <input
          name="nom_e"
          value={form.nom_e}
          onChange={handleChange}
          placeholder="Nombre"
          className="rounded p-2 w-full"
          required
        />
        <input
          name="dir_e"
          value={form.dir_e}
          onChange={handleChange}
          placeholder="Dirección"
          className="rounded p-2 w-full"
        />
        <input
          name="tel_e"
          value={form.tel_e}
          onChange={handleChange}
          placeholder="Teléfono"
          className="rounded p-2 w-full"
        />
        <input
          type="date"
          name="fech_nac"
          value={form.fech_nac}
          onChange={handleChange}
          className="rounded p-2 w-full"
        />
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default EstudianteForm;
