import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(isAuth);

router.get("/", (req, res) => {
  res.render("dashboard");
});

router.get("/create_category", (req, res) => {
  res.send("create category form");
});

export default router;
