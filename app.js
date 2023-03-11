const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const auth = require('./helpers/authToken.js');

const contactsRouter = require("./routes/api/contacts"); 
const userRouter = require("./routes/api/user");

const app = express(); 

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; 

app.use(logger(formatsLogger)); 
app.use(cors());
app.use(express.json()); 
// app.use(auth.authenticateToken);

app.use("/api/contacts", contactsRouter); 
app.use("/api/users", userRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Error 404" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message }); 
});

module.exports = app;
