import express from "express";
import { isAuth } from "../../middleware/authMiddleware.js";
import productRouter from "./productRoute.js";
import categoryRouter from "./categoryRoute.js";
import models from "../../db/query.js";

const { User, Product, Category } = models;

const router = express.Router();

router.use(isAuth);

router.get("/", async (req, res) => {
  const users = await User.count();
  const products = await Product.count();
  const categories = await Category.count();

  console.log(products);

  res.render("admin/dashboard", { users, products, categories });
});

router.use("/product", productRouter);
router.use("/category", categoryRouter);

export default router;
