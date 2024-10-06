import express from "express";
import path from "path";
import url from "url";
import session from "express-session";
import passport from "./config/passport.js";

//routes
import HomeRoute from "./routes/HomeRoute.js";
import AboutRoute from "./routes/aboutRoute.js";
import AuthRouter from "./routes/authRoute.js";
import AdminRouter from "./routes/adminRoute.js";
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
app.use("/admin", AuthRouter);
app.use("/admin/dashboard", AdminRouter);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
