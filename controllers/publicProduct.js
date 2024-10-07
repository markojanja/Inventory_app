import models from "../db/query.js";

const { Product, Category } = models;

export const getAllProducts = async (req, res) => {
  const products = await Product.findAll({});
  if (!req.user) {
    return res.render("public/products", { products });
  }
  res.render("admin/productDash", { products });
};

export const productDetails = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findBySlug(slug);
    if (!req.user) {
      return res.status(200).render("public/productDetails", { product });
    }
    res.status(200).render("admin/productDetails", { product });
  } catch (error) {
    console.log(error);
  }
};
