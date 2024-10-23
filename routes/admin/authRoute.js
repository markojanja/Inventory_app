import express from "express";
import { login, logout, register } from "../../controllers/auth.js";
import { redirectIfAuthenticated } from "../../middleware/authMiddleware.js";
import { validateRegister, validateLogin } from "../../validators/validators.js";

const router = express.Router();

router
  .get("/register", (req, res) => {
    res.status(200).render("admin/register");
  })
  .post("/register", validateRegister, register);

router
  .get("/login", redirectIfAuthenticated, (req, res) => {
    res.status(200).render("admin/login");
  })
  .post("/login", validateLogin, login);

router.get("/logout", logout);

export default router;
