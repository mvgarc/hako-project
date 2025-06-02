import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Chart from "../components/ui/Chart"; // Asumiendo que este Chart puede recibir datos
import api from '../api/axios'; // Tu instancia de Axios para llamadas API

// Definir el tipo de datos que esperamos del backend
type DashboardStats = {
    totalArchivos: number;
    totalProveedores: number;
    totalMarcas: number;
    ultimaActualizacion: string;
    chartData: { name: string; value: number }[]; 
};

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setLoading(true); // Iniciar estado de carga
                const response = await api.get('/api/dashboard-stats'); // Llama a tu nuevo endpoint
                setStats(response.data); // Guarda los datos en el estado
                setError(null); // Limpia cualquier error previo
            } catch (err) {
                console.error("Error al obtener estadísticas del dashboard:", err);
                setError("No se pudieron cargar las estadísticas del dashboard. Inténtalo de nuevo más tarde.");
            } finally {
                setLoading(false); // Finalizar estado de carga
            }
        };

        fetchDashboardStats();
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-gray-600">Cargando estadísticas del dashboard...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600">{error}</div>;
    }

    // Si no hay datos (ej. al inicio antes de cargar o si la API devuelve null)
    if (!stats) {
        return <div className="p-6 text-center text-gray-600">No hay datos disponibles para mostrar.</div>;
    }

    // Preparar los datos para las tarjetas de estadísticas
    const cardData = [
        { title: "Total de Archivos", value: stats.totalArchivos },
        { title: "Proveedores Registrados", value: stats.totalProveedores },
        { title: "Marcas Cargadas", value: stats.totalMarcas },
        { title: "Última Actualización", value: stats.ultimaActualizacion },
    ];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardData.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {stat.value}
                        </CardContent>
                    </Card>
                ))}
                {/* La tarjeta del gráfico ocupa 2 columnas */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Archivos por proveedor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Pasa los datos reales del gráfico al componente Chart */}
                        <Chart data={stats.chartData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;