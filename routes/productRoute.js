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

router
  .get("/:slug/update", async (req, res) => {
    const { slug } = req.params;
    const product = await Product.findBySlug(slug);
    const categories = await Category.findAll({});

    res.render("admin/productUpdateForm", { product, categories });
  })
  .post("/:slug/update", upload.single("image"), async (req, res) => {
    const { title, description, slug, stock, price, currentImage, categories } =
      req.body;
    const imgUrl = req.file ? `/uploads/${req.file.filename}` : currentImage;
    const oldSlug = req.params.slug;
    try {
      const newProduct = await Product.update(
        title,
        description,
        slug,
        stock,
        price,
        imgUrl,
        oldSlug
      );

      await Product.deleteProductCategories(newProduct.id);

      if (categories) {
        const catArr = [...categories];
        for (const cat of catArr) {
          await Product.addProductCat(parseInt(newProduct.id), parseInt(cat));
        }
      }

      res.redirect("/admin/dashboard/product/" + slug);
    } catch (error) {
      console.log(error);
    }
  });

router.get("/:id/delete", (req, res) => {
  res.send("delete product form");
});

export default router;
