const { expect } = require('chai')
const sinon = require('sinon')
const { createErrorResponse } = require('../../src/utils/errorUtils')

describe('createErrorResponse', () => {
  it('should return an object with the correct structure', () => {
    const message = 'Something went wrong'
    const statusCode = 500
    const errorResponse = createErrorResponse(message, statusCode)

    expect(errorResponse).to.be.an('object')
    expect(errorResponse.error).to.equal(message)
    expect(errorResponse.statusCode).to.equal(statusCode)
  })

  it('should use the default status code if not provided', () => {
    const message = 'Something went wrong'
    const errorResponse = createErrorResponse(message)

    expect(errorResponse.statusCode).to.equal(500)
  })

  it('should handle empty message', () => {
    const errorResponse = createErrorResponse()

    expect(errorResponse.error).to.equal('Internal Server Error')
    expect(errorResponse.statusCode).to.equal(500)
  })

  it('should handle non-string message', () => {
    const message = { error: 'Something went wrong' }
    const errorResponse = createErrorResponse(message)

    expect(errorResponse.error).to.equal('Internal Server Error')
    expect(errorResponse.statusCode).to.equal(500)
  })
})
