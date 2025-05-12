import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';
import { Plus } from 'lucide-react';
import axios from 'axios';

interface BrandForm {
  name: string;
  logo: File | null;
}

interface Brand {
  id: number;
  nombre: string;
  logo: string;
}

function Brands() {
  const {
    register,
    handleSubmit,
    setValue,
    reset, // ✅ Para limpiar el formulario
    formState: { errors },
  } = useForm<BrandForm>();

  const [brands, setBrands] = useState<Brand[]>([]);

  // 🚀 Obtener marcas desde el backend
  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/marcas');
      setBrands(response.data);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // 🚀 Crear nueva marca
  const onSubmit = async (data: BrandForm) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.name);

      if (data.logo) {
        formData.append('logo', data.logo);
      }

      await axios.post('http://localhost:3000/api/marcas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Marca creada exitosamente');
      fetchBrands(); // Recargar la lista
      reset(); // ✅ Limpiar el formulario
    } catch (error) {
      console.error('Error al crear la marca:', error);
      alert('Hubo un error al crear la marca.');
    }
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

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Lista de Marcas</h2>
        <div className="grid grid-cols-3 gap-4">
          {brands.map((brand) => (
            <div key={brand.id} className="border rounded-lg p-4">
              <img
                src={`http://localhost:3000/${brand.logo}`}
                alt={brand.nombre}
                className="w-full h-32 object-cover mb-2"
              />
              <p className="text-center font-semibold">{brand.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brands;
