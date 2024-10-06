import express from "express";
import { productHomeGet } from "../../controllers/adminProduct.js";

const router = express.Router();

router.get("/", productHomeGet);

export default router;
