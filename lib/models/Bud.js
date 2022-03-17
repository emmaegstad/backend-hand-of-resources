const pool = require('../utils/pool');

module.exports = class Bud {
  id;
  name;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
  }

  static async insert({ name, age }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            buds (name, age)
        VALUES
            ($1, $2)
        RETURNING
            *
        `,
      [name, age]
    );
    return new Bud(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            buds
            `
    );

    return rows.map((row) => new Bud(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            buds
          WHERE
            id=$1
          `,
      [id]
    );
    return new Bud(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingBud = await Bud.findById(id);
    const updatedAttributes = { ...existingBud, ...attributes };
    const { name, age } = updatedAttributes;
    const { rows } = await pool.query(
      `
          UPDATE
            buds
          SET
            name=$1,
            age=$2
          WHERE
            id=$3
          RETURNING
            *
          `,
      [name, age, id]
    );
    return new Bud(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            buds
          WHERE
            id=$1
          RETURNING
            *
          `,
      [id]
    );

    return new Bud(rows[0]);
  }
};
