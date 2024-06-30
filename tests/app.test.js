const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('App Configuration', () => {
  let app
  let processEnvStub

  beforeEach(() => {
    processEnvStub = sinon.stub(process, 'env').value({ FRONTEND_URL: 'http://example.com' })
    app = proxyquire('../src/app', {})
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should use FRONTEND_URL from environment variables if available', () => {
    const origin = process.env.FRONTEND_URL || 'http://127.0.0.1:5500'
    expect(origin).to.equal('http://example.com')
  })

  it('should default to localhost URL if FRONTEND_URL is not set', () => {
    processEnvStub.value({})
    const origin = process.env.FRONTEND_URL || 'http://127.0.0.1:5500'
    expect(origin).to.equal('http://127.0.0.1:5500')
  })
})
