const pool = require('../utils/pool');

module.exports = class Dog {
  id;
  name;
  age;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.color = row.color;
  }

  static async insert({ name, age, color }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            dogs (name, age, color)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, age, color]
    );

    return new Dog(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            dogs
            `
    );

    return rows.map((row) => new Dog(row));
  }
};