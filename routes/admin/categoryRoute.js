import express from "express";
import { upload } from "../../config/multerConfig.js";
import {
  categoriesUpdateGet,
  categoryDelete,
  categoryDetails,
  categoryUpdate,
  createCategory,
  getAllCategories,
} from "../../controllers/adminCategory.js";

const router = express.Router();

router.get("/", getAllCategories);

router
  .get("/create", (req, res) => {
    res.status(200).render("admin/categoryForm");
  })
  .post("/create", upload.single("image"), createCategory);

router.get("/:slug", categoryDetails);

router
  .get("/:slug/update", categoriesUpdateGet)
  .post("/:slug/update", upload.single("image"), categoryUpdate);

router.post("/:slug/delete", categoryDelete);

export default router;
