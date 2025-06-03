import React, { useState } from 'react';

const EstudianteForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState({
    cod_e: "",
    nom_e: "",
    dir_e: "",
    tel_e: "",
    fech_nac: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Error al crear estudiante")
      setForm({ cod_e: "", nom_e: "", dir_e: "", tel_e: "", fech_nac: "" })
      onSuccess()
    } catch (error) {
      console.error("Error al enviar formulario:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6 bg-white p-6 rounded shadow">
      <input name="cod_e" value={form.cod_e} onChange={handleChange} placeholder="Código" className="input" required />
      <input name="nom_e" value={form.nom_e} onChange={handleChange} placeholder="Nombre" className="input" required />
      <input name="dir_e" value={form.dir_e} onChange={handleChange} placeholder="Dirección" className="input" />
      <input name="tel_e" value={form.tel_e} onChange={handleChange} placeholder="Teléfono" className="input" />
      <input type="date" name="fech_nac" value={form.fech_nac} onChange={handleChange} className="input" />
      <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Registrar</button>
    </form>
  )
}


export default EstudianteForm;
