const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a dog', async () => {
    const expected = {
      name: 'Remi',
      age: 9,
      color: 'Brown and Tan',
    };
    const res = await request(app).post('/api/v1/dogs').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of dogs', async () => {
    const expected = await Dog.findAll();
    const res = await request(app).get('/api/v1/dogs');

    expect(res.body).toEqual(expected);
  });

  it('gets a dog by id', async () => {
    const expected = await Dog.findById(1);
    const res = await request(app).get(`/api/v1/dogs/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });
});
