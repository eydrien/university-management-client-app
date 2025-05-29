import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EstudiantesPage from './pages/EstudiantesPage'
// Aquí importarás más páginas a medida que las crees

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/estudiantes" element={<EstudiantesPage />} />
      {/* Aquí más rutas */}
    </Routes>
  )
}

export default App
