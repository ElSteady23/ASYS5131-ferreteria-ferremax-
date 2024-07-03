const { expect } = require('chai')
const sinon = require('sinon')
const { isValidEmail, isValidPassword } = require('../../src/utils/validatorUtils')

describe('validatorUtils', () => {
  describe('isValidEmail', () => {
    it('should return true for a valid email', () => {
      const validEmail = 'user@example.com'
      expect(isValidEmail(validEmail)).to.be.true
    })

    it('should return false for an invalid email', () => {
      const invalidEmail = 'invalid-email'
      expect(isValidEmail(invalidEmail)).to.be.false
    })

    it('should return false for an empty string', () => {
      expect(isValidEmail('')).to.be.false
    })
  })

  describe('isValidPassword', () => {
    it('should return true for a valid password', () => {
      const validPassword = 'Str0ngP@ssw0rd'
      expect(isValidPassword(validPassword)).to.be.true
    })

    it('should return false for a password without a number', () => {
      const passwordWithoutNumber = 'passwordWithoutNumber'
      expect(isValidPassword(passwordWithoutNumber)).to.be.false
    })

    it('should return false for a password without an uppercase letter', () => {
      const passwordWithoutUppercase = 'password123'
      expect(isValidPassword(passwordWithoutUppercase)).to.be.false
    })

    it('should return false for a password without a lowercase letter', () => {
      const passwordWithoutLowercase = 'PASSWORD123@'
      expect(isValidPassword(passwordWithoutLowercase)).to.be.false
    })

    it('should return false for a password without a special character', () => {
      const passwordWithoutSpecialChar = 'Password123'
      expect(isValidPassword(passwordWithoutSpecialChar)).to.be.false
    })

    it('should return false for a password shorter than 8 characters', () => {
      const shortPassword = 'Pw@123'
      expect(isValidPassword(shortPassword)).to.be.false
    })

    it('should return false for an empty string', () => {
      expect(isValidPassword('')).to.be.false
    })
  })
})
