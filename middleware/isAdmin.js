const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin === false) {
    const status = 403;
    const message = "Forbidden";
    return res.status(status).render("error", { title: "Error", status, message });
  }
  next();
};

export default isAdmin;
