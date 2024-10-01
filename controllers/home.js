import models from "../db/query.js";

const home = async (req, res) => {
  try {
    const products = await models.Product.findAll({ limit: 4 });
    const categories = await models.Category.findAll({ limit: 4 });

    res.status(200).render("public/index", { products, categories });
  } catch (error) {
    console.log(error);
  }
};

export default home;
