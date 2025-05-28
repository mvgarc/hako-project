declare const api: import('axios').AxiosInstance;
export default api;

export const login = async (email: string, password: string) => {
    const response = await api.post('/api/login', { email, password });
    return response.data;
};

export const register = async (nombre: string, email: string, password: string) => {
    const response = await api.post('/api/register', { nombre, email, password });
    return response.data;
};
