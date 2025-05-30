import React from 'react';
interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
    return (
        <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <select
            className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {/* ¡Elimina esta línea! */}
            {/* <option key="default-select-option" value="">Selecciona una opción</option> */} 
            {options.map((option) => (
            <option
                key={option.value}
                value={option.value}
            >
                {option.label}
            </option>
            ))}
        </select>
        </div>
    );
};

export default Select;