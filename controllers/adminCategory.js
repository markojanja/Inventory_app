import models from "../db/query.js";

const { Category } = models;

export const createCategory = async (req, res) => {
  const { title, slug } = req.body;
  const id = req.user.id;
  const imgUrl = req.file ? `/uploads/${req.file.filename}` : "";

  const data = {
    title,
    slug,
    imgurl: imgUrl,
    user_id: id,
  };

  await Category.create(data);

  res.status(201).redirect("/admin/dashboard/category");
};

export const categoryDetails = async (req, res) => {
  const { slug } = req.params;

  try {
    const category = await Category.findSlug(slug);
    const products = await Category.findProductsBySlug(slug);
    // console.log("here are products....", products);
    res.status(200).render("admin/categoryDetails", { category, products });
  } catch (error) {
    console.log(error);
  }
};

export const categoriesUpdateGet = async (req, res) => {
  const category = await Category.findSlug(req.params.slug);
  res.status(200).render("admin/categoryUpdateForm", { category });
};

export const categoryUpdate = async (req, res) => {
  const { title, slug, currentImage } = req.body;
  const imgUrl = req.file ? `/uploads/${req.file.filename}` : currentImage;
  const oldSlug = req.params.slug;
  const { id } = req.user;
  try {
    await Category.updateCategory(
      title,
      slug.toLowerCase().trim(),
      imgUrl,
      id,
      oldSlug
    );
    res.status(201).redirect("/admin/dashboard/category");
  } catch (error) {
    console.log(error);
  }
};

export const categoryDelete = async (req, res) => {
  const { slug } = req.params;

  try {
    await Category.deleteCategory(slug);
    console.log("deleted project");

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};
