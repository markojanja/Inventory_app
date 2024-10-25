import models from "../db/query.js";
import { validationResult } from "express-validator";

const { Category } = models;

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({});

    res.render("admin/categoryDash", { categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  const { title, slug } = req.body;
  const id = req.user.id;
  const imgUrl = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render("admin/categoryForm", { errors: errors.array(), title, slug });
    }

    const data = {
      title,
      slug,
      imgurl: imgUrl,
      user_id: id,
    };

    await Category.create(data);

    res.status(201).redirect("/admin/dashboard/category");
  } catch (error) {
    next(error);
  }
};

export const categoryDetails = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const category = await Category.findSlug(slug);
    const products = await Category.findProductsBySlug(slug);

    res.status(200).render("admin/categoryDetails", { category, products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const categoriesUpdateGet = async (req, res, next) => {
  try {
    const category = await Category.findSlug(req.params.slug);
    res.status(200).render("admin/categoryUpdateForm", { category });
  } catch (error) {
    next(error);
  }
};

export const categoryUpdate = async (req, res, next) => {
  const { title, slug, currentImage } = req.body;
  const imgUrl = req.file ? `/uploads/${req.file.filename}` : currentImage;
  const oldSlug = req.params.slug;
  const { id } = req.user;
  try {
    await Category.updateCategory(title, slug.toLowerCase().trim(), imgUrl, id, oldSlug);
    res.status(201).redirect("/admin/dashboard/category");
  } catch (error) {
    next(error);
  }
};

export const categoryDelete = async (req, res, next) => {
  const { slug } = req.params;

  try {
    await Category.deleteCategory(slug);
    console.log("deleted project");

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
