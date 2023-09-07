const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", authController.isLoggedIn,(req, res) => {
  res.render("index",{
    user:req.user
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

//middleware to protect profile page

router.get("/profile", authController.isLoggedIn, (req, res) => {
  //console.log(req.message);  message is logged in and we can create many functions
 //database 
  if (req.user) {
    res.render("profile",{user:req.user});
  } else {
    res.redirect("/login");
  }


});

module.exports = router;
