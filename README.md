# API Ferretería Ferremax

Esta es una API para una ferretería, desarrollada con Node.js y Express.

## Requisitos previosw

- Node.js (versión 12 o superior)
- MySQL

## Configuración

1. Clona este repositorio:

2. Instala las dependencias:

npm install


3. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno:

PORT=3000 DB_HOST=localhost DB_USER=tu_usuario DB_PASSWORD=tu_contraseña DB_NAME=nombre_de_tu_base_de_datos



4. Asegúrate de tener MySQL instalado y corriendo, y crea la base de datos que especificaste en `DB_NAME`.

## Ejecución

Para iniciar la API en modo de desarrollo:
npm run dev


Para iniciar la API en modo de producción:
npm start


La API estará disponible en `http://localhost:3000` (o el puerto que hayas especificado en las variables de entorno).

## Documentación de la API

La documentación de la API está disponible a través de Swagger UI. Una vez que la API esté en ejecución, puedes acceder a la documentación en:

http://localhost:3000/api-docs


## Pruebas
Para ejecutar las pruebas:
npm test




## Estructura del proyecto

- `src/`: Contiene el código fuente de la aplicación
  - `app.js`: Archivo principal de la aplicación
  - `config/`: Configuraciones (por ejemplo, conexión a la base de datos)
  - `models/`: Modelos de datos
  - `routes/`: Definición de rutas de la API
- `tests/`: Contiene los archivos de pruebas
- `swagger.json`: Documentación de la API en formato Swagger

## Tecnologías utilizadas

- Express.js
- MySQL2
- Cors
- Morgan
- Swagger UI Express
- Jest (para pruebas)
- Chai (para aserciones en pruebas)
- Sinon (para mocks y stubs en pruebas)

