import models from "../db/query.js";

const { Category } = models;

export const createCategory = async (req, res) => {
  const { title, slug } = req.body;
  const id = req.user.id;
  const imgUrl = `/uploads/${req.file.filename}`;

  const data = {
    title,
    slug,
    imgurl: imgUrl,
    user_id: id,
  };

  await Category.create(data);

  res.status(201).redirect("/admin/dashboard/category");
};
