import express from "express";
import path from "path";
import url from "url";
import session from "express-session";
import passport from "./config/passport.js";

//public routes
import HomeRoute from "./routes/public/homeRoute.js";
import AboutRoute from "./routes/public/aboutRoute.js";
import ProductRoute from "./routes/public/productsRoute.js";
import CategoriesRoute from "./routes/public/categoriesRoute.js";
//private routes
import AuthRouter from "./routes/admin/authRoute.js";
import AdminRouter from "./routes//admin/adminRoute.js";

//custom middleware
import setHeaders from "./middleware/setHeaders.js";
import getUser from "./middleware/getUser.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(setHeaders);

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

app.use("/", HomeRoute);
app.use("/about", AboutRoute);
app.use("/products", ProductRoute);
app.use("/categories", CategoriesRoute);
app.use("/admin", AuthRouter);
app.use("/admin/dashboard", AdminRouter);
app.all("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
