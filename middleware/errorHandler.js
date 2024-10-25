const errorHandler = (err, req, res, next) => {
  const title = "error";
  const statusCode = err.status || 500;
  const message = err.message || "Internal server error.";

  res.status(statusCode).render("error", { title, statusCode, message });
};

export default errorHandler;
