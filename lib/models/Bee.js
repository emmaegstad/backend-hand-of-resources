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

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            bees
            `
    );

    return rows.map((row) => new Bee(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            bees
          WHERE
            id=$1
          `,
      [id]
    );
    return new Bee(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingBee = await Bee.findById(id);
    const updatedAttributes = { ...existingBee, ...attributes };
    const { species, size } = updatedAttributes;
    const { rows } = await pool.query(
      `
          UPDATE
            bees
          SET
            species=$1,
            size=$2
          WHERE
            id=$3
          RETURNING
            *
          `,
      [species, size, id]
    );
    return new Bee(rows[0]);
  }
};
