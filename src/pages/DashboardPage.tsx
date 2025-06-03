// src/pages/DashboardPage.tsx
import { BookOpen, Users, UserCheck, ClipboardList, GraduationCap } from "lucide-react"

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-6 space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Panel Admin</h2>
        <nav className="flex flex-col space-y-3">
          <SidebarLink label="Inicio" />
          <SidebarLink label="Estudiantes" />
          <SidebarLink label="Profesores" />
          <SidebarLink label="Asignaturas" />
          <SidebarLink label="Imparte" />
          <SidebarLink label="Inscribe" />
        </nav>
        <footer className="mt-auto text-sm text-blue-200">
          © {new Date().getFullYear()} Universidad Fic
        </footer>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Dashboard General</h1>
          <p className="text-gray-600">Resumen del sistema académico actualizado.</p>
        </header>

        {/* Grid de módulos */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard title="Estudiantes" value="1,245" icon={<Users className="w-6 h-6" />} />
          <MetricCard title="Profesores" value="78" icon={<UserCheck className="w-6 h-6" />} />
          <MetricCard title="Asignaturas" value="162" icon={<BookOpen className="w-6 h-6" />} />
          <MetricCard title="Inscripciones" value="3,478" icon={<ClipboardList className="w-6 h-6" />} />
          <MetricCard title="Egresados" value="532" icon={<GraduationCap className="w-6 h-6" />} />
        </section>
      </main>
    </div>
  )
}

// Componente para tarjetas de métricas
const MetricCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center space-x-3 mb-4 text-blue-800">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-700">{value}</p>
    </div>
  )
}

// Componente de enlace del sidebar
const SidebarLink = ({ label }: { label: string }) => {
  return (
    <a
      href="#"
      className="hover:bg-blue-800 px-4 py-2 rounded transition text-sm font-medium"
    >
      {label}
    </a>
  )
}

export default DashboardPage
