declare const api: import('axios').AxiosInstance;
export default api;

export const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

export const register = async (nombre: string, email: string, password: string, rol?: string) => {
const response = await api.post('/register', {
    nombre,
    email,
    password,
    rol: rol || 'analista',
});
return response.data;
};