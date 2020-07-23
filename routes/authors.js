const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

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
    res.redirect(`authors/${newAuthor.id}`);
  } catch {
    res.render("authors/new.ejs", {
      author: author,
      errorMsg: "Error creating Author",
    });
  }
});

// Get author by ID

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render("authors/show", {
      author: author,
      booksByAuthor: books,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch (error) {
    console.log(error);
    res.redirect("authors");
  }
});

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch (error) {
    console.log(error);
    if (author == null) {
      res.redirect(`/`);
    } else {
      res.render("authors/edit", {
        author: author,
        errorMsg: `Error Updating Author`,
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect("/authors");
  } catch (error) {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;
