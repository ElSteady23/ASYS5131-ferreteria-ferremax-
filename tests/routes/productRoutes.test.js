const { expect } = require('chai')
const sinon = require('sinon')
const express = require('express')

describe('Express Module', () => {
  it('should be a function', () => {
    expect(express).to.be.a('function')
  })

  it('should create an express application', () => {
    const app = express()
    expect(app).to.be.an('object')
    expect(app.use).to.be.a('function')
    expect(app.listen).to.be.a('function')
  })

  it('should handle routes', () => {
    const app = express()
    const routeHandler = sinon.stub()
    app.get('/test', routeHandler)
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        expect(middleware.route.path).to.equal('/test')
        expect(middleware.route.methods.get).to.be.true
      }
    })
  })

  it('should handle middleware', () => {
    const app = express()
    const middleware = sinon.stub()
    app.use(middleware)
    expect(app._router.stack.some((layer) => layer.handle === middleware)).to.be.true
  })
})
