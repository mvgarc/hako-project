declare const api: import('axios').AxiosInstance;


const login = async (email: string, password: string) => {
    await api.get('/sanctum/csrf-cookie');
    const response = await api.post('/api/login', { email, password });
    return response.data;
};

const logout = async () => {
    await api.post('/api/logout');
};

export default { login, logout };