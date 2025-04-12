# 📦 Hako Project

Este es un proyecto full stack compuesto por un frontend desarrollado con **React + TypeScript** y un backend desarrollado con **Laravel**. El propósito del proyecto es un gestor de archivos para los catalogos que envian los proveedores.

## 🌐 Estructura del proyecto

```
project/
├── backend/       → Backend con Laravel
├── frontend/      → Frontend con React + TypeScript
└── README.md      → Documentación principal del proyecto
```

---

## 🖥️ Frontend

### 📦 Tecnologías

- React
- TypeScript
- Vite / Create React App
- Axios (o cualquier cliente HTTP)
- React Router DOM
- Tailwind CSS

### 🚀 Para iniciar el frontend:

```bash
cd frontend
npm install
npm run dev
```

### ⚙️ Variables de entorno

Crea un archivo `.env` en el directorio `frontend` con el siguiente contenido:

```
VITE_API_URL=http://localhost:8000/api
```

> Asegúrate de que `VITE_API_URL` coincida con la URL del backend.

---

## ⚙️ Backend

### 📦 Tecnologías

- PHP 8.x
- Laravel 10.x
- Sanctum (para autenticación)
- MySQL o PostgreSQL
- Composer

### 🚀 Para iniciar el backend:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### ⚙️ Configuración de base de datos

Edita el archivo `.env` dentro de la carpeta `backend`:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_tu_bd
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

---

## 🧪 Pruebas

En el backend puedes correr pruebas con:

```bash
php artisan test
```

En el frontend puedes correr pruebas con:

```bash
npm run test
```

---

## 📁 Recursos adicionales

- [Documentación de Laravel](https://laravel.com/docs)
- [Documentación de React](https://reactjs.org/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)

---

## 👩‍💻 Autores

- **María García**

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
