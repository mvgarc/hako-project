import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'; 

const Settings = () => {
    const { user, logout } = useAuth();

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Configuración</h1>

        {user && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-blue-800">Información del Usuario</h2>
            <p className="text-gray-700"><strong>Nombre:</strong> {user.nombre || 'N/A'}</p>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-700"><strong>Rol:</strong> <span className="font-medium capitalize">{user.rol}</span></p>
            </div>
        )}

        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Opciones de la Aplicación</h2>
            <p className="text-gray-600">Aquí puedes añadir configuraciones generales para la aplicación, como temas, notificaciones, etc.</p>
            {/* Ejemplo de una sección de configuración */}
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-700">Preferencias de Interfaz</h3>
            <label htmlFor="theme" className="block text-gray-600 mt-2">Tema:</label>
            <select id="theme" className="mt-1 block w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option>Claro</option>
                <option>Oscuro</option>
                <option>Sistema</option>
            </select>
            </div>
        </div>

        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Seguridad y Cuenta</h2>
            <p className="text-gray-600">Gestión de la cuenta de usuario.</p>
            <div className="mt-4">
            <Link to="/change-password" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4">
                Cambiar Contraseña
            </Link>
            <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Cerrar Sesión Ahora
            </button>
            </div>
        </div>

        {/* Puedes añadir más secciones de configuración aquí */}
        </div>
    );
};

export default Settings; // Exporta el componente