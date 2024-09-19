import express from "express";
import path from "path";
import url from "url";
import session from "express-session";
import models from "./db/query.js";
import passport from "./config/passport.js";

const { User, Product } = models;

import AuthRouter from "./routes/authRoute.js";
import AdminRouter from "./routes/adminRoute.js";
import getUser from "./middleware/getUser.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.session());

app.use(getUser);

app.get("/", async (req, res) => {
  const products = await Product.findAll({ limit: 6 });
  if (!products.length) {
    return res.status(200).render("index", { message: "no products yet" });
  }
  console.log(products);
  res.status(200).render("index", { message: "" });
});

app.use("/admin", AuthRouter);

app.use("/admin", AdminRouter);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
