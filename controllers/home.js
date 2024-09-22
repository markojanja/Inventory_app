import models from "../db/query.js";

const home = async (req, res) => {
  try {
    const products = await models.Product.findAll({ limit: 4 });
    console.log(products.length);

    res.status(200).render("index", { products });
  } catch (error) {
    console.log(error);
  }
};

export default home;
