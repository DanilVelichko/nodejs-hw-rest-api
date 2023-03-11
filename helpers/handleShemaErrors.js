const handleSchemaErrors = (err, data, next) => {
  const { name, code } = err;
  if (name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    return next({
      status: 400,
      message: errors.join(", "),
      data: "Bad Request",
    });
  }
  if (code === 11000) {
    return next({
      status: 400,
      message: "Contact with this email/name already exists",
      data: "Bad Request",
    });
  }
  next(err);
};

module.exports = handleSchemaErrors;