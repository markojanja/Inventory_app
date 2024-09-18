import express from "express";
import path from "path";
import url from "url";
import models from "./db/query.js";

const { User } = models;

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const users = await User.findAll();
  console.log(users);
  res.status(200).render("index");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
