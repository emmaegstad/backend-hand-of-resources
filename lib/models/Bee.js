const pool = require('../utils/pool');

module.exports = class Bee {
  id;
  species;
  size;

  constructor(row) {
    this.id = row.id;
    this.species = row.species;
    this.size = row.size;
  }

  static async insert({ species, size }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            bees (species, size)
        VALUES
            ($1, $2)
        RETURNING
            *
        `,
      [species, size]
    );

    return new Bee(rows[0]);
  }
};
