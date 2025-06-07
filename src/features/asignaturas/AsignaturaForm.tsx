import React, { useState } from "react";
import { createAsignatura } from "../../services/AsignaturasService";
import type { Asignatura } from "../../types/Asignatura";

type AsignaturaFormType = {
  cod_a: string;
  nom_a: string;
  int_h: string;
  creditos: string;
};

const AsignaturaForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState<AsignaturaFormType>({
    cod_a: "",
    nom_a: "",
    int_h: "",
    creditos: "",
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

    if (isNaN(Number(form.cod_a))) {
      setAlert({ type: "error", message: "El código debe ser numérico 🧮" });
      return;
    }

    try {
      const nuevaAsignatura: Asignatura = {
        cod_a: Number(form.cod_a),
        nom_a: form.nom_a,
        int_h: Number(form.int_h),
        creditos: Number(form.creditos),
      };

      await createAsignatura(nuevaAsignatura);
      setAlert({ type: "success", message: "Asignatura creada con éxito 🎉" });

      setForm({
        cod_a: "",
        nom_a: "",
        int_h: "",
        creditos: "",
      });

      onSuccess();
    } catch (error) {
      console.error("Error al crear asignatura:", error);
      setAlert({ type: "error", message: "Error al crear la asignatura 😓" });
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
          name="cod_a"
          value={form.cod_a}
          onChange={handleChange}
          placeholder="Código"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="nom_a"
          value={form.nom_a}
          onChange={handleChange}
          placeholder="Nombre"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="int_h"
          value={form.int_h}
          onChange={handleChange}
          placeholder="Intensidad horaria"
          className="rounded p-2 border border-gray-300 focus:ring focus:ring-blue-200 w-full"
          required
        />
        <input
          name="creditos"
          value={form.creditos}
          onChange={handleChange}
          placeholder="Créditos"
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

export default AsignaturaForm;
