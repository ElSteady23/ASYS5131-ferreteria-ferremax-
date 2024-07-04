const Category = require('../models/categoryModel');
const { createErrorResponse, createSuccessResponse } = require('../utils/responseUtils');
const { logError } = require('../utils/errorUtils');
const Joi = require('joi'); // Biblioteca de validación

// Esquema de validación para categorías
const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  // Agrega más campos según sea necesario
});

// Middleware de manejo de errores
const handleError = (err, req, res, next) => {
  // logError('Error en la ruta', err);
  // // res.status(500).json(createErrorResponse('Error en el servidor', 500, err));
};

// Función de validación de categoría
const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    // // return res.status(400).json(createErrorResponse(error.details[0].message, 400));
  }
  next();
};

// Servicio de categorías
const categoryService = {
  getAllCategories: async () => {
    // return await Category.getAll();
  },
  getCategoryById: async (id) => {
    // return await Category.getById(id);
  },
  createCategory: async (categoryData) => {
    // return await Category.create(categoryData);
  },
  updateCategory: async (id, categoryData) => {
    // return await Category.update(id, categoryData);
  },
  deleteCategory: async (id) => {
    // return await Category.delete(id);
  },
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    // res.json(createSuccessResponse(categories));
  } catch (err) {
    next(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (category) {
      // res.json(createSuccessResponse(category));
    } else {
      // // res.status(404).json(createErrorResponse('Categoría no encontrada', 404));
    }
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const id = await categoryService.createCategory(req.body);
    // res.status(201).json(createSuccessResponse({ id, ...req.body }));
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const affectedRows = await categoryService.updateCategory(req.params.id, req.body);
    if (affectedRows > 0) {
      // res.json(createSuccessResponse({ id: req.params.id, ...req.body }));
    } else {
      // // res.status(404).json(createErrorResponse('Categoría no encontrada', 404));
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const affectedRows = await categoryService.deleteCategory(req.params.id);
    if (affectedRows > 0) {
      // res.json(createSuccessResponse({ message: 'Categoría eliminada correctamente' }));
    } else {
      // // res.status(404).json(createErrorResponse('Categoría no encontrada', 404));
    }
  } catch (err) {
    next(err);
  }
};

// Middleware de validación de categoría
exports.validateCategory = validateCategory;

// Middleware de manejo de errores
exports.handleError = handleError;

// Exporta el servicio de categorías para pruebas unitarias
exports.categoryService = categoryService;
