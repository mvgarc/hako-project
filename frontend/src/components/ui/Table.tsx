// src/components/ui/Table.tsx

import React from 'react';
import { Download } from 'lucide-react'; // Importa el ícono de descarga

// *** ACTUALIZAR EL TIPO Report AQUÍ ***
type Report = {
    id: number; // Añade la propiedad id
    filename: string;
    provider: string;
    brand: string;
    publishedAt: string;
    notes?: string;
    enlaceDescarga?: string; // Añade la propiedad enlaceDescarga
};

type TableProps = {
    reports: Report[];
    onNotesChange?: (index: number, newNote: string) => void;
};

const Table: React.FC<TableProps> = ({ reports, onNotesChange }) => {
    return (
        <div className="overflow-x-auto rounded-md shadow border border-gray-200">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-medium">
                    <tr>
                        <th className="px-4 py-3 border-b">ID</th> {/* Nueva columna para el ID */}
                        <th className="px-4 py-3 border-b">Archivo</th>
                        <th className="px-4 py-3 border-b">Proveedor</th>
                        <th className="px-4 py-3 border-b">Marca</th>
                        <th className="px-4 py-3 border-b">Fecha y Hora</th>
                        <th className="px-4 py-3 border-b">Notas</th>
                        <th className="px-4 py-3 border-b">Descargar</th> {/* Nueva columna para el botón de descarga */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report, index) => (
                        // *** Usa report.id como key si está disponible para una mejor renderización de listas ***
                        <tr key={report.id || index}> 
                            <td className="px-4 py-2">{report.id}</td> {/* Mostrar el ID */}
                            <td className="px-4 py-2">{report.filename}</td>
                            <td className="px-4 py-2">{report.provider}</td>
                            <td className="px-4 py-2">{report.brand}</td>
                            <td className="px-4 py-2">{new Date(report.publishedAt).toLocaleString()}</td>
                            <td className="px-4 py-2">
                                <textarea
                                    value={report.notes || ''}
                                    onChange={(e) =>
                                        onNotesChange?.(index, e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={2}
                                    placeholder="Escribe una nota..."
                                />
                            </td>
                            {/* *** NUEVA CELDA PARA LA DESCARGA *** */}
                            <td className="px-4 py-2">
                                {report.enlaceDescarga ? (
                                    <a
                                        href={report.enlaceDescarga}
                                        // Usa el filename para el atributo 'download' para que el archivo se guarde con ese nombre
                                        download={report.filename || `catalogo_${report.id}.pdf`} 
                                        target="_blank" // Abre el enlace en una nueva pestaña
                                        rel="noopener noreferrer" // Seguridad recomendada para target="_blank"
                                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                                        title={`Descargar ${report.filename}`}
                                    >
                                        <Download className="h-5 w-5 mr-1" /> {/* Icono de descarga */}
                                        PDF
                                    </a>
                                ) : (
                                    <span className="text-gray-500">N/A</span> // Si no hay enlace de descarga
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;