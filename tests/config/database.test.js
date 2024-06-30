const mysql = require('mysql2')
const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('Database Pool Configuration', () => {
  let createPoolStub
  let pool

  beforeEach(() => {
    createPoolStub = sinon.stub(mysql, 'createPool')
    pool = proxyquire('../../src/config/database', {
      'mysql2': {
        createPool: createPoolStub
      }
    })
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should create a pool with the correct configuration', () => {
    const config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }

    expect(createPoolStub.calledWith(config)).to.be.true
  })

  it('should set waitForConnections to true', () => {
    const config = createPoolStub.firstCall.args[0]
    expect(config.waitForConnections).to.be.true
  })

  it('should set connectionLimit to 10', () => {
    const config = createPoolStub.firstCall.args[0]
    expect(config.connectionLimit).to.equal(10)
  })

  it('should set queueLimit to 0', () => {
    const config = createPoolStub.firstCall.args[0]
    expect(config.queueLimit).to.equal(0)
  })

  it('should use environment variables for database configuration', () => {
    const config = createPoolStub.firstCall.args[0]
    expect(config.host).to.equal(process.env.DB_HOST)
    expect(config.user).to.equal(process.env.DB_USER)
    expect(config.password).to.equal(process.env.DB_PASSWORD)
    expect(config.database).to.equal(process.env.DB_NAME)
  })
})
