import React, { useState } from 'react';
import axios from 'axios';

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
        }
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
        alert('Por favor, selecciona un archivo.');
        return;
        }

        const formData = new FormData();
        formData.append('archivo', file);

        try {
        const response = await axios.post('http://localhost:4000/api/catalogos/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        setUploadStatus(`Archivo subido correctamente: ${response.data.file.filename}`);
        } catch (error) {
        console.error('Error al subir el archivo:', error);
        setUploadStatus('Error al subir el archivo.');
        }
    };

    return (
        <div className="upload-form">
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Subir Archivo</button>
        </form>
        {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadForm;
