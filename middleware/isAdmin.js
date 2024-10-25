const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin === false) {
    const statusCode = 403;
    const message = "Forbidden";
    return res.status(statusCode).render("error", { title: "Error", statusCode, message });
  }
  next();
};

export default isAdmin;
