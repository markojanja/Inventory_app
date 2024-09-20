import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("product page");
});

router.get("/create", (req, res) => {
  res.send("create product form");
});
router.get("/:id", (req, res) => {
  res.send("product details page");
});

router.get("/:id/update", (req, res) => {
  res.send("update product form");
});
router.get("/:id/delete", (req, res) => {
  res.send("delete product form");
});

export default router;
