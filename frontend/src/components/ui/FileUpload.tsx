import { ChangeEvent, forwardRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  className?: string;
  maxSize?: number; // in bytes
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ onFileSelect, className, maxSize = 2 * 1024 * 1024 * 1024 }, ref) => {
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setError('');

      if (!file) return;

      if (file.size > maxSize) {
        setError('El archivo no debe ser mayor a 2GB');
        return;
      }

      onFileSelect(file);
    };

    return (
      <div className={cn('w-full', className)}>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Haga clic para cargar</span> o arrastre y suelte
              </p>
              <p className="text-xs text-gray-500">
                Cualquier tipo de archivo (Máx. 2GB)
              </p>
            </div>
            <input
              ref={ref}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;