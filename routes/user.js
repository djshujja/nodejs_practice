const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const userSchema = require("../models/user");
const initPassport = require("../loginLogic/passport");
const { checkNotAuthenticated } = require("../loginLogic/auth");
const flash = require("express-flash");

// const flash = require()
router.use(flash());
const user = [];
initPassport(
  passport,
  (email) => {
    return user.find((user) => user.email === email);
  },
  (id) => {
    return user.find((user) => user.id === id);
  }
);

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("users/login");
});

router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("users/register");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/login",
    faliureFlash: true,
  })
);

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (error) {
    res.send(error);
  }
  console.log(user);
});

router.get("/users", (req, res) => {
  res.send(user);
});

// module.exports = router;
// module.exports = checkAuthenticated;

module.exports = router;
