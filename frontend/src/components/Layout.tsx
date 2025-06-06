// src/layouts/Layout.tsx

import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Home, Users, Package, LogOut, Settings, UploadCloud, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext'; // Importa tu AuthContext

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Proveedores', href: '/providers', icon: Users },
  { name: 'Marcas', href: '/brands', icon: Package },
  {name:'Subir Catalogo', href:'/catalog', icon: UploadCloud},
  { name: 'Reportes', href: '/reports', icon: FileText },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para la navegación programática
  const { logout, isAuthenticated } = useAuth(); // Obtiene la función logout y el estado de autenticación del contexto

  const handleLogout = () => {
    logout(); // Llama a la función logout de tu contexto
    navigate('/login'); // Redirige al usuario a la página de login después de cerrar sesión
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 border-b">
              <h1 className="text-xl font-bold text-gray-900">
                Hako System
              </h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                      location.pathname === item.href
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t">
              {/* Asigna el manejador de eventos onClick */}
              <button
                onClick={handleLogout} // <--- AÑADE ESTO
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;