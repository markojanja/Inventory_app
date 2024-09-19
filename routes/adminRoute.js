import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", isAuth, (req, res) => {
  res.render("dashboard");
});

export default router;
