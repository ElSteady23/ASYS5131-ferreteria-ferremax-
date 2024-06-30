const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const Category = require('../../src/models/Category')

describe('Category Controller - updateCategory', () => {
  let updateCategory
  let req
  let res
  let updateStub

  beforeEach(() => {
    updateStub = sinon.stub(Category, 'update')
    updateCategory = proxyquire('../../src/controllers/categoryController', {
      '../../src/models/Category': {
        update: updateStub
      }
    }).updateCategory

    req = {
      params: { id: 1 },
      body: { name: 'Updated Category' }
    }

    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    }
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should return the updated category when update is successful', async () => {
    updateStub.resolves(1)

    await updateCategory(req, res)

    expect(res.json.calledWith({ id: req.params.id, ...req.body })).to.be.true
  })

  it('should return 404 when category is not found', async () => {
    updateStub.resolves(0)

    await updateCategory(req, res)

    expect(res.status.calledWith(404)).to.be.true
    expect(res.json.calledWith({ error: 'Categoría no encontrada' })).to.be.true
  })

  it('should return 500 when there is an error during update', async () => {
    updateStub.rejects(new Error('Update Error'))

    await updateCategory(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ error: 'Error al actualizar la categoría' })).to.be.true
  })

  it('should call Category.update with correct parameters', async () => {
    updateStub.resolves(1)

    await updateCategory(req, res)

    expect(updateStub.calledWith(req.params.id, req.body)).to.be.true
  })
})
