const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const transbankRoutes = require('./routes/transbankRoutes.js');
const Product = require('./models/productModel');
const configureMiddleware = require('./middleware/configureMiddleware');

require('dotenv').config();

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || process.env.DEFAULT_FRONTEND_URL,
  optionsSuccessStatus: 200
}

// Configurar middleware
configureMiddleware(app, corsOptions);

// Rutas de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/transbank', transbankRoutes);

// app.use((err, req, res, next) => {
//   httpError(res, 'Error interno del servidor', err);
// });


// Función para actualizar el valor del dólar
async function updateDollarValue() {
  try {
    await Product.updateDollarValue();
    console.log('Valor del dólar actualizado al iniciar la API');
  } catch (error) {
    console.error('Error al actualizar el valor del dólar al iniciar:', error.message);
  }
}

// Actualizar el valor del dólar al iniciar la API
try {
  updateDollarValue();
} catch (error) {
  console.error('Error al actualizar el valor del dólar:', error);
}

// Programar la actualización periódica (por ejemplo, cada 24 horas)
setInterval(updateDollarValue, 24 * 60 * 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
