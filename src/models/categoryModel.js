const db = require('../config/database');
const logger = require('../utils/logger');

class Category {
  static async getAll() {
    try {
      const query = 'SELECT * FROM categories';
      const [rows] = await db.query(query);

      if (rows.length === 0) {
        logger.info('No categories found');
        return [];
      }

      logger.info(`Retrieved ${rows.length} categories`);
      return rows;
    } catch (error) {
      logger.error(`Error retrieving categories: ${error.message}`);
      throw error;
    }
  }

  static async getAllPaginated(limit = 100, offset = 0) {
    try {
      const query = 'SELECT * FROM categories LIMIT ? OFFSET ?';
      const [rows] = await db.query(query, [limit, offset]);

      if (rows.length === 0) {
        logger.info('No categories found');
        return [];
      }

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

      const query = 'SELECT * FROM categories WHERE id = ?';
      const [rows] = await db.query(query, [id]);

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

      const query = 'INSERT INTO categories SET ?';
      const [result] = await db.query(query, [category]);

      logger.info(`New category created with ID: ${result.insertId}`);

      const [newCategory] = await db.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);

      return {
        id: result.insertId,
        category: newCategory[0]
      };
    } catch (error) {
      logger.error(`Error creating category: ${error.message}`);
      throw error;
    }
  }

}

module.exports = Category;
