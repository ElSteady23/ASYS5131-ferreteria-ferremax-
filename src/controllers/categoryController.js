const Category = require('../models/categoryModel');
const { createErrorResponse, createSuccessResponse } = require('../utils/responseUtils');
const { logError } = require('../utils/errorUtils');

const { validateCategory } = require('../utils/validatorUtils');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(createSuccessResponse(categories));
  } catch (err) {
    logError('Error al obtener categorías', err);
    res.status(500).json(createErrorResponse('Error al obtener categorías', 500, err));
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
    res.status(500).json(createErrorResponse('Error al obtener la categoría', err));
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) {
      return res.status(400).json(createErrorResponse(error.details[0].message, 400));
    }

    const id = await Category.create(req.body);
    res.status(201).json(createSuccessResponse({ id, ...req.body }));
  } catch (err) {
    logError('Error al crear la categoría', err);
    res.status(500).json(createErrorResponse('Error al crear la categoría', err));
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) {
      return res.status(400).json(createErrorResponse(error.details[0].message, 400));
    }

    const affectedRows = await Category.update(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json(createSuccessResponse({ id: req.params.id, ...req.body }));
    } else {
      res.status(404).json(createErrorResponse('Categoría no encontrada', 404));
    }
  } catch (err) {
    logError('Error al actualizar la categoría', err);
    res.status(500).json(createErrorResponse('Error al actualizar la categoría', err));
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
    res.status(500).json(createErrorResponse('Error al eliminar la categoría', err));
  }
};
