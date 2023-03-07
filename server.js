const app = require("./app");
const mongoose = require("mongoose");
const { PORT, MONGODB_URI, DATABASE } = require("dotenv").config().parsed;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI).then(() => {
      console.log(
        "Database " + DATABASE + " in MongoDB connected successfully"
      );
    });

    app.listen(PORT, () => {
      console.log(
        "Local server running successfully. Use our API: http://localhost: on port: ",
        PORT
      );
    });
  } catch (err) {
    console.log("Error starting server: ", err);
    process.exit(1);
  }
}

start();
