const createError = require("http-errors");

function errorHandler(err, req, res, next) {
  if (err instanceof createError.NotFound) {
    // Handle 404 Not Found error
    res.status(404).json({ message: "Not Found" });
  } else {
    // For other types of errors, set the error status and send the error message
    res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = errorHandler;
