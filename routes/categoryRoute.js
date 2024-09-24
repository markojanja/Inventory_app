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
    res.status(200).render("categoryDetails", { category, products });
  } catch (error) {
    console.log(error);
  }
});

router
  .get("/:slug/update", async (req, res) => {
    const category = await Category.findSlug(req.params.slug);

    res.status(200).render("categoryUpdateForm", { category });
  })
  .post("/:slug/update", upload.single("image"), async (req, res) => {
    const { title, slug, currentImage } = req.body;
    const imgUrl = req.file ? `/uploads/${req.file.filename}` : currentImage;
    const oldSlug = req.params.slug;
    const { id } = req.user;

    try {
      await Category.updateCategory(
        title,
        slug.toLowerCase().trim(),
        imgUrl,
        id,
        oldSlug
      );
      res.status(201).redirect("/admin/dashboard/category");
    } catch (error) {
      console.log(error);
    }
  });
router.get("/:id/delete", (req, res) => {
  res.send("delete category form");
});

export default router;
