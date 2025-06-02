import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Providers from './pages/Providers';
import Brands from './pages/Brands';
import Layout from './components/Layout';
import Catalog from './pages/Catalog';
import Reports from './pages/reports';
import Settings from './pages/Settings'; 
import ProtectedRoute from './components/ui/PrivateRoute'; 

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings/>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;