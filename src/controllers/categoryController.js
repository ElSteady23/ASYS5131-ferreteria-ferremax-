const Category = require('../models/categoryModel');

// Función simple para crear respuestas de error estandarizadas
const createErrorResponse = (message, statusCode = 500) => ({
  error: message,
  statusCode
});

// Función simple para crear respuestas de éxito estandarizadas
const createSuccessResponse = (data) => ({
  data,
  success: true
});

// Función simple para loggear errores (puedes mejorarla según tus necesidades)
const logError = (message, error) => {
  console.error(`${message}:`, error);
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(createSuccessResponse(categories));
  } catch (err) {
    logError('Error al obtener categorías', err);
    res.status(500).json(createErrorResponse('Error al obtener categorías'));
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (category) {
      res.json(createSuccessResponse(category));
    } else {
      res.status(404).json(createErrorResponse('Categoría no encontrada', 404));
    }
  } catch (err) {
    logError('Error al obtener la categoría', err);
    res.status(500).json(createErrorResponse('Error al obtener la categoría'));
  }
};

exports.createCategory = async (req, res) => {
  try {
    const id = await Category.create(req.body);
    res.status(201).json(createSuccessResponse({ id, ...req.body }));
  } catch (err) {
    logError('Error al crear la categoría', err);
    res.status(500).json(createErrorResponse('Error al crear la categoría'));
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const affectedRows = await Category.update(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json(createSuccessResponse({ id: req.params.id, ...req.body }));
    } else {
      res.status(404).json(createErrorResponse('Categoría no encontrada', 404));
    }
  } catch (err) {
    logError('Error al actualizar la categoría', err);
    res.status(500).json(createErrorResponse('Error al actualizar la categoría'));
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const affectedRows = await Category.delete(req.params.id);
    if (affectedRows > 0) {
      res.json(createSuccessResponse({ message: 'Categoría eliminada correctamente' }));
    } else {
      res.status(404).json(createErrorResponse('Categoría no encontrada', 404));
    }
  } catch (err) {
    logError('Error al eliminar la categoría', err);
    res.status(500).json(createErrorResponse('Error al eliminar la categoría'));
  }
};
