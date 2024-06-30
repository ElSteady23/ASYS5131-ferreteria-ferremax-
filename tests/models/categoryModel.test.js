const { expect } = require('chai')
const sinon = require('sinon')
const Category = require('../../src/models/Category')

describe('Category Model', () => {
  let createStub, findByIdStub, updateStub, deleteStub

  beforeEach(() => {
    createStub = sinon.stub(Category, 'create')
    findByIdStub = sinon.stub(Category, 'findById')
    updateStub = sinon.stub(Category, 'update')
    deleteStub = sinon.stub(Category, 'delete')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should create a new category', async () => {
    const newCategory = { name: 'New Category' }
    createStub.resolves(newCategory)

    const result = await Category.create(newCategory)

    expect(createStub.calledWith(newCategory)).to.be.true
    expect(result).to.equal(newCategory)
  })

  it('should find a category by ID', async () => {
    const category = { id: 1, name: 'Category 1' }
    findByIdStub.resolves(category)

    const result = await Category.findById(1)

    expect(findByIdStub.calledWith(1)).to.be.true
    expect(result).to.equal(category)
  })

  it('should update a category', async () => {
    const updatedCategory = { id: 1, name: 'Updated Category' }
    updateStub.resolves(1)

    const result = await Category.update(1, { name: 'Updated Category' })

    expect(updateStub.calledWith(1, { name: 'Updated Category' })).to.be.true
    expect(result).to.equal(1)
  })

  it('should delete a category', async () => {
    deleteStub.resolves(1)

    const result = await Category.delete(1)

    expect(deleteStub.calledWith(1)).to.be.true
    expect(result).to.equal(1)
  })

  it('should return null if category not found by ID', async () => {
    findByIdStub.resolves(null)

    const result = await Category.findById(999)

    expect(findByIdStub.calledWith(999)).to.be.true
    expect(result).to.be.null
  })

  it('should return 0 if category update fails', async () => {
    updateStub.resolves(0)

    const result = await Category.update(999, { name: 'Non-existent Category' })

    expect(updateStub.calledWith(999, { name: 'Non-existent Category' })).to.be.true
    expect(result).to.equal(0)
  })

  it('should return 0 if category deletion fails', async () => {
    deleteStub.resolves(0)

    const result = await Category.delete(999)

    expect(deleteStub.calledWith(999)).to.be.true
    expect(result).to.equal(0)
  })
})
