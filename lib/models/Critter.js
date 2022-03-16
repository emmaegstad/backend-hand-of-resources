const pool = require('../utils/pool');

module.exports = class Critter {
  id;
  name;
  habitat;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.habitat = row.habitat;
  }

  static async insert({ name, habitat }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            critters (name, habitat)
        VALUES
            ($1, $2)
        RETURNING
            *
        `,
      [name, habitat]
    );

    return new Critter(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            critters
            `
    );

    return rows.map((row) => new Critter(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            critters
          WHERE
            id=$1
          `,
      [id]
    );
    return new Critter(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingCritter = await Critter.findById(id);
    const updatedAttributes = { ...existingCritter, ...attributes };
    const { name, habitat } = updatedAttributes;
    const { rows } = await pool.query(
      `
          UPDATE
            critters
          SET
            name=$1,
            habitat=$2
          WHERE
            id=$3
          RETURNING
            *
          `,
      [name, habitat, id]
    );
    return new Critter(rows[0]);
  }
};
