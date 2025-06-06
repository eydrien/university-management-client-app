import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal con scroll independiente */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
