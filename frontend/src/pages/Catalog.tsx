import React, { useState, useEffect } from "react";
import FileUpload from "../components/ui/FileUpload";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import MultiSelect from "../components/ui/MultiSelect";
import api from "../api/axios";

const Catalog = () => {
    const [provider, setProvider] = useState("");
    const [brands, setBrands] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const [providerOptions, setProviderOptions] = useState<{ label: string; value: string }[]>([]);
    const [brandOptions, setBrandOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        // Obtener proveedores
        api.get("/api/proveedores")
            .then((res) => {
                const opciones = res.data.map((p: any) => ({
                    label: p.nombre,
                    value: p.id.toString(),
                }));
                setProviderOptions(opciones);
            })
            .catch((err) => {
                console.error("Error al cargar proveedores:", err);
            });

        // Obtener marcas
        api.get("/api/marcas")
            .then((res) => {
                const opciones = res.data.map((m: any) => ({
                    label: m.nombre,
                    value: m.id.toString(),
                }));
                // --- ¡La línea que faltaba! ---
                setBrandOptions(opciones); 
            })
            .catch((err) => {
                console.error("Error al cargar marcas:", err);
            });
    }, []); // El array de dependencias está vacío, se ejecuta solo al montar el componente.

    const handleSubmit = () => {
        if (!file || !provider || brands.length === 0) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const formData = new FormData();
        formData.append("catalog", file);
        formData.append("provider", provider);
        formData.append("brands", JSON.stringify(brands));

        api.post("/api/catalogos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            alert("Catálogo subido con éxito");
            console.log("Respuesta del servidor:", res.data);
            // Optionally, reset form fields after successful upload
            setFile(null);
            setProvider("");
            setBrands([]);
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

            <MultiSelect
                label="Marcas"
                options={brandOptions}
                selected={brands}
                onChange={setBrands}
            />

            <FileUpload onFileSelect={setFile} />

            <Button onClick={handleSubmit}>Enviar catálogo</Button>
        </div>
    );
};

export default Catalog;