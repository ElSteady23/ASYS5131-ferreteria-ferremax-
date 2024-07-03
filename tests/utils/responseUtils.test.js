const { expect } = require('chai')
const responseUtils = require('../../src/utils/responseUtils')

describe('responseUtils', () => {
  describe('createErrorResponse', () => {
    it('should return an error response object with default status code 500', () => {
      const message = 'An error occurred'
      const expected = {
        error: message,
        statusCode: 500,
        details: undefined,
      }
      const result = responseUtils.createErrorResponse(message)
      expect(result).to.deep.equal(expected)
    })

    it('should return an error response object with provided status code', () => {
      const message = 'Not found'
      const statusCode = 404
      const expected = {
        error: message,
        statusCode,
        details: undefined,
      }
      const result = responseUtils.createErrorResponse(message, statusCode)
      expect(result).to.deep.equal(expected)
    })

    it('should return an error response object with error details', () => {
      const message = 'Validation error'
      const error = new Error('Invalid input')
      error.details = { field: 'name', message: 'Name is required' }
      const expected = {
        error: message,
        statusCode: 500,
        details: error.details,
      }
      const result = responseUtils.createErrorResponse(message, 500, error)
      expect(result).to.deep.equal(expected)
    })
  })
})
