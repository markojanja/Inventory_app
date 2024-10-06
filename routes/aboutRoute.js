import express from "express";
import { aboutGet } from "../controllers/about.js";

const router = express.Router();

router.get("/", aboutGet);

export default router;
