const { expect } = require('chai')
const sinon = require('sinon')
const Product = require('../../src/models/Product')
const { createProduct } = require('../../src/controllers/productController')

describe('createProduct', () => {
  let req, res

  beforeEach(() => {
    req = { body: { name: 'Product 1', price: 10 } }
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() }
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should create a new product and return the created product', async () => {
    const createdProduct = { id: 1, ...req.body }
    sinon.stub(Product, 'create').resolves(createdProduct.id)

    await createProduct(req, res)

    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith(createdProduct)).to.be.true
  })

  it('should handle errors and return a 500 status code with an error message', async () => {
    const error = new Error('Error creating product')
    sinon.stub(Product, 'create').rejects(error)

    await createProduct(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ error: 'Error al crear el producto' })).to.be.true
  })

  it('should handle empty request body', async () => {
    req.body = {}
    sinon.stub(Product, 'create').resolves(1)

    await createProduct(req, res)

    expect(res.status.calledWith(201)).to.be.true
    expect(res.json.calledWith({ id: 1, ...req.body })).to.be.true
  })
})
