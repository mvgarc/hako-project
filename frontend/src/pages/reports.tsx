import { useState, useEffect } from 'react';
import Table from '..components/ui/Table';
import Filters from '..components/ui/Filters';

const Reports: React.FC = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [providers, setProviders] = useState<string[]>([]); // Lista de proveedores
  const [brands, setBrands] = useState<string[]>([]); // Lista de marcas

  useEffect(() => {
    // Cargar los datos de los reportes (puedes obtenerlo de una API)
    const fetchedReports = [
      { filename: 'catalogo1.pdf', provider: 'Proveedor A', brand: 'Marca A', publishedAt: '2023-04-05T14:00' },
      { filename: 'catalogo2.pdf', provider: 'Proveedor B', brand: 'Marca B', publishedAt: '2023-04-06T15:00' },
      // Más datos...
    ];
    setReports(fetchedReports);
    setFilteredReports(fetchedReports);

    // Cargar proveedores y marcas para los filtros
    const providersList = ['Proveedor A', 'Proveedor B', 'Proveedor C'];
    const brandsList = ['Marca A', 'Marca B', 'Marca C'];
    setProviders(providersList);
    setBrands(brandsList);
  }, []);

  const handleFilterChange = (filters: { provider: string; brand: string; date: string }) => {
    let filtered = reports;

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

  return (
    <div>
      <Filters
        providers={providers}
        brands={brands}
        onFilterChange={handleFilterChange}
      />
      <Table reports={filteredReports} />
    </div>
  );
};

export default Reports;
