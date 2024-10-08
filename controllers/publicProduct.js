import models from "../db/query.js";

const { Product } = models;

export const getAllProducts = async (req, res) => {
  const products = await Product.findAll({});

  res.render("public/products", { products });
};

export const productDetails = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findBySlug(slug);

    res.status(200).render("public/productDetails", { product });
  } catch (error) {
    console.log(error);
  }
};
