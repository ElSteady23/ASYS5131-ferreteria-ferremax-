const { expect } = require('chai')
const sinon = require('sinon')
const db = require('../../src/config/database')
const CurrencyScraper = require('../../src/models/currencyScraper')

describe('CurrencyScraper.saveDollarValue', () => {
  let executeStub

  beforeEach(() => {
    executeStub = sinon.stub(db, 'execute')
  })

  afterEach(() => {
    executeStub.restore()
  })

  it('should execute the query with correct parameters', async () => {
    const value = 100
    const date = '2023-10-01'

    await CurrencyScraper.saveDollarValue(value, date)

    expect(executeStub.calledOnce).to.be.true
    expect(executeStub.calledWith('UPDATE productos SET divisa_id = 1;', ['dolar', value, date])).to.be.true
  })

  it('should throw an error if the query execution fails', async () => {
    const value = 100
    const date = '2023-10-01'
    const error = new Error('Database error')

    executeStub.rejects(error)

    try {
      await CurrencyScraper.saveDollarValue(value, date)
    } catch (err) {
      expect(err).to.equal(error)
    }

    expect(executeStub.calledOnce).to.be.true
  })
})
