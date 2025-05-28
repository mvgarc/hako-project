
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );
const loginUser = (jwt: string) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
};

const logoutUser = () => {
    localStorage.removeItem('token');
    setToken(null);
};

return (
<AuthContext.Provider value={{ token, loginUser, logoutUser }}>
    {children}
</AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
