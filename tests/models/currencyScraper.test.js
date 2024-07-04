const nock = require('nock');
const CurrencyScraper = require('./currencyScraper');
const DatabaseManager = require('./databaseManager');

jest.mock('./databaseManager');

describe('CurrencyScraper', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('scrapeDollarValue should fetch dollar value and save it to the database', async () => {
    const dollarValue = 800.12;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    nock('https://mindicador.cl')
      .get('/api')
      .reply(200, { dolar: { valor: dollarValue } });

    const saveDollarValueMock = jest.spyOn(DatabaseManager, 'saveDollarValue');

    await CurrencyScraper.scrapeDollarValue();

    expect(saveDollarValueMock).toHaveBeenCalledWith(dollarValue, expect.any(String));
  });

  test('scrapeDollarValue should throw an error if the API response is not successful', async () => {
    nock('https://mindicador.cl')
      .get('/api')
      .reply(500, 'Internal Server Error');

    await expect(CurrencyScraper.scrapeDollarValue()).rejects.toThrow('Failed to fetch data: 500 Internal Server Error');
  });

  test('scrapeDollarValue should throw an error if the API response does not contain dollar value', async () => {
    nock('https://mindicador.cl')
      .get('/api')
      .reply(200, { other_data: 'some value' });

    await expect(CurrencyScraper.scrapeDollarValue()).rejects.toThrow('No se pudo obtener el valor del dólar');
  });
});
