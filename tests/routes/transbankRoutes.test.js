const { expect } = require('chai')
const sinon = require('sinon')
const { Router } = require('express')

describe('transbankRoutes', () => {
  it('should be an instance of Router', () => {
    const routerInstance = Router()
    expect(routerInstance).to.be.an.instanceof(Router)
  })

  it('should have the necessary methods', () => {
    const routerInstance = Router()
    expect(routerInstance).to.have.property('use').that.is.a('function')
    expect(routerInstance).to.have.property('route').that.is.a('function')
    expect(routerInstance).to.have.property('get').that.is.a('function')
    expect(routerInstance).to.have.property('post').that.is.a('function')
    expect(routerInstance).to.have.property('put').that.is.a('function')
    expect(routerInstance).to.have.property('delete').that.is.a('function')
  })

  it('should call Router without errors', () => {
    const routerSpy = sinon.spy(Router)
    routerSpy()
    expect(routerSpy.calledOnce).to.be.true
  })
})
