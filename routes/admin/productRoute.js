import express from "express";
import { upload } from "../../config/multerConfig.js";
import {
  productCreateGet,
  productCreatePost,
  productDeletePost,
  productDetails,
  productHomeGet,
  productUpdateGet,
  productUpdatePost,
} from "../../controllers/adminProduct.js";
import models from "../../db/query.js";

const { Product } = models;

const router = express.Router();

router.get("/", productHomeGet);

router
  .get("/create", productCreateGet)
  .post("/create", upload.single("image"), productCreatePost);

router.get("/low-stock", async (req, res) => {
  try {
    const products = await Product.selectWhere("<=", 7, ">");
    console.log(products);

    res.render("admin/productDash", { products });
  } catch (error) {
    console.log(error);
  }
});
router.get("/high-stock", async (req, res) => {
  try {
    const products = await Product.selectWhere(">", 20);
    console.log(products);

    res.render("admin/productDash", { products });
  } catch (error) {
    console.log(error);
  }
});
router.get("/out-of-stock", async (req, res) => {
  try {
    const products = await Product.selectWhere("=", 0);
    console.log(products);

    res.render("admin/productDash", { products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:slug", productDetails);

router
  .get("/:slug/update", productUpdateGet)
  .post("/:slug/update", upload.single("image"), productUpdatePost);

router.post("/:slug/delete", productDeletePost);

export default router;
