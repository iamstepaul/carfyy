// Registration Routes
const express = require("express");
const router = express.Router();
const User = require("../models/register");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// @hapijs/joi schema validation
const userSchema = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  newEmail: Joi.string().email().required(),
  newPhone: Joi.string().required(),
  psw: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  cpsw: Joi.string(),
});

router
  .route("/register")
  .get((req, res) => {
    res.render("pages/register");
  })
  .post(async (req, res, next) => {
    try {
      // @hapijs/joi validating inputs
      const result = await userSchema.validateAsync(req.body);
    //   if (result.error) {
    //     console.log("error validating user");
    //   }

      // @hapijs/joi validating useremail
      const userEmail = await User.findOne({ email: result.email });
      if (userEmail) {
        console.log("email already exist in our database");
        return res.redirect("/register");
      }

      // @hapijs/joi validating username
      const newPhone = await User.findOne({ userName: result.newPhone });
      if (newPhone) {
        console.log("Phone number already exist in our database");
        return res.redirect("/register");
      }
      // @hapijs/joi validating userNumber
      const userNumber = await User.findOne({ phoneNumber: result.phoneNumber });
      if (userNumber) {
        console.log("phone Number already exist in our database");
        // req.flash("error", "phoneNumber already in use");
        return res.redirect("/register");
      }
      // password validation
      if (result.psw !== result.cpsw) {
        console.log("password not match");
        return res.redirect("/register");
      }
      // creating a new user
      const newUser = new User(result);

      // hashing the password
      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log("hashing failed");
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              console.log("newUser has been saved successfully", user);
              return res.redirect("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    } catch (error) {
      next(error);
    }
  });

// login  GET route
router.get("/login", (req, res) => {
  if (res.locals.user) {
    res.redirect("/");
  }
  res.render("pages/login");
});

// login POST route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true,
  })(req, res, next);
});

module.exports = router;