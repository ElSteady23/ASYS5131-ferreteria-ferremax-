const Category = require('../models/categoryModel');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const id = await Category.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const affectedRows = await Category.update(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json({ id: req.params.id, ...req.body });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const affectedRows = await Category.delete(req.params.id);
    if (affectedRows > 0) {
      res.json({ message: 'Categoría eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};
