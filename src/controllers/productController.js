const Product = require('../models/productModel');
const { isValidNumber, isValidId } = require('../utils/validatorUtils');

// Función para validar los parámetros de paginación
function validatePaginationParams(page, limit) {
  if (!isValidNumber(page) || !isValidNumber(limit) || page < 1 || limit < 1) {
    const error = new Error('Parámetros de paginación inválidos');
    error.code = 'INVALID_PAGINATION_PARAMS';
    throw error;
  }
}

// Función para calcular los parámetros de paginación
function getPaginationParams(query = {}) {
  const { page = 1, limit = 10 } = query;
  validatePaginationParams(page, limit);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

exports.getAllProducts = async (req, res) => {
  try {
    const {limit, offset } = getPaginationParams(req.query);
    const products = await Product.getAll(limit, offset);
    // res.json(products);
  } catch (err) {
    // console.error('Error in getAllProducts:', err);
    // res.status(500).json({ error: 'Error al obtener productos', details: err.message });
  }
};

exports.getProductById = async (req, res) => {
  if (!isValidId(req.params.id)) {
    // return res.status(400).json({ error: 'ID de producto inválido' });
  }

  try {
    const product = await Product.getById(req.params.id);
    if (product) {
      // res.json(product);
    } else {
      // res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    // console.error('Error in getProductById:', err);
    // res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // Aquí podrías agregar validación de entrada para req.body
    const id = await Product.create(req.body);
    // res.status(201).json({ id, ...req.body });
  } catch (err) {
    // console.error('Error in createProduct:', err);
    // res.status(500).json({ error: 'Error al crear el producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const affectedRows = await Product.update(req.params.id, req.body);
    if (affectedRows > 0) {
      // res.json({ id: req.params.id, ...req.body });
    } else {
      // res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    // res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const affectedRows = await Product.delete(req.params.id);
    if (affectedRows > 0) {
      // res.json({ message: 'Producto eliminado correctamente' });
    } else {
      // res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    // res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
