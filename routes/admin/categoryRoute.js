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
import { validateCategory } from "../../validators/validators.js";
import isAdmin from "../../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getAllCategories);

router
  .get("/create", (req, res) => {
    res.status(200).render("admin/categoryForm");
  })
  .post("/create", upload.single("image"), validateCategory, createCategory);

router.get("/:slug", categoryDetails);

router
  .get("/:slug/update", categoriesUpdateGet)
  .post("/:slug/update", upload.single("image"), categoryUpdate);

router.post("/:slug/delete", isAdmin, categoryDelete);

export default router;
