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

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            dogs
          WHERE
            id=$1
          `,
      [id]
    );
    return new Dog(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingDog = await Dog.findById(id);
    const updatedAttributes = { ...existingDog, ...attributes };
    const { name, age, color } = updatedAttributes;
    const { rows } = await pool.query(
      `
          UPDATE
            dogs
          SET
            name=$1,
            age=$2,
            color=$3
          WHERE
            id=$4
          RETURNING
            *
          `,
      [name, age, color, id]
    );
    return new Dog(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            dogs
          WHERE
            id=$1
          RETURNING
            *
          `,
      [id]
    );

    return new Dog(rows[0]);
  }
};
