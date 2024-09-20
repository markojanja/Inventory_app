import express from "express";
import { upload } from "../config/multerConfig.js";
import models from "../db/query.js";
import { createCategory } from "../controllers/category.js";

const { Category } = models;

const router = express.Router();

router.get("/", (req, res) => {
  res.send("category page");
});

router
  .get("/create", (req, res) => {
    res.status(200).render("categoryForm");
  })
  .post("/create", upload.single("image"), createCategory);

router.get("/:id", (req, res) => {
  res.send("category details page");
});

router.get("/:id/update", (req, res) => {
  res.send("update category form");
});
router.get("/:id/delete", (req, res) => {
  res.send("delete category form");
});

export default router;
