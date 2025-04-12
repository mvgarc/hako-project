import { useState, useEffect } from 'react';
import Table from '../components/ui/Table';
import Filters from '../components/ui/Filters';

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
        // Simulación de datos obtenidos desde una API
        const fetchedReports: Report[] = [
        {
            filename: 'catalogo1.pdf',
            provider: 'Proveedor A',
            brand: 'Marca A',
            publishedAt: '2023-04-05T14:00',
            notes: '',
        },
        {
            filename: 'catalogo2.pdf',
            provider: 'Proveedor B',
            brand: 'Marca B',
            publishedAt: '2023-04-06T15:00',
            notes: '',
        },
        ];

    setReports(fetchedReports);
    setFilteredReports(fetchedReports);

    setProviders(['Proveedor A', 'Proveedor B', 'Proveedor C']);
    setBrands(['Marca A', 'Marca B', 'Marca C']);
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
