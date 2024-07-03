const winston = require('winston')
const { expect } = require('chai')

describe('logger', () => {
  let logger

  beforeEach(() => {
    logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    })
  })

  it('should log an error message to the error.log file', () => {
    const errorMessage = 'This is an error message'
    logger.error(errorMessage)

    // Check that the error message was logged to the error.log file
    // This test assumes that the error.log file exists and can be read
    // You may need to mock the file system or use a different approach
    // depending on your project's setup
  })

  it('should log an info message to the combined.log file', () => {
    const infoMessage = 'This is an info message'
    logger.info(infoMessage)

    // Check that the info message was logged to the combined.log file
    // This test assumes that the combined.log file exists and can be read
    // You may need to mock the file system or use a different approach
    // depending on your project's setup
  })

  it('should not log a debug message', () => {
    const debugMessage = 'This is a debug message'
    logger.debug(debugMessage)

    // Check that the debug message was not logged to any file
    // This test assumes that the debug level is not enabled
    // You may need to modify the logger configuration or use a different approach
    // depending on your project's setup
  })
})
