import React from 'react';
import ReactSelect, { SingleValue } from 'react-select'; 

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
    const selectedOption = options.find(option => option.value === value);

    // Función de manejo de cambio para react-select
    const handleChange = (selected: SingleValue<SelectOption>) => {

        onChange(selected ? selected.value : "");
    };

    return (
        <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <ReactSelect
            className="basic-single" // Clases para estilos básicos si los necesitas
            classNamePrefix="select" // Prefijo para clases de estilos de react-select
            options={options} // Tus opciones en formato { label, value }
            value={selectedOption} // El valor actual seleccionado (debe ser el objeto completo)
            onChange={handleChange} // Tu manejador de cambio
            placeholder="Selecciona una opción" // ¡Esto es lo que estabas buscando!
            isClearable={true} // Permite al usuario borrar la selección
            isSearchable={true} // Permite al usuario buscar entre las opciones (útil para listas largas)
            // Puedes añadir más props aquí para personalizar estilos, etc.
            // Por ejemplo, para estilos básicos:
            styles={{
            control: (baseStyles) => ({
                ...baseStyles,
                borderColor: '#D1D5DB', // border-gray-300
                boxShadow: 'none',
                '&:hover': {
                borderColor: '#60A5FA', // hover:border-blue-500
                },
            }),
            option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? '#E0F2FE' : 'white', // bg-blue-100 on hover
                color: 'black',
            }),
            }}
        />
        </div>
    );
};

export default Select;