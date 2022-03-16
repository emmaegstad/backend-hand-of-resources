const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Critter = require('../lib/models/Critter');

describe('critter routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a critter', async () => {
    const expected = {
      name: 'Bug',
      habitat: 'Outside',
    };
    const res = await request(app).post('/api/v1/critters').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
