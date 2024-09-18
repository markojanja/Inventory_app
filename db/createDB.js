import pg from "pg";
const { Client } = pg;
import bcrypt from "bcrypt";

const client = new Client({
  connectionString: process.env.DB_URI,
});

//sql query to create user table

const createUserTable = `CREATE TABLE IF NOT EXISTS users (id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR(255), password VARCHAR(255), admin BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

// insert sql query to create product table

const hashedPwd = await bcrypt.hash("*110600*", 10);

const insertUser = `INSERT INTO users (username, password) VALUES ('marko', '${hashedPwd}')`;

const createProductTable = `CREATE TABLE IF NOT EXISTS products (id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR(200) NOT NULL, description TEXT NOT NULL, slug VARCHAR(255) NOT NULL ,stock INT NOT NULL, price DECIMAL(10,2) NOT NULL, imageUrl VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id INT DEFAULT 1 REFERENCES users(id) ON DELETE SET DEFAULT);
`;

//insert query to create category table

const createCategoryTable = `CREATE TABLE IF NOT EXISTS category (id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR(255) UNIQUE NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, imgUrl VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id INT DEFAULT 1 REFERENCES users(id) ON DELETE SET DEFAULT);`;

const createProductCategory = `CREATE TABLE IF NOT EXISTS products_category (id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY , product_id INT REFERENCES products(id) ON DELETE CASCADE, category_id INT REFERENCES category(id) ON DELETE CASCADE);`;

async function main() {
  try {
    console.log("populating db");
    await client.connect();
    await client.query(createUserTable);
    await client.query(insertUser);
    await client.query(createProductTable);
    await client.query(createCategoryTable);
    await client.query(createProductCategory);
    console.log("done populating");
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}

main();
