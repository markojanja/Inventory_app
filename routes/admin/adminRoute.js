import express from "express";
import { isAuth } from "../../middleware/authMiddleware.js";
import productRouter from "./productRoute.js";
import categoryRouter from "./categoryRoute.js";

import { dashboardGet } from "../../controllers/adminDashboard.js";

const router = express.Router();

router.use(isAuth);

router.get("/", dashboardGet);

router.use("/product", productRouter);
router.use("/category", categoryRouter);

export default router;
