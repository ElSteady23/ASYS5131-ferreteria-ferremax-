const Product = require('../models/productModel');

// Función auxiliar para validar ID (esta es una implementación básica, ajusta según tus necesidades)
function isValidId(id) {
  return !isNaN(id) && parseInt(id) > 0;
}

exports.getAllProducts = async (req, res) => {
  try {
    // Implementación básica de paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const products = await Product.getAll(limit, offset);
    res.json(products);
  } catch (err) {
    console.error('Error in getAllProducts:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.getProductById = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ error: 'ID de producto inválido' });
  }

  try {
    const product = await Product.getById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    console.error('Error in getProductById:', err);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Nota: El resto de las funciones (createProduct, updateProduct, deleteProduct) 
// seguirían un patrón similar con las mejoras aplicadas.

// Ejemplo de createProduct con las mejoras:
exports.createProduct = async (req, res) => {
  try {
    // Aquí podrías agregar validación de entrada para req.body
    const id = await Product.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    console.error('Error in createProduct:', err);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// ... (updateProduct y deleteProduct seguirían un patrón similar)


exports.updateProduct = async (req, res) => {
  try {
    const affectedRows = await Product.update(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json({ id: req.params.id, ...req.body });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const affectedRows = await Product.delete(req.params.id);
    if (affectedRows > 0) {
      res.json({ message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
