import { Link } from "react-router-dom"
import {
  GraduationCap,
  Users,
  BookOpenText,
  PencilLine,
  Layers
} from "lucide-react"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between p-8">
      <main className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Sistema de Gestión Universitaria</h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-xl">
          Bienvenido al sistema académico. Aquí puedes gestionar estudiantes, profesores, asignaturas y más.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <HomeCard title="Estudiantes" to="/estudiantes" icon={<GraduationCap className="w-8 h-8 text-blue-700" />} />
          <HomeCard title="Profesores" to="/profesores" icon={<Users className="w-8 h-8 text-blue-700" />} />
           <HomeCard title="Asignaturas" to="/asignaturas" icon={<BookOpenText  className="w-8 h-8 text-blue-700" />} />
          <HomeCard title="Imparte" to="/imparte" icon={<Layers className="w-8 h-8 text-blue-700" />} />
          <HomeCard title="Inscribe" to="/inscribe" icon={<PencilLine className="w-8 h-8 text-blue-700" />} />
         
        </div>
      </main>

      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Adrián David González Romero. Todos los derechos reservados.</p>
        <p>
          Contacto:{" "}
          <a href="mailto:adrian.david@example.com" className="text-blue-600 underline">
            adriandavidgonzalez94@gmail.com
          </a>
        </p>
      </footer>
    </div>
  )
}

const HomeCard = ({ title, to, icon }: { title: string; to: string; icon: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="bg-white border border-gray-300 rounded-xl shadow hover:shadow-lg hover:bg-blue-50 transition duration-200 p-6 text-center flex flex-col items-center"
    >
      {icon}
      <h2 className="text-xl font-semibold text-blue-700 mt-3">{title}</h2>
      <p className="text-gray-500 mt-1">Ir a {title.toLowerCase()}</p>
    </Link>
  )
}

export default HomePage
