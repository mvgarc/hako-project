import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';
import api from '../api/axios';

interface ProviderForm {
  name: string;
  website: string;
  sellerName: string;
  sellerPhone: string;
  fiscalAddress: string;
  companyName: string;
}

interface Provider {
  id: string; // o number, según backend
  name: string;
  website: string;
  sellerName: string;
  sellerPhone: string;
  fiscalAddress: string;
  companyName: string;
}

function Providers() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProviderForm>();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar proveedores del backend
  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/proveedores');
      setProviders(res.data);
    } catch (err) {
      setError('Error al cargar proveedores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // Enviar nuevo proveedor
const onSubmit = async (data: ProviderForm) => {
  try {
    const res = await api.post('/api/proveedores', data);
    setProviders((prev) => [...prev, res.data]); // Evita fetch extra
    alert('Proveedor creado con éxito');
    reset();
  } catch (err) {
    console.error('Error creando proveedor:', err);
    alert('Error al crear proveedor');
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Proveedor
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Crear Nuevo Proveedor</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre del Proveedor"
              {...register('name', { required: 'Este campo es requerido' })}
              error={errors.name?.message}
            />
            <Input
              label="Página Web"
              type="url"
              {...register('website', { required: 'Este campo es requerido' })}
              error={errors.website?.message}
            />
            <Input
              label="Nombre del Vendedor"
              {...register('sellerName', { required: 'Este campo es requerido' })}
              error={errors.sellerName?.message}
            />
            <Input
              label="Teléfono del Vendedor"
              {...register('sellerPhone', { required: 'Este campo es requerido' })}
              error={errors.sellerPhone?.message}
            />
            <Input
              label="Dirección Fiscal"
              {...register('fiscalAddress', { required: 'Este campo es requerido' })}
              error={errors.fiscalAddress?.message}
            />
            <Input
              label="Nombre de la Empresa"
              {...register('companyName', { required: 'Este campo es requerido' })}
              error={errors.companyName?.message}
            />
          </div>
          <Button type="submit" className="mt-4">
            Guardar Proveedor
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Lista de Proveedores</h2>

        {loading && <p>Cargando proveedores...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && providers.length === 0 && (
          <p>No hay proveedores registrados.</p>
        )}

        {!loading && !error && providers.length > 0 && (
          <div className="overflow-x-auto rounded-md shadow border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-3 border-b">Nombre</th>
                  <th className="px-4 py-3 border-b">Página Web</th>
                  <th className="px-4 py-3 border-b">Nombre Vendedor</th>
                  <th className="px-4 py-3 border-b">Teléfono Vendedor</th>
                  <th className="px-4 py-3 border-b">Dirección Fiscal</th>
                  <th className="px-4 py-3 border-b">Nombre Empresa</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {providers.map((prov) => (
                  <tr key={`${prov.id}-${prov.name}`}>
                    <td className="px-4 py-2">{prov.name}</td>
                    <td className="px-4 py-2">
                      <a
                        href={prov.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {prov.website}
                      </a>
                    </td>
                    <td className="px-4 py-2">{prov.sellerName}</td>
                    <td className="px-4 py-2">{prov.sellerPhone}</td>
                    <td className="px-4 py-2">{prov.fiscalAddress}</td>
                    <td className="px-4 py-2">{prov.companyName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Providers;
