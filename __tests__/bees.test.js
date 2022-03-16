const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bee = require('../lib/models/Bee');

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a bee', async () => {
    const expected = {
      species: 'Carpenter Bee',
      size: 'Extra Small',
    };
    const res = await request(app).post('/api/v1/bees').send(expected);
  });
});
