const { expect } = require('chai')
const sinon = require('sinon')
const productController = require('../../src/controllers/productController')
const Product = require('../../src/models/Product')
const { createErrorResponse } = require('../../src/utils/errorResponse')
const { logError } = require('../../src/utils/logger')

describe('Product Controller', () => {
  describe('getProductById', () => {
    it('should return 404 if product is not found', async () => {
      const req = { params: { id: 'nonexistent-id' } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      sinon.stub(Product, 'getById').resolves(null)

      await productController.getProductById(req, res)

      expect(res.status.calledWith(404)).to.be.true
      expect(res.json.calledWith(createErrorResponse('Producto no encontrado', 404))).to.be.true

      Product.getById.restore()
    })

    it('should return 500 if there is an error retrieving the product', async () => {
      const req = { params: { id: 'some-id' } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      const error = new Error('Database error')
      sinon.stub(Product, 'getById').rejects(error)
      sinon.stub(logError)

      await productController.getProductById(req, res)

      expect(logError.calledWith('Error al obtener el producto', error)).to.be.true
      expect(res.status.calledWith(500)).to.be.true
      expect(res.json.calledWith(createErrorResponse('Error al obtener el producto'))).to.be.true

      Product.getById.restore()
      logError.restore()
    })
  })

  describe('createProduct', () => {
    it('should return 201 and the created product', async () => {
      const req = { body: { name: 'New Product', price: 100 } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      const createdProduct = { id: 'new-id', name: 'New Product', price: 100 }
      sinon.stub(Product, 'create').resolves(createdProduct)

      await productController.createProduct(req, res)

      expect(res.status.calledWith(201)).to.be.true
      expect(res.json.calledWith(createdProduct)).to.be.true

      Product.create.restore()
    })

    it('should return 500 if there is an error creating the product', async () => {
      const req = { body: { name: 'New Product', price: 100 } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      const error = new Error('Database error')
      sinon.stub(Product, 'create').rejects(error)
      sinon.stub(logError)

      await productController.createProduct(req, res)

      expect(logError.calledWith('Error al crear el producto', error)).to.be.true
      expect(res.status.calledWith(500)).to.be.true
      expect(res.json.calledWith(createErrorResponse('Error al crear el producto'))).to.be.true

      Product.create.restore()
      logError.restore()
    })
  })
})
