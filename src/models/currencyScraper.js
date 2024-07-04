// currencyScraper.js
const fetch = require('node-fetch');
const winston = require('winston'); // Logging library
// const config = require('../config/config');
const DatabaseManager = require('./databaseManager');


const config = {
  apiUrl: 'https://mindicador.cl/api',
  databaseQuery: 'UPDATE productos SET divisa_id = 1;',
};

/**
 * Clase encargada de obtener el valor del dólar desde una API externa.
 */
class CurrencyScraper {
  /**
   * Obtiene el valor del dólar desde la API y lo guarda en la base de datos.
   */
  static async scrapeDollarValue() {
    try {
      const response = await fetch(config.apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.dolar || !data.dolar.valor) {
        throw new Error('No se pudo obtener el valor del dólar');
      }

      const dollarValue = data.dolar.valor;
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

      await DatabaseManager.saveDollarValue(dollarValue, date);

      winston.info(`Valor del dólar guardado: ${dollarValue} (${date})`);
    } catch (error) {
      winston.error('Error al obtener el valor del dólar:', error.message);
      // Aquí se podría registrar información adicional sobre el error
      throw error;
    }
  }
}

module.exports = CurrencyScraper;
