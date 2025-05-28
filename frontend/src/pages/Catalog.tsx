import React, { useState } from "react";
import FileUpload from "../components/ui/FileUpload";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import api from "../api/axios"; // Importar axios configurado

const Catalog = () => {
    const [provider, setProvider] = useState("");
    const [brands, setBrands] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const providerOptions = ["Samsung", "LG", "Sony"];
    const brandOptions = ["Bravia", "Galaxy", "Hisense", "Whirlpool"];
    
    const handleSubmit = () => {
    if (!file || !provider || brands.length === 0) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const formData = new FormData();
    formData.append("catalog", file);
    formData.append("provider", provider);
    formData.append("brands", JSON.stringify(brands));

    api
    .post("/api/catalogos", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then((res) => {
        alert("Catálogo subido con éxito");
        console.log("Respuesta del servidor:", res.data);
    })
    .catch((err) => {
        console.error("Error al subir catálogo:", err);
        alert("Hubo un error al subir el catálogo.");
    });
};
return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold">Subir nuevo catálogo</h1>
        <Select
            label="Proveedor"
            options={providerOptions}
            value={provider}
            onChange={setProvider}
            />

        <Select
            label="Marcas"
            options={brandOptions}
            value={brands}
            onChange={setBrands}
        />

        <FileUpload onFileSelect={setFile} />

        <Button onClick={handleSubmit}>Enviar catálogo</Button>
        </div>
    );
};

export default Catalog;
