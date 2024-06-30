describe('ProductModel.delete', () => {
  it('should throw an error if id is not an integer', async () => {
    await expect(ProductModel.delete('abc')).rejects.toThrow('Invalid id: must be an integer')
  })

  it('should return 0 if no product is found with the given id', async () => {
    db.execute.mockResolvedValue([{ affectedRows: 0 }])
    const result = await ProductModel.delete(999)
    expect(result).toBe(0)
  })

  it('should delete the product and return the number of affected rows', async () => {
    db.execute.mockResolvedValue([{ affectedRows: 1 }])
    const result = await ProductModel.delete(1)
    expect(result).toBe(1)
  })

  it('should log an error and rethrow it if an exception occurs', async () => {
    const error = new Error('Database error')
    db.execute.mockRejectedValue(error)
    console.error = jest.fn()
    await expect(ProductModel.delete(1)).rejects.toThrow('Database error')
    expect(console.error).toHaveBeenCalledWith('Error deleting product with id 1: Database error')
  })
})
