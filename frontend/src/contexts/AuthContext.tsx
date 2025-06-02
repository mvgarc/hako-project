import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
interface AuthContextType {
    isAuthenticated: boolean;
    user: { id: number; email: string; rol: string } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<{ id: number; email: string; rol: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Nuevo estado de carga
    const navigate = useNavigate();

    // Función para decodificar el token JWT (simple, sin verificar la firma)
    const decodeToken = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return null;
        }
    };

    useEffect(() => {
        const loadUserFromToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedUser = decodeToken(token);
                if (decodedUser && decodedUser.exp * 1000 > Date.now()) { // Verificar expiración
                    setIsAuthenticated(true);
                    setUser({ id: decodedUser.id, email: decodedUser.email, rol: decodedUser.rol });
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } else {
                    localStorage.removeItem('token'); // Token expirado o inválido
                    setIsAuthenticated(false);
                    setUser(null);
                    delete api.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false); // La carga inicial ha terminado
        };

        loadUserFromToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post('/api/auth/login', { email, password });
            const { token } = res.data;
            localStorage.setItem('token', token); // Guardar el token en localStorage

            const decodedUser = decodeToken(token); // Decodificar para obtener info de usuario
            if (decodedUser) {
                setIsAuthenticated(true);
                setUser({ id: decodedUser.id, email: decodedUser.email, rol: decodedUser.rol });
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configurar el header de axios
                navigate('/dashboard'); // Redirigir al dashboard u otra página protegida
            } else {
                throw new Error("No se pudo decodificar el token de usuario.");
            }
        } catch (error: any) {
            console.error("Error en login:", error.response?.data?.message || error.message);
            throw error; // Propaga el error para que el componente Login lo maneje
        }
    };

    const logout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        setIsAuthenticated(false);
        setUser(null);
        delete api.defaults.headers.common['Authorization']; // Eliminar el header de axios
        navigate('/login'); // Redirigir a la página de login
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};