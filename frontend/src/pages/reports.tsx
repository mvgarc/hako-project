import { useState, useEffect } from 'react';
import Table from '../components/ui/Table';
import Filters from '../components/ui/Filters';
import api from '../api/axios';

// Tipo de datos para los reportes
type Report = {
    filename: string;
    provider: string;
    brand: string;
    publishedAt: string;
    notes?: string;
};

const Reports: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [providers, setProviders] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);

    useEffect(() => {
        api.get("/api/catalogos")
        .then((res) => {
            const fetchedReports: Report[] = res.data.map((item: any) => ({
                filename: item.filename,
                provider: item.provider,
                brand: item.brand,
                publishedAt: item.publishedAt,
                notes: item.notes || "",
            }));

            setReports(fetchedReports);
            setFilteredReports(fetchedReports);

            // También puedes extraer los valores únicos
            setProviders([...new Set(fetchedReports.map(r => r.provider))]);
            setBrands([...new Set(fetchedReports.map(r => r.brand))]);
        })
        .catch((err) => {
            console.error("Error al obtener los reportes:", err);
        });
}, []);
    
    const handleFilterChange = (filters: { provider: string; brand: string; date: string }) => {
        let filtered = [...reports];

        if (filters.provider) {
        filtered = filtered.filter((report) => report.provider === filters.provider);
        }

        if (filters.brand) {
        filtered = filtered.filter((report) => report.brand === filters.brand);
        }

        if (filters.date) {
        filtered = filtered.filter((report) => report.publishedAt.startsWith(filters.date));
        }

        setFilteredReports(filtered);
    };

    const handleNotesChange = (index: number, newNote: string) => {
        const updated = [...filteredReports];
        updated[index].notes = newNote;

        // Actualiza ambos estados para mantener consistencia
        const updatedAll = reports.map((r) =>
            r.filename === updated[index].filename ? { ...r, notes: newNote } : r
            );

            setFilteredReports(updated);
            setReports(updatedAll);
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
