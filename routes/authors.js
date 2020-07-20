const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//All authors route
router.get("/", async (req, res) => {
  var opt = {};
  if (req.query.name !== null && req.query.name !== "") {
    opt.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(opt);
    res.render("authors/index.ejs", {
      authors: authors,
      opt: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

//New author route

router.get("/new", (req, res) => {
  res.render("authors/new.ejs", { author: new Author() });
});

//Create author route

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch {
    res.render("authors/new.ejs", {
      author: author,
      errorMsg: "Error creating Author",
    });
  }
});

module.exports = router;
