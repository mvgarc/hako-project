import React from 'react';

interface SelectProps {
    label?: string;
    options: string[];
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
        <option value="">Selecciona una opción</option>
        {options.map((opt) => (
            <option key={opt} value={opt}>
            {opt}
            </option>
        ))}
        </select>
    </div>
    );
};

export default Select;
