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
};
