import React, { useState, useEffect } from 'react';
import Table from '../components/ui/Table';
import Filters from '../components/ui/Filters';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchReports = async () => {
            if (!isAuthenticated) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const res = await api.get("/api/catalogos");
                
                const fetchedReports: Report[] = res.data.map((item: any) => ({
                    id: item.id,
                    filename: item.filename,
                    provider: item.provider, 
                    brand: item.brand,
                    publishedAt: item.publishedAt || "N/A",
                    notes: item.notes || "",
                    enlaceDescarga: item.enlaceDescarga,
                }));

                setReports(fetchedReports);
                setFilteredReports(fetchedReports);

                setProviders([...new Set(fetchedReports.map(r => r.provider))]);
                setBrands([...new Set(fetchedReports.map(r => r.brand))]);
                setError(null);
            } catch (err) {
                console.error("Error al obtener los reportes:", err);
                setError("Hubo un error al cargar los reportes. Por favor, inténtalo de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [isAuthenticated]);

    const handleFilterChange = (filters: { provider: string; brand: string; date: string }) => {
        let filtered = [...reports];

        if (filters.provider && filters.provider !== 'Todos') {
            filtered = filtered.filter((report) => report.provider === filters.provider);
        }

        if (filters.brand && filters.brand !== 'Todos') {
            filtered = filtered.filter((report) => report.brand === filters.brand);
        }

        if (filters.date) {
            const filterDateParts = filters.date.split('-');
            const filterDateFormatted = `${filterDateParts[2]}/${filterDateParts[1]}/${filterDateParts[0]}`;

            filtered = filtered.filter((report) => report.publishedAt.startsWith(filterDateFormatted));
        }

        setFilteredReports(filtered);
    };
    
    const handleNotesChange = (index: number, newNote: string) => {
        const updatedFiltered = [...filteredReports];
        if (updatedFiltered[index]) {
            updatedFiltered[index].notes = newNote;
            setFilteredReports(updatedFiltered);
        }

        const updatedAllReports = reports.map((report) =>
            report.id === filteredReports[index]?.id 
                ? { ...report, notes: newNote }
                : report
        );
        setReports(updatedAllReports);
    };

    if (loading) {
        return <div className="p-6 text-center text-gray-600">Cargando reportes...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600">{error}</div>;
    }


    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-semibold text-gray-800">Reportes de Archivos Subidos</h1>
            <Filters providers={providers} brands={brands} onFilterChange={handleFilterChange} />
            {filteredReports.length === 0 && !loading && !error ? (
                <p className="text-gray-600">No hay reportes que coincidan con los filtros.</p>
            ) : (
                <Table reports={filteredReports} onNotesChange={handleNotesChange} />
            )}
        </div>
    );
};

export default Reports;