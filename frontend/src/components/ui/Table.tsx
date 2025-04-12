type Report = {
    filename: string;
    provider: string;
    brand: string;
    publishedAt: string;
    notes?: string;
};

// This component is a table that displays a list of reports with their details.
// It takes in a list of reports as props and renders them in a structured format.

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
                <th className="px-4 py-3 border-b">Archivo</th>
                <th className="px-4 py-3 border-b">Proveedor</th>
                <th className="px-4 py-3 border-b">Marca</th>
                <th className="px-4 py-3 border-b">Fecha y Hora</th>
                <th className="px-4 py-3 border-b">Notas</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report, index) => (
                <tr key={index}>
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
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default Table;