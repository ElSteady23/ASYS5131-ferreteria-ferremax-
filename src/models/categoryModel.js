const db = require('../config/database');

class Category {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM categoria');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM categoria WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(category) {
    const [result] = await db.query('INSERT INTO categoria SET ?', category);
    return result.insertId;
  }

  static async update(id, category) {
    const [result] = await db.query('UPDATE categoria SET ? WHERE id = ?', [category, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM categoria WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Category;
