const { expect } = require('chai')
const sinon = require('sinon')
const db = require('../../src/db')
const Product = require('../../src/models/productModel')

describe('Product Model', () => {
  describe('getAll', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should return all products', async () => {
      const products = [
        { id: 1, name: 'Product 1', description: 'Description 1', divisa_id: 1, price: 10.99, precio_en_dolares: 10.99, divisa_valor: 1.00, stock: 10 },
        { id: 2, name: 'Product 2', description: 'Description 2', divisa_id: 2, price: 20.99, precio_en_dolares: 10.495, divisa_valor: 2.00, stock: 5 },
      ]
      sinon.stub(db, 'execute').resolves([products])

      const result = await Product.getAll()

      expect(result).to.deep.equal(products)
    })

    it('should limit the number of products returned', async () => {
      const products = [
        { id: 1, name: 'Product 1', description: 'Description 1', divisa_id: 1, price: 10.99, precio_en_dolares: 10.99, divisa_valor: 1.00, stock: 10 },
      ]
      sinon.stub(db, 'execute').resolves([products])

      const result = await Product.getAll(1, 0)

      expect(result).to.deep.equal(products)
      expect(db.execute.calledWith(sinon.match.string, [1, 0])).to.be.true
    })

    it('should handle offset for pagination', async () => {
      const products = [
        { id: 3, name: 'Product 3', description: 'Description 3', divisa_id: 3, price: 30.99, precio_en_dolares: 10.33, divisa_valor: 3.00, stock: 20 },
      ]
      sinon.stub(db, 'execute').resolves([products])

      const result = await Product.getAll(1, 2)

      expect(result).to.deep.equal(products)
      expect(db.execute.calledWith(sinon.match.string, [1, 2])).to.be.true
    })

    it('should throw an error if database query fails', async () => {
      const error = new Error('Database error')
      sinon.stub(db, 'execute').rejects(error)

      try {
        await Product.getAll()
        expect.fail('Expected an error to be thrown')
      } catch (err) {
        expect(err).to.equal(error)
      }
    })
  })
})
