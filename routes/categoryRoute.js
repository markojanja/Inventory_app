import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("category page");
});

router.get("/create", (req, res) => {
  res.send("create category form");
});

router.get("/:id", (req, res) => {
  res.send("category details page");
});

router.get("/:id/update", (req, res) => {
  res.send("update category form");
});
router.get("/:id/delete", (req, res) => {
  res.send("delete category form");
});

export default router;
