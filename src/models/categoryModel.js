const db = require('../config/database');
const logger = require('../utils/logger'); // Asumiendo que tienes un módulo de logging

class Category {
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM categoria');
      logger.info(`Retrieved ${rows.length} categories`);
      return rows;
    } catch (error) {
      logger.error(`Error retrieving categories: ${error.message}`);
      throw error;
    }
  }

  static async getById(id) {
    try {
      if (!id || typeof id !== 'number') {
        throw new Error('Invalid category ID');
      }
      const [rows] = await db.query('SELECT * FROM categoria WHERE id = ?', [id]);
      if (rows.length === 0) {
        logger.warn(`Category with ID ${id} not found`);
        return null;
      }
      logger.info(`Retrieved category with ID: ${id}`);
      return rows[0];
    } catch (error) {
      logger.error(`Error retrieving category by ID: ${error.message}`);
      throw error;
    }
  }

  static async create(category) {
    try {
      if (!category || typeof category !== 'object') {
        throw new Error('Invalid category data');
      }

      const query = 'INSERT INTO categoria SET ?';
      const [result] = await db.query(query, [category]);

      logger.info(`New category created with ID: ${result.insertId}`);

      const [newCategory] = await db.query('SELECT * FROM categoria WHERE id = ?', [result.insertId]);

      return {
        id: result.insertId,
        category: newCategory[0]
      };
    } catch (error) {
      logger.error(`Error creating category: ${error.message}`);
      throw error;
    }
  }

  static async update(id, category) {
    try {
      if (!id || typeof id !== 'number' || !category || typeof category !== 'object') {
        throw new Error('Invalid update parameters');
      }

      const [result] = await db.query('UPDATE categoria SET ? WHERE id = ?', [category, id]);
      
      if (result.affectedRows === 0) {
        logger.warn(`No category found with ID ${id} for update`);
        return 0;
      }

      logger.info(`Updated category with ID: ${id}`);
      return result.affectedRows;
    } catch (error) {
      logger.error(`Error updating category: ${error.message}`);
      throw error;
    }
  }

  static async delete(id) {
    try {
      if (!id || typeof id !== 'number') {
        throw new Error('Invalid category ID');
      }

      const [result] = await db.query('DELETE FROM categoria WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        logger.warn(`No category found with ID ${id} for deletion`);
        return 0;
      }

      logger.info(`Deleted category with ID: ${id}`);
      return result.affectedRows;
    } catch (error) {
      logger.error(`Error deleting category: ${error.message}`);
      throw error;
    }
  }
}

module.exports = Category;
