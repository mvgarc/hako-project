import React from 'react';
interface SelectOption {
  label: string; // El texto que se muestra al usuario
  value: string; // El valor real que se envía en el formulario
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
            <option value="">Selecciona una opción</option>
            {options.map((option) => ( // Cambiamos 'opt' a 'option' para mayor claridad
            <option
                key={option.value} // Usa el 'value' del objeto como key (debe ser único)
                value={option.value} // Usa el 'value' del objeto como valor de la opción
            >
                {option.label} {/* Muestra el 'label' del objeto */}
            </option>
            ))}
        </select>
        </div>
    );
};

export default Select;
