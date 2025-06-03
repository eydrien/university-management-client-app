import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import type { Estudiante } from "../types/Estudiante"

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Estudiante) => void
  initialData?: Estudiante
}

const EstudianteModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [form, setForm] = useState<Estudiante>({
    cod_e: 0,
    nom_e: "",
    dir_e: "",
    tel_e: 0,
    fech_nac: "",
  })

  const [error, setError] = useState<string | null>(null)

  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({
        cod_e: 0,
        nom_e: "",
        dir_e: "",
        tel_e: 0,
        fech_nac: "",
      })
      setError(null)
    }
  }, [initialData, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      // Mejor manejar tel_e como string, acá lo dejamos number pero ojo con NaN:
      [name]: name === "cod_e" || name === "tel_e" ? Number(value) : value,
    }))
  }

  const handleSubmit = () => {
    // Validaciones básicas y con feedback
    if (!form.nom_e.trim()) {
      setError("El nombre es obligatorio")
      return
    }
    if (!form.dir_e.trim()) {
      setError("La dirección es obligatoria")
      return
    }
    if (!form.tel_e || isNaN(form.tel_e) || form.tel_e <= 0) {
      setError("El teléfono debe ser un número positivo")
      return
    }
    if (!form.fech_nac.trim()) {
      setError("La fecha de nacimiento es obligatoria")
      return
    }

    setError(null)
    onSubmit(form)
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-12">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-xl font-semibold text-blue-800 mb-4">
                  {isEditing ? "Editar Estudiante" : "Nuevo Estudiante"}
                </Dialog.Title>

                {error && (
                  <p className="mb-2 text-red-600 font-semibold">{error}</p>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="cod_e"
                      type="number"
                      placeholder="Código"
                      value={form.cod_e}
                      onChange={handleChange}
                      className="border px-3 py-2 rounded-md w-full bg-gray-100 cursor-not-allowed"
                      disabled={isEditing}
                      required
                      autoFocus={!isEditing} // autofocus solo en nuevo
                    />
                    <input
                      name="tel_e"
                      type="number"
                      placeholder="Teléfono"
                      value={form.tel_e || ""}
                      onChange={handleChange}
                      className="border px-3 py-2 rounded-md w-full"
                      required
                    />
                  </div>

                  <input
                    name="nom_e"
                    type="text"
                    placeholder="Nombre"
                    value={form.nom_e}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded-md w-full"
                    required
                  />
                  <input
                    name="dir_e"
                    type="text"
                    placeholder="Dirección"
                    value={form.dir_e}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded-md w-full"
                    required
                  />
                  <input
                    name="fech_nac"
                    type="date"
                    value={form.fech_nac}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded-md w-full"
                    required
                  />

                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {isEditing ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EstudianteModal
