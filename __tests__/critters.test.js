const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Critter = require('../lib/models/Critter');

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

  it('gets a list of critters', async () => {
    const expected = await Critter.findAll();
    const res = await request(app).get('/api/v1/critters');

    expect(res.body).toEqual(expected);
  });

  it('gets a critter by id', async () => {
    const expected = await Critter.findById(1);
    const res = await request(app).get(`/api/v1/critters/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates a critter by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Squirrel',
      habitat: 'Under the Sea',
    };
    const res = await request(app)
      .patch('/api/v1/critters/1')
      .send({ habitat: 'Under the Sea' });

    expect(res.body).toEqual(expected);
  });
});
