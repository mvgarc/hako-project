import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Chart from "../components/ui/Chart";

const Dashboard = () => {
  // Datos simulados
  const stats = [
    {
      title: "Total de Archivos",
      value: 152,
    },
    {
      title: "Proveedores Registrados",
      value: 12,
    },
    {
      title: "Marcas Cargadas",
      value: 8,
    },
    {
      title: "Última Actualización",
      value: "2025-04-10",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value}
            </CardContent>
          </Card>
        ))}
        <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Archivos por proveedor</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart />
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Dashboard;
