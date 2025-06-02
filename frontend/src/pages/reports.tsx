import { useState, useEffect } from 'react';
import Table from '../components/ui/Table';
import Filters from '../components/ui/Filters';
import api from '../api/axios';

// Tipo de datos para los reportes (debe coincidir con lo que devuelve el backend)
type Report = {
    id: number;
    filename: string;
    provider: string;
    brand: string;
    publishedAt: string;
    notes?: string;
    enlaceDescarga?: string;
};

const Reports: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [providers, setProviders] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await api.get("/api/catalogos");
                const fetchedReports: Report[] = res.data.map((item: any) => ({
                    id: item.id,
                    filename: item.filename, // <-- Mapea directamente 'filename' que viene del backend
                    provider: item.provider, // <-- Mapea directamente 'provider' que viene del backend
                    brand: item.brand,       // <-- Mapea directamente 'brand' que viene del backend
                    publishedAt: item.publishedAt || "N/A", // <-- Mapea directamente 'publishedAt' que viene del backend
                    notes: item.notes || "",
                    enlaceDescarga: item.enlaceDescarga,
                }));

                setReports(fetchedReports);
                setFilteredReports(fetchedReports);

                // Extraer valores únicos para los filtros de proveedores y marcas
                setProviders([...new Set(fetchedReports.map(r => r.provider))]);
                setBrands([...new Set(fetchedReports.map(r => r.brand))]);

            } catch (err) {
                console.error("Error al obtener los reportes:", err);
            }
        };

        fetchReports();
    }, []);
    
    // Función para manejar los cambios en los filtros
    const handleFilterChange = (filters: { provider: string; brand: string; date: string }) => {
        let filtered = [...reports];

        if (filters.provider && filters.provider !== 'Todos') {
            filtered = filtered.filter((report) => report.provider === filters.provider);
        }

        if (filters.brand && filters.brand !== 'Todos') {
            filtered = filtered.filter((report) => report.brand === filters.brand);
        }

        if (filters.date) {
            // Ajustamos el formato de la fecha del filtro (YYYY-MM-DD) al formato del backend (DD/MM/YYYY)
            const filterDateParts = filters.date.split('-');
            const filterDateFormatted = `${filterDateParts[2]}/${filterDateParts[1]}/${filterDateParts[0]}`;

            filtered = filtered.filter((report) => report.publishedAt.startsWith(filterDateFormatted));
        }

        setFilteredReports(filtered);
    };

    // Función para manejar los cambios en las notas
    const handleNotesChange = (index: number, newNote: string) => {
        // Actualiza el array filtrado
        const updatedFiltered = [...filteredReports];
        if (updatedFiltered[index]) {
            updatedFiltered[index].notes = newNote;
            setFilteredReports(updatedFiltered);
        }

        // También actualiza el array original 'reports' para mantener la consistencia
        const updatedAllReports = reports.map((report) =>
            report.id === filteredReports[index]?.id // Usa el ID para encontrar el reporte original
                ? { ...report, notes: newNote }
                : report
        );
        setReports(updatedAllReports);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-semibold text-gray-800">Reportes de Archivos Subidos</h1>
            <Filters providers={providers} brands={brands} onFilterChange={handleFilterChange} />
            <Table reports={filteredReports} onNotesChange={handleNotesChange} />
        </div>
    );
};

export default Reports;