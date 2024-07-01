describe('getCategoryById', () => {
  it('should return 404 if category is not found', async () => {
    const req = { params: { id: 'nonexistent-id' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    Category.getById = jest.fn().mockResolvedValue(null)

    await categoryController.getCategoryById(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(createErrorResponse('Categoría no encontrada', 404))
  })

  it('should return 500 if there is an error retrieving the category', async () => {
    const req = { params: { id: 'some-id' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const error = new Error('Database error')
    Category.getById = jest.fn().mockRejectedValue(error)
    logError = jest.fn()

    await categoryController.getCategoryById(req, res)

    expect(logError).toHaveBeenCalledWith('Error al obtener la categoría', error)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(createErrorResponse('Error al obtener la categoría'))
  })
})
