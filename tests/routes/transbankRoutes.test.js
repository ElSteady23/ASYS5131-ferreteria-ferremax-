const request = require('supertest');
const app = require('../src/app'); // Importa tu aplicación Express

describe('Transbank Routes', () => {
  describe('POST /transbank/credit', () => {
    it('should create a new transaction', async () => {
      const payload = {
        buyOrder: 'taladros',
        sessionId: 'sessionId',
        amount: 5000,
        returnUrl: 'http://localhost:3000/transbank/endPayment/',
      };

      const response = await request(app)
        .post('/transbank/credit')
        .send(payload)
        .expect(200);

      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('url');
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('GET /transbank/checkPayment', () => {
    it('should check the payment status', async () => {
      const token = 'test-token';

      const response = await request(app)
        .get(`/transbank/checkPayment?token=${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
    });
  });

  describe('GET /transbank/endPayment', () => {
    it('should commit the payment', async () => {
      const tokenWs = 'test-token-ws';

      const response = await request(app)
        .get(`/transbank/endPayment?token_ws=${tokenWs}`)
        .expect(200);

      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('data');
    });
  });
});
