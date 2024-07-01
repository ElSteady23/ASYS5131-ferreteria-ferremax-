const { expect } = require('chai')
const sinon = require('sinon')
const db = require('../../src/config/database')
const logger = require('../../src/utils/logger')
const Category = require('../../src/models/categoryModel')

describe('Category Model - delete', () => {
  let queryStub
  let loggerInfoStub
  let loggerWarnStub
  let loggerErrorStub

  beforeEach(() => {
    queryStub = sinon.stub(db, 'query')
    loggerInfoStub = sinon.stub(logger, 'info')
    loggerWarnStub = sinon.stub(logger, 'warn')
    loggerErrorStub = sinon.stub(logger, 'error')
  })

  afterEach(() => {
    queryStub.restore()
    loggerInfoStub.restore()
    loggerWarnStub.restore()
    loggerErrorStub.restore()
  })

  it('should delete a category and return the number of affected rows', async () => {
    const id = 1
    const result = { affectedRows: 1 }
    queryStub.resolves([result])

    const affectedRows = await Category.delete(id)

    expect(queryStub.calledOnceWith('DELETE FROM categoria WHERE id = ?', [id])).to.be.true
    expect(loggerInfoStub.calledOnceWith(`Deleted category with ID: ${id}`)).to.be.true
    expect(affectedRows).to.equal(1)
  })

  it('should return 0 if no category is found for deletion', async () => {
    const id = 1
    const result = { affectedRows: 0 }
    queryStub.resolves([result])

    const affectedRows = await Category.delete(id)

    expect(queryStub.calledOnceWith('DELETE FROM categoria WHERE id = ?', [id])).to.be.true
    expect(loggerWarnStub.calledOnceWith(`No category found with ID ${id} for deletion`)).to.be.true
    expect(affectedRows).to.equal(0)
  })

  it('should throw an error if the category ID is invalid', async () => {
    const invalidId = 'invalid-id'

    try {
      await Category.delete(invalidId)
    } catch (error) {
      expect(error.message).to.equal('Invalid category ID')
    }

    expect(queryStub.notCalled).to.be.true
    expect(loggerErrorStub.notCalled).to.be.true
  })

  it('should log and throw an error if the database query fails', async () => {
    const id = 1
    const error = new Error('Database error')
    queryStub.rejects(error)

    try {
      await Category.delete(id)
    } catch (err) {
      expect(err).to.equal(error)
    }

    expect(queryStub.calledOnceWith('DELETE FROM categoria WHERE id = ?', [id])).to.be.true
    expect(loggerErrorStub.calledOnceWith(`Error deleting category: ${error.message}`)).to.be.true
  })
})
