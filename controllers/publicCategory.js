import models from "../db/query.js";

const { Category } = models;

export const getAllCategories = async (req, res) => {
  const categories = await Category.findAll({});

  res.render("public/categories", { categories });
};

export const categoryDetails = async (req, res) => {
  const { slug } = req.params;

  try {
    const category = await Category.findSlug(slug);
    const products = await Category.findProductsBySlug(slug);

    res.status(200).render("public/categoryDetails", { category, products });
  } catch (error) {
    console.log(error);
  }
};