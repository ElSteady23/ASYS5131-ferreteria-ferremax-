const { expect } = require('chai')
const sinon = require('sinon')
const { httpError } = require('../../src/utils/error')

describe('httpError', () => {
  let res

  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }
    sinon.stub(console, 'error')
  })

  afterEach(() => {
    console.error.restore()
  })

  it('should log the error to the console', () => {
    const message = 'An error occurred'
    const error = new Error('Test error')

    httpError(res, message, error)

    expect(console.error.calledWith(error)).to.be.true
  })

  it('should set the response status to 500', () => {
    const message = 'An error occurred'
    const error = new Error('Test error')

    httpError(res, message, error)

    expect(res.status.calledWith(500)).to.be.true
  })

  it('should send a JSON response with the error message', () => {
    const message = 'An error occurred'
    const error = new Error('Test error')

    httpError(res, message, error)

    expect(res.json.calledWith({ error: message })).to.be.true
  })

  it('should handle non-error objects gracefully', () => {
    const message = 'An error occurred'
    const error = 'String error'

    httpError(res, message, error)

    expect(console.error.calledWith(error)).to.be.true
    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ error: message })).to.be.true
  })

  it('should handle undefined error gracefully', () => {
    const message = 'An error occurred'
    const error = undefined

    httpError(res, message, error)

    expect(console.error.calledWith(error)).to.be.true
    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ error: message })).to.be.true
  })
})
