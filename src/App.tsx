import { Routes, Route } from 'react-router-dom';
import AsignaturasPage from './pages/AsignaturasPage';

export default function App() {
  return (
    <Routes>
      <Route path="/asignaturas" element={<AsignaturasPage />} />
      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
}
