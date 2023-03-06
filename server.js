const app = require("./app");
const mongoose = require("mongoose");
const { PORT } = require("dotenv").config().parsed;

const URI =
  "mongodb+srv://Zulu_tester:Propro72@cluster0.ymhvp2c.mongodb.net/db-contacts?retryWrites=true&w=majority";

async function start() {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

  db.once("open", () => {
    console.log("Database connection successful");
  });

  app.listen(PORT, (err) => {
    if (err) {
      console.log("Error at server launch: ", err);
    }
    console.log("Server running successfull. Use our API on port: ", PORT);
  });
}

start().catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});
