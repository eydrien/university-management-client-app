import { Link } from "react-router-dom"
import { BookOpen, Users, UserCheck, ClipboardList } from "lucide-react"

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-md mb-4">
          Sistema de Gestión Universitaria
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Administra eficientemente estudiantes, profesores, asignaturas y procesos académicos con nuestra plataforma centralizada.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
        <HomeCard
          icon={<Users className="w-8 h-8 text-blue-700 mb-2" />}
          title="Estudiantes"
          to="/estudiantes"
        />
        <HomeCard
          icon={<UserCheck className="w-8 h-8 text-blue-700 mb-2" />}
          title="Profesores"
          to="/profesores"
        />
        <HomeCard
          icon={<ClipboardList className="w-8 h-8 text-blue-700 mb-2" />}
          title="Imparte"
          to="/imparte"
        />
        <HomeCard
          icon={<BookOpen className="w-8 h-8 text-blue-700 mb-2" />}
          title="Inscribe"
          to="/inscribe"
        />
      </section>

      <footer className="mt-16 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Sistema Academíco — Desarrollado por Adrian David Gonzalez Romero.
      </footer>
    </main>
  )
}

type HomeCardProps = {
  title: string
  to: string
  icon: React.ReactNode
}

const HomeCard = ({ title, to, icon }: HomeCardProps) => {
  return (
    <Link
      to={to}
      className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-200 p-6 text-center transform hover:-translate-y-1"
    >
      {icon}
      <h2 className="text-xl font-semibold text-blue-800 group-hover:text-blue-900">
        {title}
      </h2>
      <p className="text-gray-500 mt-1">Ir a {title.toLowerCase()}</p>
    </Link>
  )
}

export default HomePage
