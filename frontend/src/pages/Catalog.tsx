import React, { useState, useEffect } from "react";
import FileUpload from "../components/ui/FileUpload";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import api from "../api/axios";

const Catalog = () => {
    const [provider, setProvider] = useState("");
    const [brand, setBrand] = useState<string>(""); 
    const [file, setFile] = useState<File | null>(null);

    const [providerOptions, setProviderOptions] = useState<{ label: string; value: string }[]>([]);
    const [brandOptions, setBrandOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
    // Obtener proveedores
    api.get("/api/proveedores")
        .then((res) => {
            const opciones = res.data.map((p: any) => p.id.toString()); // <-- CAMBIO AQUÍ: solo ID como string
            setProviderOptions(opciones);
        })
        .catch((err) => {
            console.error("Error al cargar proveedores:", err);
        });

    // Obtener marcas
    api.get("/api/marcas")
        .then((res) => {
            const opciones = res.data.map((m: any) => m.id.toString()); // <-- CAMBIO AQUÍ: solo ID como string
            setBrandOptions(opciones);
        })
        .catch((err) => {
            console.error("Error al cargar marcas:", err);
        });
}, [])

    const handleSubmit = () => {
        // CAMBIO CLAVE: Verificar !brand en lugar de brands.length === 0
        if (!file || !provider || !brand) { 
            alert("Por favor completa todos los campos.");
            return;
        }

        const formData = new FormData();
        formData.append("catalog", file);
        formData.append("provider", provider);
        // CAMBIO CLAVE: Enviar 'brandId' con el valor singular 'brand'
        // Asegúrate de que el nombre del campo ("marcaId" o "brandId") coincida con lo que espera tu backend en el modelo de Catálogo
        formData.append("marcaId", brand); 

        api.post("/api/catalogos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            alert("Catálogo subido con éxito");
            console.log("Respuesta del servidor:", res.data);
            // Opcional: reiniciar campos del formulario después de la subida exitosa
            setFile(null);
            setProvider("");
            setBrand(""); // Reiniciar el estado de la marca singular
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

            <Select // Este componente ahora se usa para una selección única de marca
                label="Marca"
                options={brandOptions}
                value={brand} // Ahora 'brand' está definido
                onChange={setBrand} // Ahora 'setBrand' está definido
            />

            <FileUpload onFileSelect={setFile} />

            <Button onClick={handleSubmit}>Enviar catálogo</Button>
        </div>
    );
};

export default Catalog;