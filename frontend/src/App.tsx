import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Providers from './pages/Providers';
import Brands from './pages/Brands';
import Layout from './components/Layout';
import Catalog from './pages/Catalog';
import Reports from './pages/Reports';
import { Settings } from 'lucide-react';
import PrivateRoute from './components/ui/PrivateRoute';

function App() {
  // TODO: Replace with actual auth check
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;