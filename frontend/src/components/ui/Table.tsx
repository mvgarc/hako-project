type Report = {
    filename: string;
    provider: string;
    brand: string;
    publishedAt: string;
};

// This component is a table that displays a list of reports with their details.
// It takes in a list of reports as props and renders them in a structured format.

type TableProps = {
    reports: Report[];
};

const Table: React.FC<TableProps> = ({ reports }) => {
    return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
        <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
            <th className="px-4 py-3 border-b">Archivo</th>
            <th className="px-4 py-3 border-b">Proveedor</th>
            <th className="px-4 py-3 border-b">Marca</th>
            <th className="px-4 py-3 border-b">Fecha y Hora</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report, index) => (
            <tr key={index}>
                <td className="px-4 py-2">{report.filename}</td>
                <td className="px-4 py-2">{report.provider}</td>
                <td className="px-4 py-2">{report.brand}</td>
                <td className="px-4 py-2">{new Date(report.publishedAt).toLocaleString()}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
);
};

export default Table;
