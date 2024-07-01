const { expect } = require('chai')
const sinon = require('sinon')
const winston = require('winston')
const logger = require('../../src/utils/logger')

describe('Logger Utility', () => {
  let winstonInfoStub
  let winstonWarnStub
  let winstonErrorStub

  beforeEach(() => {
    winstonInfoStub = sinon.stub(winston, 'info')
    winstonWarnStub = sinon.stub(winston, 'warn')
    winstonErrorStub = sinon.stub(winston, 'error')
  })

  afterEach(() => {
    winstonInfoStub.restore()
    winstonWarnStub.restore()
    winstonErrorStub.restore()
  })

  it('should log info messages correctly', () => {
    const message = 'This is an info message'
    logger.info(message)
    expect(winstonInfoStub.calledOnceWith(message)).to.be.true
  })

  it('should log warning messages correctly', () => {
    const message = 'This is a warning message'
    logger.warn(message)
    expect(winstonWarnStub.calledOnceWith(message)).to.be.true
  })

  it('should log error messages correctly', () => {
    const message = 'This is an error message'
    logger.error(message)
    expect(winstonErrorStub.calledOnceWith(message)).to.be.true
  })

  it('should handle logging objects correctly', () => {
    const message = { key: 'value' }
    logger.info(message)
    expect(winstonInfoStub.calledOnceWith(message)).to.be.true
  })

  it('should handle logging with multiple arguments', () => {
    const message = 'Message with'
    const additionalInfo = 'additional info'
    logger.info(message, additionalInfo)
    expect(winstonInfoStub.calledOnceWith(message, additionalInfo)).to.be.true
  })
})
