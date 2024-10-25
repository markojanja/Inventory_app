import models from "../db/query.js";

const home = async (req, res, next) => {
  try {
    const products = await models.Product.findAll({ limit: 4 });
    const categories = await models.Category.findAll({ limit: 4 });

    res.status(200).render("public/index", { title: "Home", products, categories });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default home;
