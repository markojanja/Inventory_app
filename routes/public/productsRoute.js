import express from "express";
import {
  productDetails,
  getAllProducts,
} from "../../controllers/publicProduct.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:slug", productDetails);

export default router;
