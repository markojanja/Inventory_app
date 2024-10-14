import models from "../db/query.js";

const { User, Product, Category } = models;

export const dashboardGet = async (req, res) => {
  const users = await User.count();
  const products = await Product.count();
  const categories = await Category.count();
  const lowStock = await Product.countWhere("<=", 5);
  const highStock = await Product.countWhere(">", 20);
  const outOfStock = await Product.countWhere("=", 7);
  const latestProducts = await Product.findAll({ limit: 6 });
  const latestCategories = await Category.findAll({ limit: 6 });

  res.render("admin/dashboard", {
    users,
    products,
    categories,
    lowStock,
    highStock,
    outOfStock,
    latestProducts,
    latestCategories,
  });
};
