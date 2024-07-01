const { expect } = require('chai')
const sinon = require('sinon')
const CurrencyScraper = require('../../src/utils/CurrencyScraper')
const ProductModel = require('../../src/models/productModel')

describe('ProductModel.updateDollarValue', () => {
  let scrapeDollarValueStub

  beforeEach(() => {
    scrapeDollarValueStub = sinon.stub(CurrencyScraper, 'scrapeDollarValue')
  })

  afterEach(() => {
    scrapeDollarValueStub.restore()
  })

  it('should call CurrencyScraper.scrapeDollarValue and log success message', async () => {
    const consoleLogStub = sinon.stub(console, 'log')

    scrapeDollarValueStub.resolves()

    await ProductModel.updateDollarValue()

    expect(scrapeDollarValueStub.calledOnce).to.be.true
    expect(consoleLogStub.calledWith("Valor del dólar actualizado exitosamente")).to.be.true

    consoleLogStub.restore()
  })

  it('should log an error message and throw an error if CurrencyScraper.scrapeDollarValue fails', async () => {
    const consoleErrorStub = sinon.stub(console, 'error')
    const errorMessage = 'Network error'
    const error = new Error(errorMessage)

    scrapeDollarValueStub.rejects(error)

    try {
      await ProductModel.updateDollarValue()
    } catch (err) {
      expect(err).to.equal(error)
    }

    expect(scrapeDollarValueStub.calledOnce).to.be.true
    expect(consoleErrorStub.calledWith("Error al actualizar el valor del dólar:", errorMessage)).to.be.true

    consoleErrorStub.restore()
  })
})
