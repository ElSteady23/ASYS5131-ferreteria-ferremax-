const { expect } = require('chai')
const sinon = require('sinon')
const db = require('../../src/db')
const logger = require('../../src/utils/logger')
const CategoryModel = require('../../src/models/categoryModel')

describe('CategoryModel.getById', () => {
  let sandbox
  let dbQueryStub
  let loggerWarnStub
  let loggerInfoStub
  let loggerErrorStub

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    dbQueryStub = sandbox.stub(db, 'query')
    loggerWarnStub = sandbox.stub(logger, 'warn')
    loggerInfoStub = sandbox.stub(logger, 'info')
    loggerErrorStub = sandbox.stub(logger, 'error')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should throw an error if id is not a number', async () => {
    const invalidId = 'abc'
    try {
      await CategoryModel.getById(invalidId)
    } catch (error) {
      expect(error.message).to.equal('Invalid category ID')
    }
  })

  it('should return null if category is not found', async () => {
    const id = 1
    dbQueryStub.resolves([[]])

    const result = await CategoryModel.getById(id)

    expect(result).to.be.null
    expect(loggerWarnStub.calledOnceWith(`Category with ID ${id} not found`)).to.be.true
  })

  it('should return the category if found', async () => {
    const id = 1
    const category = { id: 1, name: 'Category 1' }
    dbQueryStub.resolves([[category]])

    const result = await CategoryModel.getById(id)

    expect(result).to.deep.equal(category)
    expect(loggerInfoStub.calledOnceWith(`Retrieved category with ID: ${id}`)).to.be.true
  })

  it('should throw the error if an error occurs', async () => {
    const id = 1
    const error = new Error('Database error')
    dbQueryStub.throws(error)

    try {
      await CategoryModel.getById(id)
    } catch (err) {
      expect(err).to.equal(error)
      expect(loggerErrorStub.calledOnceWith(`Error retrieving category by ID: ${error.message}`)).to.be.true
    }
  })
})
