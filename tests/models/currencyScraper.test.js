const { expect } = require('chai')
const sinon = require('sinon')
const fetch = require('node-fetch')
const winston = require('winston')
const CurrencyScraper = require('../../src/models/currencyScraper')
const config = require('../../src/config')

describe('CurrencyScraper', () => {
  let fetchStub
  let saveDollarValueStub
  let winstonInfoStub
  let winstonErrorStub

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch')
    saveDollarValueStub = sinon.stub(CurrencyScraper, 'saveDollarValue')
    winstonInfoStub = sinon.stub(winston, 'info')
    winstonErrorStub = sinon.stub(winston, 'error')
  })

  afterEach(() => {
    fetchStub.restore()
    saveDollarValueStub.restore()
    winstonInfoStub.restore()
    winstonErrorStub.restore()
  })

  it('should throw an error when the API response is not ok', async () => {
    const errorMessage = 'Failed to fetch data: 500 Internal Server Error'
    fetchStub.resolves({ ok: false, status: 500, statusText: 'Internal Server Error' })

    try {
      await CurrencyScraper.scrapeDollarValue()
    } catch (error) {
      expect(error.message).to.equal(errorMessage)
      expect(winstonErrorStub.calledOnce).to.be.true
      expect(winstonErrorStub.args[0][0]).to.contain('Error al obtener o guardar el valor del dólar')
    }
  })

  it('should throw an error when the API response does not contain dolar or dolar.valor', async () => {
    const errorMessage = 'No se pudo obtener el valor del dólar'
    fetchStub.resolves({ ok: true, json: () => Promise.resolve({ other: 'data' }) })

    try {
      await CurrencyScraper.scrapeDollarValue()
    } catch (error) {
      expect(error.message).to.equal(errorMessage)
      expect(winstonErrorStub.calledOnce).to.be.true
      expect(winstonErrorStub.args[0][0]).to.contain('Error al obtener o guardar el valor del dólar')
    }
  })

  it('should save the dollar value and log the success message', async () => {
    const dollarValue = 100
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    fetchStub.resolves({ ok: true, json: () => Promise.resolve({ dolar: { valor: dollarValue } }) })

    await CurrencyScraper.scrapeDollarValue()

    expect(saveDollarValueStub.calledOnceWith(dollarValue, date)).to.be.true
    expect(winstonInfoStub.calledOnceWith(`Valor del dólar guardado: ${dollarValue} (${date})`)).to.be.true
  })
})
