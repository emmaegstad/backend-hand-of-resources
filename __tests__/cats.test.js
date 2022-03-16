const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a cat', async () => {
    const expected = {
      name: 'Minnie',
      age: 7,
      color: 'Brown Tabby',
    };
    const res = await request(app).post('/api/v1/cats').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of cats', async () => {
    const expected = await Cat.findAll();
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });

  it('gets a cat by id', async () => {
    const expected = await Cat.findById(1);
    const res = await request(app).get(`/api/v1/cats/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates a cat by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Minnie',
      age: 7,
      color: 'rainbow',
    };
    const res = await request(app)
      .patch('/api/v1/cats/1')
      .send({ color: 'rainbow' });

    expect(res.body).toEqual(expected);
  });

  it('deletes a cat by id', async () => {
    const expected = await Cat.findById(1);
    const res = await request(app).delete(`/api/v1/cats/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
