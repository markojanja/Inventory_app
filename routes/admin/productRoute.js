import express from "express";
import { upload } from "../../config/multerConfig.js";
import {
  highStock,
  lowOnStock,
  outOfStock,
  productCreateGet,
  productCreatePost,
  productDeletePost,
  productDetails,
  productHomeGet,
  productUpdateGet,
  productUpdatePost,
} from "../../controllers/adminProduct.js";
import isAdmin from "../../middleware/isAdmin.js";
import { validateProduct } from "../../validators/validators.js";

const router = express.Router();

router.get("/", productHomeGet);

router
  .get("/create", productCreateGet)
  .post("/create", upload.single("image"), validateProduct, productCreatePost);

router.get("/low-stock", lowOnStock);
router.get("/high-stock", highStock);
router.get("/out-of-stock", outOfStock);

router.get("/:slug", productDetails);

router
  .get("/:slug/update", productUpdateGet)
  .post("/:slug/update", upload.single("image"), productUpdatePost);

router.post("/:slug/delete", isAdmin, productDeletePost);

export default router;
