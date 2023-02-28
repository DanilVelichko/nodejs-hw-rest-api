const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts"); // import router

const app = express(); // create server

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // set format logger

app.use(logger(formatsLogger)); // use logger
app.use(cors());
app.use(express.json()); 

app.use("/api/contacts", contactsRouter); // use router

app.use((req, res) => {
  res.status(404).json({ message: "Error 404" }); // return 404 error if route not found
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message }); // return server error
});

module.exports = app;
