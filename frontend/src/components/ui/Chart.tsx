import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Datos simulados para mostrar archivos por proveedor
const data = [
    { provider: 'Proveedor A', archivos: 12 },
    { provider: 'Proveedor B', archivos: 8 },
    { provider: 'Proveedor C', archivos: 5 },
];

export default function Chart() {
    return (
    <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="provider" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="archivos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
}
