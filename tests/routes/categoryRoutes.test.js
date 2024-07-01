const { expect } = require('chai')
const sinon = require('sinon')
const categoryController = require('../../src/controllers/categoryController')
const Category = require('../../src/models/Category')
const { createErrorResponse } = require('../../src/utils/errorResponse')
const { logError } = require('../../src/utils/logger')

describe('Category Routes', () => {
  describe('getCategoryById', () => {
    it('should return 404 if category is not found', async () => {
      const req = { params: { id: 'nonexistent-id' } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      sinon.stub(Category, 'getById').resolves(null)

      await categoryController.getCategoryById(req, res)

      expect(res.status.calledWith(404)).to.be.true
      expect(res.json.calledWith(createErrorResponse('Categoría no encontrada', 404))).to.be.true

      Category.getById.restore()
    })

    it('should return 500 if there is an error retrieving the category', async () => {
      const req = { params: { id: 'some-id' } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      const error = new Error('Database error')
      sinon.stub(Category, 'getById').rejects(error)
      sinon.stub(logError)

      await categoryController.getCategoryById(req, res)

      expect(logError.calledWith('Error al obtener la categoría', error)).to.be.true
      expect(res.status.calledWith(500)).to.be.true
      expect(res.json.calledWith(createErrorResponse('Error al obtener la categoría'))).to.be.true

      Category.getById.restore()
      logError.restore()
    })
  })

  describe('createCategory', () => {
    it('should return 201 and the created category', async () => {
      const req = { body: { name: 'New Category' } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      const createdCategory = { id: 'new-id', name: 'New Category' }
      sinon.stub(Category, 'create').resolves(createdCategory)

      await categoryController.createCategory(req, res)

      expect(res.status.calledWith(201)).to.be.true
      expect(res.json.calledWith(createdCategory)).to.be.true

      Category.create.restore()
    })

    it('should return 500 if there is an error creating the category', async () => {
      const req = { body: { name: 'New Category' } }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      const error = new Error('Database error')
      sinon.stub(Category, 'create').rejects(error)
      sinon.stub(logError)

      await categoryController.createCategory(req, res)

      expect(logError.calledWith('Error al crear la categoría', error)).to.be.true
      expect(res.status.calledWith(500)).to.be.true
      expect(res.json.calledWith(createErrorResponse('Error al crear la categoría'))).to.be.true

      Category.create.restore()
      logError.restore()
    })
  })
})
