const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { checkNotAuthenticated } = require("../loginLogic/auth");
const flash = require("express-flash");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(flash());

router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("users/register");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("users/login");
});
router.post("/register", (req, res) => {
  // const { username } = req.body;
  try {
    // User.register(
    //   new User(username, req.body.password, (error) => {
    //     if (error) return console.log(error);
    //   })
    // );


    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("users/register");
      }
      passport.authenticate("local")(req, res, function(){
          res.redirect("/");
      });
  });
  } catch (e) {
    console.log(e);
  }
});

// module.exports = router;
// module.exports = checkAuthenticated;

module.exports = router;
