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
      const query = `INSERT INTO products (${fields}) VALUES (${placeholders}) RETURNING *`;

      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async findAll({ limit }) {
    try {
      const query = limit
        ? `
      SELECT 
        p.id, 
        p.title, 
        p.description, 
        p.slug,
        p.price, 
        p.imageurl,
        JSON_AGG(
        JSON_BUILD_OBJECT('title', c.title, 'slug', c.slug)) AS categories
      FROM 
        products p
      LEFT JOIN 
        products_category pc ON p.id = pc.product_id
      LEFT JOIN 
        category c ON pc.category_id = c.id
      GROUP BY 
        p.id
      ORDER BY
	    	p.id DESC
      LIMIT $1  ;
    `
        : `
      SELECT 
        p.id, 
        p.title, 
        p.description, 
        p.slug,
        p.price, 
        p.imageurl,
        JSON_AGG(
        JSON_BUILD_OBJECT('title', c.title, 'slug', c.slug)) AS categories
      FROM 
        products p
      LEFT JOIN 
        products_category pc ON p.id = pc.product_id
      LEFT JOIN 
        category c ON pc.category_id = c.id
      GROUP BY 
        p.id
      ORDER BY
	    	p.id DESC;
    `;
      const value = limit ? [limit] : [];
      const { rows } = await pool.query(query, value);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  async findBySlug(slug) {
    try {
      const query = `
      SELECT title, description, slug , stock , price, imageurl FROM products WHERE slug=$1; 
      `;
      const { rows } = await pool.query(query, [slug]);

      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async addProductCat(newProduct_id, categoryId) {
    await pool.query(
      "INSERT INTO products_category (product_id, category_id) VALUES ($1, $2);",
      [newProduct_id, categoryId]
    );
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

      const query = `INSERT INTO category (${fields}) VALUES (${placeholders}) RETURNING *;`;

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
        : "SELECT * FROM category;";
      const values = limit ? [limit] : [];
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  async findSlug(slug, id) {
    try {
      const query = `
      SELECT 
        category.title, 
        category.slug, 
        category.imgurl, 
        users.username AS username 
      FROM 
        category 
      JOIN 
        users ON category.user_id = users.id 
      WHERE 
        category.slug = $1;
    `;
      const { rows } = await pool.query(query, [slug]);
      return rows[0];
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
