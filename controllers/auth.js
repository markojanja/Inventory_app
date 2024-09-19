import passport from "../config/passport.js";

export const login = passport.authenticate("local", {
  successRedirect: "/admin/dashboard",
  failureRedirect: "/admin/login",
});

// Logout route
export const logout = (req, res) => {
  req.logout();
  req.session.destroy(); // Ensure the session is destroyed
  res.redirect("/login");
};
