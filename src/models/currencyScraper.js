const fetch = require('node-fetch');
const db = require('../config/database');

class CurrencyScraper {
  static async scrapeDollarValue() {
    try {
      const response = await fetch('https://mindicador.cl/api');
      const data = await response.json();

      if (!data.dolar || !data.dolar.valor) {
        throw new Error('No se pudo obtener el valor del dólar');
      }

      const dollarValue = data.dolar.valor;
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

      await this.saveDollarValue(dollarValue, date);

      console.log(`Valor del dólar guardado: ${dollarValue} (${date})`);
    } catch (error) {
      console.error('Error al obtener o guardar el valor del dólar:', error.message);
      throw error;
    }
  }

  static async saveDollarValue(value, date) {
    try {
      const query = 'INSERT INTO divisas (nombre, valor, fecha) VALUES (?, ?, ?)';
      await db.execute(query, ['dolar', value, date]);
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error.message);
      throw error;
    }
  }
}

module.exports = CurrencyScraper;
