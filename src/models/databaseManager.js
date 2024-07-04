// // databaseManager.js
// // const config = require('../config/config');
const winston = require('winston');
const db = require('../config/database');

const config = {
  apiUrl: 'https://mindicador.cl/api',
  databaseQuery: 'INSERT INTO divisas (nombre, valor, fecha) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE valor = ?, fecha = ?',
};


/**
 * Módulo encargado de manejar las operaciones con la base de datos.
 */
class DatabaseManager {
  /**
   * Guarda el valor del dólar en la base de datos.
   * @param {number} value - Valor del dólar.
   * @param {string} date - Fecha en formato ISO.
   */
  static async saveDollarValue(value, date) {
    try {
      const query = config.databaseQuery;
      await db.execute(query, ['dolar', value, date, value, date]);
      winston.info(`Valor del dólar guardado en la base de datos: ${value} (${date})`);
    } catch (error) {
      winston.error('Error al guardar en la base de datos:', error.message);
      throw new Error('Error al guardar en la base de datos');
    }
  }
}

module.exports = DatabaseManager;
