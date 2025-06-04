import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import EstudiantesPage from "./features/estudiantes/EstudiantesPage"
import MainLayout from "./layouts/MainLayout"
import PlainLayout from "./layouts/PlainLayout"

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
        
      </Route>
    </Routes>
  )
}

export default App

