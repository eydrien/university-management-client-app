import React, { useState } from "react";
import { createProfesor } from "../../services/ProfesoresService";
import type { Profesor } from "../../types/Profesor";

type ProfesorFormType = {
  id_p: string;
  nom_p: string;
  dir_p: string;
  tel_p: string;
  profesion: string;
};

const ProfesorForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState<ProfesorFormType>({
    id_p: "",
    nom_p: "",
    dir_p: "",
    tel_p: "",
    profesion: "",
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(Number(form.id_p)) || Number(form.id_p) <= 0) {
      setAlert({ type: "error", message: "El ID debe ser un número positivo 🧮" });
      return;
    }
    if (!form.nom_p.trim() || !form.dir_p.trim() || !form.profesion.trim()) {
      setAlert({ type: "error", message: "Todos los campos son obligatorios" });
      return;
    }
    if (isNaN(Number(form.tel_p)) || Number(form.tel_p) <= 0) {
      setAlert({ type: "error", message: "El teléfono debe ser un número válido 🧮" });
      return;
    }

    try {
      const nuevoProfesor: Profesor = {
        id_p: Number(form.id_p),
        nom_p: form.nom_p,
        dir_p: form.dir_p,
        tel_p: Number(form.tel_p),
        profesion: form.profesion,
      };

      await createProfesor(nuevoProfesor);
      setAlert({ type: "success", message: "Profesor creado con éxito 🎉" });

      setForm({
        id_p: "",
        nom_p: "",
        dir_p: "",
        tel_p: "",
        profesion: "",
      });

      onSuccess();
    } catch (error) {
      console.error("Error al crear profesor:", error);
      setAlert({ type: "error", message: "Error al crear el profesor 😓" });
    }

    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div>
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

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-white p-6 rounded shadow"
      >
        <input
          name="id_p"
          value={form.id_p}
          onChange={handleChange}
          placeholder="ID Profesor"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="nom_p"
          value={form.nom_p}
          onChange={handleChange}
          placeholder="Nombre"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="dir_p"
          value={form.dir_p}
          onChange={handleChange}
          placeholder="Dirección"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="tel_p"
          value={form.tel_p}
          onChange={handleChange}
          placeholder="Teléfono"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="profesion"
          value={form.profesion}
          onChange={handleChange}
          placeholder="Profesión"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
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

export default ProfesorForm;
