if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const db = mongoose.connection;

const indexRouter = require("./routes/index");

app.set("view-engine", "ejs");

app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout.ejs");
app.use(expressLayouts);
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => console.log("Connected to dabase"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening to port 3000");
});

app.use("/", indexRouter);
