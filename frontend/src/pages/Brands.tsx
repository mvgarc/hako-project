import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';
import { Plus } from 'lucide-react';

interface BrandForm {
  name: string;
  logo: File | null;
}

function Brands() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BrandForm>();

  const onSubmit = (data: BrandForm) => {
    console.log(data);
    // TODO: Implement brand creation logic
  };

  const handleFileSelect = (file: File) => {
    setValue('logo', file);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Marcas</h1>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nueva Marca
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Crear Nueva Marca</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nombre de la Marca"
            {...register('name', { required: 'Este campo es requerido' })}
            error={errors.name?.message}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo de la Marca
            </label>
            <FileUpload
              onFileSelect={handleFileSelect}
              maxSize={2 * 1024 * 1024 * 1024} // 2GB
            />
          </div>
          <Button type="submit" className="mt-4">
            Guardar Marca
          </Button>
        </form>
      </div>

      {/* Add brand list here */}
    </div>
  );
}

export default Brands;