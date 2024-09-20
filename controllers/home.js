const home = (req, res) => {
  res.status(200).render("index", { message: "" });
};

export default home;
