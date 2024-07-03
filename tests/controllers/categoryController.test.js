const { expect } = require('chai')
const sinon = require('sinon')
const categoryController = require('../../src/controllers/categoryController')
const Category = require('../../src/models/Category')

describe('categoryController', () => {
  describe('getCategoryById', () => {
    let req, res, getByIdStub

    beforeEach(() => {
      req = { params: { id: 1 } }
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ json: sinon.spy() }),
      }
      getByIdStub = sinon.stub(Category, 'getById')
    })

    afterEach(() => {
      sinon.restore()
    })

    it('should return the category when found', async () => {
      const category = { id: 1, name: 'Category 1' }
      getByIdStub.resolves(category)

      await categoryController.getCategoryById(req, res)

      expect(res.json.calledOnce).to.be.true
      expect(res.json.calledWith({ success: true, data: category })).to.be.true
    })

    it('should return 404 when category is not found', async () => {
      getByIdStub.resolves(null)

      await categoryController.getCategoryById(req, res)

      expect(res.status.calledOnceWith(404)).to.be.true
      expect(res.status().json.calledOnceWith({ success: false, message: 'Categoría no encontrada', code: 404 })).to.be.true
    })

    it('should return 500 when an error occurs', async () => {
      const error = new Error('Database error')
      getByIdStub.rejects(error)

      await categoryController.getCategoryById(req, res)

      expect(res.status.calledOnceWith(500)).to.be.true
      expect(res.status().json.calledOnceWith({ success: false, message: 'Error al obtener la categoría', error })).to.be.true
    })
  })
})
