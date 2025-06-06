import { Link, useLocation } from "react-router-dom"
import {
  Home,
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const links = [
  { to: "/", label: "Inicio", icon: <Home size={20} /> },
  { to: "/estudiantes", label: "Estudiantes", icon: <GraduationCap size={20} /> },
  { to: "/asignaturas", label: "Asignaturas", icon: <BookOpen size={20} /> },
  { to: "/profesores", label: "Profesores", icon: <Users size={20} /> },
  { to: "/imparte", label: "Imparte", icon: <Layers size={20} /> },
]

export default function Sidebar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const toggleSidebar = () => setOpen(!open)

  return (
    <>
      {/* Botón hamburguesa (solo en móvil) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>

      {/* Fondo oscuro al abrir en móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block overflow-y-auto`}
      >
        <div className="relative p-6">
          {/* Botón cerrar (solo móvil) */}
          <button
            className="absolute top-4 right-4 md:hidden"
            onClick={toggleSidebar}
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold mb-8">Panel</h2>

          <nav className="flex flex-col space-y-4">
            {links.map(({ to, label, icon }) => {
              const isActive = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                    isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
                  }`}
                  onClick={() => setOpen(false)} // Cierra sidebar en móvil al hacer click
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
