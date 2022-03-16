const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bud = require('../lib/models/Bud');

describe('bud routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a bud', async () => {
    const expected = {
      name: 'Zac',
      age: 27,
    };
    const res = await request(app).post('/api/v1/buds').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of buds', async () => {
    const expected = await Bud.findAll();
    const res = await request(app).get('/api/v1/buds');

    expect(res.body).toEqual(expected);
  });
});
