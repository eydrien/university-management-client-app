import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Sistema de Gestión Universitaria</h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-xl">
        Bienvenido al sistema académico. Aquí puedes gestionar estudiantes, profesores, asignaturas y más.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <HomeCard title="Estudiantes" to="/estudiantes" />
        <HomeCard title="Profesores" to="/profesores" />
        <HomeCard title="Imparte" to="/imparte" />
        <HomeCard title="Inscribe" to="/inscribe" />
      </div>
    </div>
  )
}

// Componente reutilizable para cada tarjeta de navegación
const HomeCard = ({ title, to }: { title: string; to: string }) => {
  return (
    <Link
      to={to}
      className="bg-white border border-gray-300 rounded-xl shadow hover:shadow-md hover:bg-blue-50 transition duration-200 p-6 text-center"
    >
      <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
      <p className="text-gray-500 mt-2">Ir a {title.toLowerCase()}</p>
    </Link>
  )
}

export default HomePage
