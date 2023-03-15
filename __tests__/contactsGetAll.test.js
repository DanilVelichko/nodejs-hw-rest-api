const request = require('supertest');
const app = require('../app');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEwNDFhNzA2ZTc0NDY1Y2YwNDA2NTciLCJpYXQiOjE2Nzg5MDE4NTUsImV4cCI6MTY3ODkwNTQ1NX0.SIYTNHjnxmyZZurQs6q-XkyWrbQInimvzVqcBiCqTEs";

describe('get all contacts', () => {
     beforeAll(async () => {
    await app.listen(3004); // Start the server before running the test
  });

  afterAll(async () => {
    await app.close(); // Close the server after running the test
  });
  test('should return all contacts', async () => {
    const response = await request(app)
      .get('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
  
  }, 30000);
});