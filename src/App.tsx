import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import EstudiantesPage from "./features/estudiantes/EstudiantesPage"
import MainLayout from "./layouts/MainLayout"
import PlainLayout from "./layouts/PlainLayout"
import AsignaturasPage from "./features/asignaturas/AsignaturasPage"
import ProfesoresPage from "./features/profesores/ProfesoresPage"

function App() {
  return (
    <Routes>
      {/* Páginas sin Sidebar */}
      <Route element={<PlainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Páginas con Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/estudiantes" element={<EstudiantesPage />} />
        <Route path="/asignaturas" element={<AsignaturasPage/>} />
        <Route path="/profesores"  element={<ProfesoresPage/>} />
      </Route>
    </Routes>
  )
}

export default App

