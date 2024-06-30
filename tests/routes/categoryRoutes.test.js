const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('Category Routes - getCategoryById', () => {
  let getCategoryById
  let req
  let res
  let next
  let getCategoryByIdStub

  beforeEach(() => {
    getCategoryByIdStub = sinon.stub()
    getCategoryById = proxyquire('../../src/controllers/categoryController', {
      './categoryController': {
        getCategoryById: getCategoryByIdStub
      }
    }).getCategoryById

    req = {
      params: { id: '1' }
    }

    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    }

    next = sinon.spy()
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should return category data with status 200 when category is found', async () => {
    const categoryData = { id: 1, name: 'Category 1' }
    getCategoryByIdStub.resolves(categoryData)

    await getCategoryById(req, res, next)

    expect(res.status.calledWith(200)).to.be.true
    expect(res.json.calledWith(categoryData)).to.be.true
  })

  it('should return 404 when category is not found', async () => {
    getCategoryByIdStub.resolves(null)

    await getCategoryById(req, res, next)

    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ error: 'Category not found' })).to.be.true
  })

  it('should return 500 when there is an error', async () => {
    getCategoryByIdStub.rejects(new Error('Internal Server Error'))

    await getCategoryById(req, res, next)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ error: 'Internal Server Error' })).to.be.true
  })

  it('should call next with error when there is an exception', async () => {
    const error = new Error('Exception')
    getCategoryByIdStub.throws(error)

    await getCategoryById(req, res, next)

    expect(next.calledWith(error)).to.be.true
  })
})
