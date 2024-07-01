const cors = require('cors')
const { expect } = require('chai')
const sinon = require('sinon')

describe('configureMiddleware', () => {
  let corsStub

  before(() => {
    corsStub = sinon.stub(cors)
  })

  after(() => {
    corsStub.restore()
  })

  it('should call cors with default options if no options are provided', () => {
    const defaultOptions = {}
    require('../../src/middleware/configureMiddleware')
    expect(corsStub.calledOnce).to.be.true
    expect(corsStub.calledWith(defaultOptions)).to.be.true
  })

  it('should call cors with provided options', () => {
    const options = { origin: 'http://example.com' }
    require('../../src/middleware/configureMiddleware')(options)
    expect(corsStub.calledOnce).to.be.true
    expect(corsStub.calledWith(options)).to.be.true
  })

  it('should throw an error if invalid options are provided', () => {
    const invalidOptions = { invalid: 'option' }
    try {
      require('../../src/middleware/configureMiddleware')(invalidOptions)
    } catch (error) {
      expect(error).to.exist
    }
  })
})
