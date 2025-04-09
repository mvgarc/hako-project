import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';

interface ProviderForm {
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
    formState: { errors },
  } = useForm<ProviderForm>();

  const onSubmit = (data: ProviderForm) => {
    console.log(data);
    // TODO: Implement provider creation logic
  };

  return (
    <div>
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

      {/* Add provider list here */}
    </div>
  );
}

export default Providers;