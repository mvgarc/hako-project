// components/ui/MultiSelect.tsx
import React from "react";

interface MultiSelectProps {
    label: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    label,
    options,
    selected,
    onChange,
    }) => {
    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
        onChange(selected.filter((item) => item !== option));
        } else {
        onChange([...selected, option]);
        }
    };

    return (
        <div>
        <label className="block mb-2 font-medium text-gray-700">{label}</label>
        <div className="border rounded p-2 space-y-1">
            {options.length === 0 ? (
            <div className="text-gray-400 italic">No hay opciones disponibles</div>
            ) : (
            options.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => toggleOption(option)}
                />
                <span>{option}</span>
                </label>
            ))
            )}
        </div>
        </div>
    );
};

export default MultiSelect;
