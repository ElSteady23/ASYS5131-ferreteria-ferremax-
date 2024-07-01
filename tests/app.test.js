const { expect } = require('chai')
const sinon = require('sinon')
const cors = require('cors')
const app = require('../src/app')

describe('CORS Configuration', () => {
  let useStub

  beforeEach(() => {
    useStub = sinon.stub(app, 'use')
  })

  afterEach(() => {
    useStub.restore()
  })

  it('should configure CORS correctly', () => {
    require('../src/app'); // Ensure the app is loaded and CORS is configured

    expect(useStub.calledOnce).to.be.true
    expect(useStub.firstCall.args[0]).to.equal(cors())
  })

  it('should call app.use with CORS middleware', () => {
    require('../src/app'); // Ensure the app is loaded and CORS is configured

    expect(useStub.calledWith(cors())).to.be.true
  })
})
