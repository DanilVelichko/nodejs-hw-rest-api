const errorHandler = require("./helpers/errorHandler.js");
const compression = require("compression");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(compression());
 
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use(errorHandler);

module.exports = app;
