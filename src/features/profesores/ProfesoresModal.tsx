import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import type { Profesor } from "../../types/Profesor"

interface Props {
  isOpen: boolean
  onClose: () => void
  profesor: Profesor | null
  onSave: (data: Profesor) => void
}

const ProfesorModal = ({ isOpen, onClose, profesor, onSave }: Props) => {
  if (!profesor) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const data: Profesor = {
      id_p: profesor.id_p, // ID no editable
      nom_p: (formData.get("nom_p") as string).trim(),
      dir_p: (formData.get("dir_p") as string).trim(),
      tel_p: Number(formData.get("tel_p")),
      profesion: (formData.get("profesion") as string).trim(),
    }

    if (
      !data.nom_p ||
      !data.dir_p ||
      isNaN(data.tel_p) ||
      !data.profesion
    ) {
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
                Editar Profesor
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="id_p" value={profesor.id_p} />

                <div>
                  <label className="block mb-1 font-medium">Nombre</label>
                  <input
                    name="nom_p"
                    defaultValue={profesor.nom_p}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Dirección</label>
                  <input
                    name="dir_p"
                    defaultValue={profesor.dir_p}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Teléfono</label>
                  <input
                    type="number"
                    name="tel_p"
                    defaultValue={profesor.tel_p}
                    className="w-full border px-3 py-2 rounded"
                    min={0}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Profesión</label>
                  <input
                    name="profesion"
                    defaultValue={profesor.profesion}
                    className="w-full border px-3 py-2 rounded"
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

export default ProfesorModal
