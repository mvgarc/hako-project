import React from "react";

interface MultiSelectProps {
    label?: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, selected, onChange }) => {
    const toggleOption = (value: string) => {
        if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
        } else {
        onChange([...selected, value]);
        }
};

    return (
        <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
            <button
                key={opt}
                type="button"
                className={`px-3 py-1 border rounded-full ${
                selected.includes(opt) ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                }`}
                onClick={() => toggleOption(opt)}
            >
                {opt}
            </button>
            ))}
        </div>
        </div>
    );
};

export default MultiSelect;
