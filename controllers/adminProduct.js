import { validationResult } from "express-validator";
import models from "../db/query.js";
import { render } from "ejs";

const { Product, Category } = models;

export const productHomeGet = async (req, res) => {
  const products = await Product.findAll({});

  res.render("admin/productDash", { products });
};

export const productCreateGet = async (req, res) => {
  const categories = await Category.findAll({});
  res.status(200).render("admin/productForm", { categories });
};

export const productCreatePost = async (req, res) => {
  const cats = await Category.findAll({});
  const { title, description, slug, stock, price, categories } = req.body;
  const id = req.user.id;
  const imageurl = `/uploads/${req.file?.filename}`;

  const catArr = typeof categories === "undefined" ? [] : [...req.body.categories];

  const errors = validationResult(req);
  console.log(categories);
  if (!errors.isEmpty()) {
    return res.status(400).render("admin/productForm", {
      categories: cats,
      errors: errors.array(),
      title,
      description,
      slug,
      stock,
      price,
      catArr,
    });
  }

  const productData = {
    title,
    description,
    slug,
    stock: parseInt(stock),
    price: parseFloat(price),
    imageurl,
    user_id: id,
  };

  try {
    const newProduct = await Product.create(productData);
    const catArr = [...categories];

    if (Array.isArray(catArr)) {
      for (const categoryId of catArr) {
        await Product.addProductCat(newProduct.id, categoryId);
      }
    }
  } catch (error) {
    console.log(error);
  }

  res.redirect("/admin/dashboard/product");
};

export const productDetails = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findBySlug(slug);

    res.status(200).render("admin/productDetails", { product });
  } catch (error) {
    console.log(error);
  }
};

export const productUpdateGet = async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findBySlug(slug);
  const categories = await Category.findAll({});

  res.render("admin/productUpdateForm", { product, categories });
};

export const productUpdatePost = async (req, res) => {
  const { title, description, slug, stock, price, currentImage, categories } = req.body;
  const imgUrl = req.file ? `/uploads/${req.file.filename}` : currentImage;
  const oldSlug = req.params.slug;
  try {
    const newProduct = await Product.update(
      title,
      description,
      slug,
      stock,
      price,
      imgUrl,
      oldSlug
    );

    await Product.deleteProductCategories(newProduct.id);

    if (categories) {
      const catArr = [...categories];
      for (const cat of catArr) {
        await Product.addProductCat(parseInt(newProduct.id), parseInt(cat));
      }
    }

    res.redirect("/admin/dashboard/product/" + slug);
  } catch (error) {
    console.log(error);
  }
};

export const productDeletePost = async (req, res) => {
  const { slug } = req.params;
  // console.log(slug); for debuging
  try {
    await Product.deleteProduct(slug);
    res.redirect("/admin/dashboard/product");
  } catch (error) {
    console.log(error);
  }
};

export const lowOnStock = async (req, res) => {
  try {
    const products = await Product.selectWhere("<=", 7, ">");
    // console.log(products); for debuging
    res.render("admin/productDash", { products });
  } catch (error) {
    console.log(error);
  }
};

export const highStock = async (req, res) => {
  try {
    const products = await Product.selectWhere(">", 20);
    console.log(products); // for debuging

    res.render("admin/productDash", { products });
  } catch (error) {
    console.log(error);
  }
};

export const outOfStock = async (req, res) => {
  try {
    const products = await Product.selectWhere("=", 0);
    // console.log(products); for debuging
    res.render("admin/productDash", { products });
  } catch (error) {
    console.log(error);
  }
};
