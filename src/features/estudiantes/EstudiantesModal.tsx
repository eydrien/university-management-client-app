import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import type { Estudiante } from "../../types/Estudiante"

interface Props {
  isOpen: boolean          // Controla si el modal está abierto o cerrado
  onClose: () => void      // Función para cerrar el modal
  estudiante: Estudiante | null  // Datos del estudiante a editar (o null si no hay)
  onSave: (data: Estudiante) => void  // Función que se llama al guardar los cambios
}

const EstudianteModal = ({ isOpen, onClose, estudiante, onSave }: Props) => {
  // Si no hay estudiante, no renderiza nada
  if (!estudiante) return null

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // Construye un objeto Estudiante con los valores del formulario
    const data: Estudiante = {
      cod_e: estudiante.cod_e, // Mantiene el código original (no editable)
      nom_e: formData.get("nom_e") as string,
      dir_e: formData.get("dir_e") as string,
      tel_e: formData.get("tel_e") as string,
      fech_nac: formData.get("fech_nac") as string,
    }

    // Llama a la función para guardar los cambios
    onSave(data)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fondo oscuro con transición */}
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

        {/* Contenedor centrado para el modal */}
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
            {/* Panel principal del modal */}
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <Dialog.Title className="text-xl font-bold text-blue-700 mb-4">
                Editar Estudiante
              </Dialog.Title>

              {/* Formulario para editar estudiante */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="cod_e" value={estudiante.cod_e} />

                <div>
                  <label className="block mb-1 font-medium">Nombre</label>
                  <input
                    name="nom_e"
                    defaultValue={estudiante.nom_e}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Dirección</label>
                  <input
                    name="dir_e"
                    defaultValue={estudiante.dir_e}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Teléfono</label>
                  <input
                    name="tel_e"
                    defaultValue={estudiante.tel_e}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Fecha Nacimiento</label>
                  <input
                    type="date"
                    name="fech_nac"
                    defaultValue={estudiante.fech_nac?.slice(0, 10)} // Ajusta formato para input date
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                {/* Botones para cancelar o guardar */}
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

export default EstudianteModal
