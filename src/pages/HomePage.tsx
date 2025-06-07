import { GraduationCap, Users, BookOpenText, PencilLine, Layers } from "lucide-react";
import { ROUTES } from "../routes"; 
import HomeCard from "../components/HomeCard"; 

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between p-8">
      <main className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Sistema de Gestión Universitaria</h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-xl">
          Bienvenido al sistema académico. Aquí puedes gestionar estudiantes, profesores, asignaturas y más.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <HomeCard title="Estudiantes" to={ROUTES.ESTUDIANTES} icon={<GraduationCap className="w-8 h-8 text-blue-700" />} />
          <HomeCard title="Profesores" to={ROUTES.PROFESORES} icon={<Users className="w-8 h-8 text-blue-700" />} />
          <HomeCard title="Asignaturas" to={ROUTES.ASIGNATURAS} icon={<BookOpenText className="w-8 h-8 text-blue-700" />} />
          <HomeCard title="Imparte" to={ROUTES.IMPARTE} icon={<Layers className="w-8 h-8 text-blue-700" />} />
          <HomeCard title="Inscribe" to={ROUTES.INSCRIBE} icon={<PencilLine className="w-8 h-8 text-blue-700" />} />
        </div>
      </main>

      <footer className="mt-10 text-center text-sm text-gray-500 pt-4">
        <p className="mb-1">Desarrollado con café, código y errores corregidos a tiempo ☕💻</p>
        <p>
          Contacto:{" "}
          <a href="mailto:adriandavidgonzalez94@gmail.com" className="text-blue-600 underline">
            adriandavidgonzalez94@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
