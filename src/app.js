const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const transbankRoutes = require('./routes/transbankRoutes.js'); // Añade esta línea
const Product = require('./models/productModel');

require('dotenv').config();

const app = express();

// Configuración de CORS
// const corsOptions = {
//   origin: process.env.FRONTEND_URL || 'http://127.0.0.1:5500', // Asume que tu frontend está en el puerto 5500
//   optionsSuccessStatus: 200
// }

app.use(cors());
// app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/transbank', transbankRoutes);


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
updateDollarValue();

// Programar la actualización periódica (por ejemplo, cada 24 horas)
setInterval(updateDollarValue, 24 * 60 * 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
