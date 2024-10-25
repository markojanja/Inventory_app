import models from "../db/query.js";

export const usersGet = async (req, res, next) => {
  try {
    const users = await models.User.findAll({});
    res.status(200).render("admin/users", { title: "users", users });
  } catch (error) {
    next(error);
  }
};
