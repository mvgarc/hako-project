import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type ChartData = {
    name: string;   // Corresponde al 'name' del proveedor
    value: number;  // Corresponde al 'value' de la cantidad de archivos
};


interface ChartProps {
    data: ChartData[]; // El componente ahora acepta una prop 'data' que es un array de ChartData
}

export default function Chart({ data }: ChartProps) { // <--- Cambiado aquí

    if (!data || data.length === 0) {
        return (
            <div className="w-full h-72 flex items-center justify-center text-gray-500">
                No hay datos disponibles para el gráfico.
            </div>
        );
    }

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" /> 
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Archivos" /> {/* <--- Cambiado de "archivos" a "value" */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}