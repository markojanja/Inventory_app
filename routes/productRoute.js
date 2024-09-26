import express from "express";
import { upload } from "../config/multerConfig.js";
import models from "../db/query.js";

const { Product, Category } = models;

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.findAll({});
  // console.log(products);
  res.render("admin/productDash", { products });
});

router
  .get("/create", async (req, res) => {
    const categories = await Category.findAll({});
    res.status(200).render("admin/productForm", { categories });
  })
  .post("/create", upload.single("image"), async (req, res) => {
    const { title, description, slug, stock, price, categories } = req.body;
    const id = req.user.id;
    const imageurl = `/uploads/${req.file?.filename}`;

    // console.log(req.body);

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
      const catArr = [...categories];
      // console.log(catArr);
      if (Array.isArray(catArr)) {
        for (const categoryId of catArr) {
          await Product.addProductCat(newProduct.id, categoryId);
        }
      }
    } catch (error) {
      console.log(error);
    }

    res.redirect("/admin/dashboard/product");
  });

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findBySlug(slug);

    res.status(200).render("admin/productDetails", { product });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:slug/update", async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findBySlug(slug);

  const categories = await Category.findAll({});

  const matchingCategoryTitles = categories
    .filter((category) =>
      product.categories.some((cat) => cat.slug === category.slug)
    )
    .map((category) => category.title);

  console.log(matchingCategoryTitles);

  res.render("admin/productUpdateForm");
});
router.get("/:id/delete", (req, res) => {
  res.send("delete product form");
});

export default router;
