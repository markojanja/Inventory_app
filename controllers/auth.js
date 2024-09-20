import passport from "../config/passport.js";

export const login = passport.authenticate("local", {
  successRedirect: "/admin/dashboard",
  failureRedirect: "/admin/login",
});

// Logout route
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.redirect("/admin/login");
  });
};
