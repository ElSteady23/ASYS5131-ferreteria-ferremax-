const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const express = require('express')
const request = require('supertest')

describe('Product Routes', () => {
  let app
  let createProductStub

  beforeEach(() => {
    createProductStub = sinon.stub()
    const productController = {
      createProduct: createProductStub
    }

    const productRoutes = proxyquire('../../src/routes/productRoutes', {
      '../controllers/productController': productController
    })

    app = express()
    app.use(express.json())
    app.use('/products', productRoutes)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should create a new product and return 201 status', async () => {
    createProductStub.resolves({ id: 1, name: 'New Product', price: 100 })

    const res = await request(app)
      .post('/products')
      .send({ name: 'New Product', price: 100 })

    expect(res.status).to.equal(201)
    expect(res.body).to.deep.equal({ id: 1, name: 'New Product', price: 100 })
  })

  it('should return 500 status when there is an error during product creation', async () => {
    createProductStub.rejects(new Error('Create Error'))

    const res = await request(app)
      .post('/products')
      .send({ name: 'New Product', price: 100 })

    expect(res.status).to.equal(500)
    expect(res.body).to.deep.equal({ error: 'Error al crear el producto' })
  })

  it('should return 400 status when required fields are missing', async () => {
    const res = await request(app)
      .post('/products')
      .send({ price: 100 })

    expect(res.status).to.equal(400)
    expect(res.body).to.deep.equal({ error: 'Nombre del producto es requerido' })
  })

  it('should return 400 status when price is not a number', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'New Product', price: 'invalid' })

    expect(res.status).to.equal(400)
    expect(res.body).to.deep.equal({ error: 'El precio debe ser un número' })
  })
})
