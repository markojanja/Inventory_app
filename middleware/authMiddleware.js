const isAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/admin/login");
};

// middleware/authCheck.js
const redirectIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/admin/dashboard"); // Redirect to homepage or dashboard if user is authenticated
  }
  next();
};

export { isAuth, redirectIfAuthenticated };
