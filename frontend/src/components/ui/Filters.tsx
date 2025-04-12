import { useState } from 'react';

type FilterProps = {
    providers: string[];
    brands: string[];
    onFilterChange: (filters: { provider: string; brand: string; date: string }) => void;
};

const Filters: React.FC<FilterProps> = ({ providers, brands, onFilterChange }) => {
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

const handleFilterChange = () => {
    onFilterChange({
        provider: selectedProvider,
        brand: selectedBrand,
        date: selectedDate,
    });
};

const inputStyles =
    'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

return (
        <div className="space-y-4 mb-6">
        {/* Botón arriba */}
        <div className="text-right">
            <button
            onClick={handleFilterChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
            Filtrar
            </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
            <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className={inputStyles}
            >
                <option value="">Todos</option>
                {providers.map((provider, index) => (
                <option key={index} value={provider}>
                    {provider}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className={inputStyles}
            >
                <option value="">Todas</option>
                {brands.map((brand, index) => (
                <option key={index} value={brand}>
                    {brand}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={inputStyles}
            />
            </div>
        </div>
        </div>
    );
};

export default Filters;
