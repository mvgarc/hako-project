import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Providers from './pages/Providers';
import Brands from './pages/Brands';
import Layout from './components/Layout';
import Catalog from './pages/Catalog';
import Reports from './pages/reports';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ui/PrivateRoute'; 
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    // ===> Envuelve toda la aplicación con AuthProvider <===
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* ===> RUTAS PROTEGIDAS <=== */}
          {/* Usa ProtectedRoute para controlar el acceso */}
          <Route element={<ProtectedRoute />}>
            {/* Si todas estas rutas usan el mismo layout, anídalas bajo un Route que renderice Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings/>} /> {/* Usar el componente de página, no el ícono */}
            </Route>
          </Route>

          {/* Opcional: Ruta para cualquier otra URL no definida (404) */}
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirige al dashboard por defecto si la ruta no existe */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;