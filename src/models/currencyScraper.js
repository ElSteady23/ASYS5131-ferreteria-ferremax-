const fetch = require('node-fetch');
const winston = require('winston'); // Logging library
const config = require('../config/config');


// Custom error classes
class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FetchError';
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
}

class CurrencyScraper {
  static async scrapeDollarValue() {
    try {
      const response = await fetch(config.apiUrl);
      if (!response.ok) {
        throw new FetchError(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.dolar || !data.dolar.valor) {
        throw new FetchError('No se pudo obtener el valor del dólar');
      }

      const dollarValue = data.dolar.valor;
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

      await this.saveDollarValue(dollarValue, date);

      winston.info(`Valor del dólar guardado: ${dollarValue} (${date})`);
    } catch (error) {
      winston.error('Error al obtener o guardar el valor del dólar:', error.message);
      throw error;
    }
  }

  static async saveDollarValue(value, date) {
    try {
      const query = config.databaseQuery;
      await db.execute(query, ['dolar', value, date]);
    } catch (error) {
      winston.error('Error al guardar en la base de datos:', error.message);
      throw new DatabaseError('Error al guardar en la base de datos');
    }
  }
}

module.exports = CurrencyScraper;
