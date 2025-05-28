# 📦 Hako Project

Este es un proyecto full stack compuesto por un frontend desarrollado con **React + TypeScript** y un backend desarrollado con **Laravel**. El propósito del proyecto es un gestor de archivos para los catalogos que envian los proveedores.

## 🌐 Estructura del proyecto

```
project/
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

## 🧪 Pruebas

En el frontend puedes correr pruebas con:

```bash
npm run test
```

---

## 📁 Recursos adicionales

- [Documentación de React](https://reactjs.org/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)

---

## 👩‍💻 Autores

- **María García**

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
