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

const router = express.Router();

router.get("/", productHomeGet);

router
  .get("/create", productCreateGet)
  .post("/create", upload.single("image"), productCreatePost);

router.get("/:slug", productDetails);

router
  .get("/:slug/update", productUpdateGet)
  .post("/:slug/update", upload.single("image"), productUpdatePost);

router.post("/:slug/delete", productDeletePost);

export default router;
