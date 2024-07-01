const mysql = require('mysql2')
const { expect } = require('chai')
const sinon = require('sinon')
require('dotenv').config()

describe('Database Pool Configuration', () => {
  let createPoolStub

  before(() => {
    createPoolStub = sinon.stub(mysql, 'createPool')
  })

  after(() => {
    createPoolStub.restore()
  })

  it('should create a pool with the correct configuration', () => {
    const poolConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }

    require('../../src/config/database')

    expect(createPoolStub.calledOnce).to.be.true
    expect(createPoolStub.calledWith(poolConfig)).to.be.true
  })

  it('should throw an error if DB_HOST is not defined', () => {
    const originalHost = process.env.DB_HOST
    delete process.env.DB_HOST

    try {
      require('../../src/config/database')
    } catch (error) {
      expect(error).to.exist
    } finally {
      process.env.DB_HOST = originalHost
    }
  })

  it('should throw an error if DB_USER is not defined', () => {
    const originalUser = process.env.DB_USER
    delete process.env.DB_USER

    try {
      require('../../src/config/database')
    } catch (error) {
      expect(error).to.exist
    } finally {
      process.env.DB_USER = originalUser
    }
  })

  it('should throw an error if DB_PASSWORD is not defined', () => {
    const originalPassword = process.env.DB_PASSWORD
    delete process.env.DB_PASSWORD

    try {
      require('../../src/config/database')
    } catch (error) {
      expect(error).to.exist
    } finally {
      process.env.DB_PASSWORD = originalPassword
    }
  })

  it('should throw an error if DB_NAME is not defined', () => {
    const originalName = process.env.DB_NAME
    delete process.env.DB_NAME

    try {
      require('../../src/config/database')
    } catch (error) {
      expect(error).to.exist
    } finally {
      process.env.DB_NAME = originalName
    }
  })
})
