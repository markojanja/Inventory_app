import pool from "./pool.js";

class User {
  async create(userData = {}) {
    try {
      const keys = Object.keys(userData);
      const values = Object.values(userData);

      if (keys.length === 0) {
        throw new Error("No data to be inserted");
      }

      const fields = keys.join(", ");
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

      const query = `INSERT INTO users ${fields} VALUES ${placeholders} RETURNING *;`;

      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const { rows } = await pool.query("SELECT id, username, admin FROM users;");

    return rows;
  }

  //refactor find function to be one universal function //:TODO

  async findByName(username) {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE username=$1;`,
        [username]
      );

      return rows[0];
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async findById(id) {
    try {
      const { rows } = await pool.query(
        `SELECT id, username, admin, created_at FROM users WHERE id=$1;`,
        [id]
      );

      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

//products
class Product {
  async create(productdata = {}) {
    try {
      const keys = Object.keys(productdata);
      const values = Object.values(productdata);

      if (keys.length === 0) {
        throw new Error("No data to be inserted");
      }

      const fields = keys.join(", ");
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
      const query = `INSERT INTO users (${fields}) VALUES (${placeholders}) RETURNING *`;

      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async findAll({ limit }) {
    try {
      const query = limit
        ? "SELECT * FROM products LIMIT $1"
        : "SELECT * FROM products";
      const values = limit ? [limit] : [];
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}

//categories

class Category {
  async create(userData = {}) {
    try {
      const keys = Object.keys(userData);
      const values = Object.values(userData);

      if (keys.length === 0) {
        throw new Error("No data to be inserted");
      }

      const fields = keys.join(", ");
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

      const query = `INSERT INTO category ${fields} VALUES ${placeholders} RETURNING *;`;

      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async findAll({ limit }) {
    try {
      const query = limit
        ? "SELECT * FROM category LIMIT $1"
        : "SELECT * FROM category";
      const values = limit ? [limit] : [];
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}

//product categories

const models = {
  User: new User(),
  Product: new Product(),
  Category: new Category(),
};

export default models;
