import express from "express";
import { login, logout } from "../controllers/auth.js";
import { redirectIfAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .get("/login", redirectIfAuthenticated, (req, res) => {
    res.status(200).render("login");
  })
  .post("/login", login);

router.get("/logout", logout);

export default router;
