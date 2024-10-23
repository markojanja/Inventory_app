import passport from "../config/passport.js";
import bcrypt from "bcrypt";
import models from "../db/query.js";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render("admin/register", {
        errors: errors.array(),
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await models.User.create({
      username: username,
      password: hashedPassword,
    });

    if (!newUser) {
      console.log("not saved");
      return res.render("admin/register");
    }

    res.redirect("/admin/login");
  } catch (error) {
    console.log(error);
  }
};

export const login = passport.authenticate("local", {
  successRedirect: "/admin/dashboard",
  failureRedirect: "/admin/login",
});

// Logout route
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.redirect("/");
  });
};
