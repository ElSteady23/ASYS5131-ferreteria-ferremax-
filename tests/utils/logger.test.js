const winston = require('winston')
const { expect } = require('chai')

describe('logger', () => {
  let loggerInstance

  beforeEach(() => {
    loggerInstance = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
      ],
    })
  })

  it('should log an info message', () => {
    const infoSpy = sinon.spy(loggerInstance, 'info')
    const message = 'This is an info message'
    loggerInstance.info(message)
    expect(infoSpy.calledWith(message)).to.be.true
    infoSpy.restore()
  })

  it('should log an error message', () => {
    const errorSpy = sinon.spy(loggerInstance, 'error')
    const message = 'This is an error message'
    loggerInstance.error(message)
    expect(errorSpy.calledWith(message)).to.be.true
    errorSpy.restore()
  })

  it('should log a warning message', () => {
    const warnSpy = sinon.spy(loggerInstance, 'warn')
    const message = 'This is a warning message'
    loggerInstance.warn(message)
    expect(warnSpy.calledWith(message)).to.be.true
    warnSpy.restore()
  })

  it('should log a debug message', () => {
    const debugSpy = sinon.spy(loggerInstance, 'debug')
    const message = 'This is a debug message'
    loggerInstance.debug(message)
    expect(debugSpy.calledWith(message)).to.be.true
    debugSpy.restore()
  })
})
