import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar con ancho fijo */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Contenido principal que se ajusta automáticamente */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
