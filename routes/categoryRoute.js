import express from "express";
import { upload } from "../config/multerConfig.js";
import models from "../db/query.js";
import { createCategory } from "../controllers/category.js";

const { Category } = models;

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.findAll({});
  res.render("categoryDash", { categories });
});

router
  .get("/create", (req, res) => {
    res.status(200).render("categoryForm");
  })
  .post("/create", upload.single("image"), createCategory);

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  console.log(req.user.id);
  try {
    const category = await Category.findSlug(slug);
    const products = await Category.findProductsBySlug(slug);
    console.log("here are products....", products);
    console.log(category);
    res.status(200).render("categoryDetails", { category, products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/update", (req, res) => {
  res.send("update category form");
});
router.get("/:id/delete", (req, res) => {
  res.send("delete category form");
});

export default router;
