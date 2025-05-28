import { createContext, useContext, useState } from 'react';
import authService from '../services/authService';

interface AuthContextType {
    user: any; // Replace 'any' with your user type if available
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const login = async (email: string, password: string) => {
        const data = await authService.login(email, password);
        setUser(data.user);
    };
    const logout = async () => {
        await authService.logout();
        setUser(null);
    };
    return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);