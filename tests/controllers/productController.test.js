const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const Product = require('../../src/models/Product')

describe('Product Controller - createProduct', () => {
  let createProduct
  let req
  let res
  let createStub

  beforeEach(() => {
    createStub = sinon.stub(Product, 'create')
    createProduct = proxyquire('../../src/controllers/productController', {
      '../../src/models/Product': {
        create: createStub
      }
    }).createProduct

    req = {
      body: { name: 'New Product', price: 100 }
    }

    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    }
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should return the created product with status 201 when creation is successful', async () => {
    createStub.resolves(1)

    await createProduct(req, res)

    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith({ id: 1, ...req.body })).to.be.true
  })

  it('should return 500 when there is an error during creation', async () => {
    createStub.rejects(new Error('Create Error'))

    await createProduct(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ error: 'Error al crear el producto' })).to.be.true
  })

  it('should call Product.create with correct parameters', async () => {
    createStub.resolves(1)

    await createProduct(req, res)

    expect(createStub.calledWith(req.body)).to.be.true
  })
})
