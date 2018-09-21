var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport to use a Local Strategy - login with a username/email and password
passport.use(new LocalStrategy(
  // User will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {

    console.log("before finding user")

    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      
      // If there's no user with the given email
      if (!dbUser) {

        console.log("didn't find user by email")

        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {

        console.log("invalid password")

        return done(null, false, {
          message: "Incorrect password."
        });
      }

      console.log("found user by email")
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
