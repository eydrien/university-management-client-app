import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import type { Asignatura } from "../../types/Asignatura"

interface Props {
  isOpen: boolean
  onClose: () => void
  asignatura: Asignatura | null
  onSave: (data: Asignatura) => void
}

const AsignaturaModal = ({ isOpen, onClose, asignatura, onSave }: Props) => {
  if (!asignatura) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const data: Asignatura = {
      cod_a: asignatura.cod_a, // Código no editable
      nom_a: formData.get("nom_a") as string,
      int_h: parseInt(formData.get("int_h") as string),
      creditos: parseInt(formData.get("creditos") as string),
    }

    if (!data.nom_a.trim() || isNaN(data.int_h) || isNaN(data.creditos)) {
      alert("Por favor completa todos los campos correctamente.")
      return
    }

    onSave(data)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <Dialog.Title className="text-xl font-bold text-blue-700 mb-4">
                Editar Asignatura
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="cod_a" value={asignatura.cod_a} />

                <div>
                  <label className="block mb-1 font-medium">Nombre</label>
                  <input
                    name="nom_a"
                    defaultValue={asignatura.nom_a}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Intensidad Horaria</label>
                  <input
                    type="number"
                    name="int_h"
                    defaultValue={asignatura.int_h}
                    className="w-full border px-3 py-2 rounded"
                    min={1}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Créditos</label>
                  <input
                    type="number"
                    name="creditos"
                    defaultValue={asignatura.creditos}
                    className="w-full border px-3 py-2 rounded"
                    min={1}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AsignaturaModal
