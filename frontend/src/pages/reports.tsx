import { useState, useEffect } from 'react';
import Table from '../components/ui/Table';
import Filters from '../components/ui/Filters';
import api from '../api/axios';

// Tipo de datos para los reportes (asegúrate de que coincide con lo que devuelve el backend)
type Report = {
    id: number; // Agrega el ID si lo necesitas para alguna operación
    filename: string;
    provider: string; // Esperamos el nombre del proveedor
    brand: string;    // Esperamos el nombre de la marca
    publishedAt: string; // Fecha de publicación (ahora vendrá del backend)
    notes?: string;
    enlaceDescarga?: string; // Si quieres usarlo en el frontend
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
                    filename: item.filename, // Asegúrate de que el backend envía 'filename' o usa 'nombre' de item
                    provider: item.provider,
                    brand: item.brand,
                    publishedAt: item.publishedAt || "N/A", // Ahora debería recibir la fecha real o "N/A"
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

        if (filters.provider && filters.provider !== 'Todos') { // Añadir 'Todos' para manejar la opción de "todos"
            filtered = filtered.filter((report) => report.provider === filters.provider);
        }

        if (filters.brand && filters.brand !== 'Todos') { // Añadir 'Todos' para manejar la opción de "todos"
            filtered = filtered.filter((report) => report.brand === filters.brand);
        }

        if (filters.date) {
            // Asumiendo que filters.date es 'YYYY-MM-DD' y publishedAt es 'DD/MM/YYYY' (formato que enviamos del backend)
            // Para una comparación simple, ajustamos el formato del filtro al del backend
            const filterDateParts = filters.date.split('-'); // ['YYYY', 'MM', 'DD']
            const filterDateFormatted = `${filterDateParts[2]}/${filterDateParts[1]}/${filterDateParts[0]}`; // 'DD/MM/YYYY'

            filtered = filtered.filter((report) => report.publishedAt.startsWith(filterDateFormatted));
        }

        setFilteredReports(filtered);
    };

    // Función para manejar los cambios en las notas
    const handleNotesChange = (index: number, newNote: string) => {
        // Actualiza el array filtrado
        const updatedFiltered = [...filteredReports];
        if (updatedFiltered[index]) { // Asegura que el índice es válido
            updatedFiltered[index].notes = newNote;
            setFilteredReports(updatedFiltered);
        }

        // Si también necesitas actualizar el array original 'reports'
        // (esto es buena práctica para mantener consistencia si los filtros se resetean o se modifican más tarde)
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