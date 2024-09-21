import express from "express";
import { upload } from "../config/multerConfig.js";
import models from "../db/query.js";

const { Product, Category } = models;

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.findAll();
  console.log(products);
  res.render("productDash", { products });
});

router
  .get("/create", async (req, res) => {
    const categories = await Category.findAll({});
    res.status(200).render("productForm", { categories });
  })
  .post("/create", upload.single("image"), async (req, res) => {
    const { title, description, slug, stock, price, categories } = req.body;
    const id = req.user.id;
    const imageurl = `/uploads/${req.file?.filename}`;

    const productData = {
      title,
      description,
      slug,
      stock: parseInt(stock),
      price: parseFloat(price),
      imageurl,
      user_id: id,
    };

    try {
      const newProduct = await Product.create(productData);

      if (Array.isArray(categories)) {
        for (const categoryId of categories) {
          await Product.addProductCat(newProduct.id, categoryId);
        }
      }
    } catch (error) {
      console.log(error);
    }

    res.redirect("create");
  });

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findBySlug(slug);

    res.status(200).render("productDetails", { product });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/update", (req, res) => {
  res.send("update product form");
});
router.get("/:id/delete", (req, res) => {
  res.send("delete product form");
});

export default router;
