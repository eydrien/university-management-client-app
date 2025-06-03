import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EstudiantesPage from './features/estudiantes/EstudiantesPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/estudiantes" element={<EstudiantesPage />} />
    </Routes>
  )
}

export default App
