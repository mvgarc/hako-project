type Report = {
    filename: string;
    provider: string;
    brand: string;
    publishedAt: string; // Fecha y hora de publicación
};
    // Componente de tabla para mostrar los informes
    // Este componente recibe una lista de informes y los muestra en una tabla
    // Cada informe tiene un nombre de archivo, proveedor, marca y fecha/hora de publicación
    //NO USAR EL COMPONENTE DE FORMA GENERAL, ya que lo realicé muy específico para el proyecto
type TableProps = {
    reports: Report[];
};

const Table: React.FC<TableProps> = ({ reports }) => {
    return (
        <table className="min-w-full table-auto">
            <thead>
            <tr>
                <th className="px-4 py-2 border">Nombre del Archivo</th>
                <th className="px-4 py-2 border">Proveedor</th>
                <th className="px-4 py-2 border">Marca</th>
                <th className="px-4 py-2 border">Fecha y Hora</th>
            </tr>
            </thead>
        <tbody>
            {reports.map((report, index) => (
            <tr key={index}>
                <td className="px-4 py-2 border">{report.filename}</td>
                <td className="px-4 py-2 border">{report.provider}</td>
                <td className="px-4 py-2 border">{report.brand}</td>
                <td className="px-4 py-2 border">{report.publishedAt}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};
export default Table;
