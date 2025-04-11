import React, { useState } from 'react';

type FilterProps = {
    providers: string[];
    brands: string[];
    onFilterChange: (filters: { provider: string; brand: string; date: string }) => void;
};

const Filters: React.FC<FilterProps> = ({ providers, brands, onFilterChange }) => {
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedBrand, setSelectedBrand] = React.useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleFilterChange = () => {
        onFilterChange({
            provider: selectedProvider,
            brand: selectedBrand,
            date: selectedDate,
        });
    };

    return (
    <div className="mb-4">
        <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="mr-4"
        >
            <option value="">Selecciona un proveedor</option>
            {providers.map((provider) => (
                <option key={provider} value={provider}>
                    {provider}
                </option>
            ))}
        </select>

        <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="mr-4"
        >
            <option value="">Selecciona una marca</option>
            {brands.map((brand) => (
                <option key={brand} value={brand}>
                {brand}
                </option>
            ))}
            </select>
    
        <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mr-4"
        />

        <button onClick={handleFilterChange}>Filtrar</button>
        </div>
    );
};

export default Filters;