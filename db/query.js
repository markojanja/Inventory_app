import pool from "./pool.js";

class User {
  async create(username, password) {
    try {
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, password]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const { rows } = await pool.query("SELECT id, username, admin FROM users;");

    return rows;
  }
}

const models = {
  User: new User(),
};

export default models;
