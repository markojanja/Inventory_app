import express from "express";
import {
  getAllCategories,
  categoryDetails,
} from "../../controllers/publicCategory.js";

const router = express.Router();

router.get("/", getAllCategories);

router.get("/:slug", categoryDetails);

export default router;
