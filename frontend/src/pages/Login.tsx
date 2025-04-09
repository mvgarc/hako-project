import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { LogIn } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    // TODO: Implement login logic
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sistema de Compras
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicie sesión para continuar
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              {...register('email', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
              error={errors.email?.message}
            />
            <Input
              label="Contraseña"
              type="password"
              {...register('password', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              error={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center"
            size="lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;