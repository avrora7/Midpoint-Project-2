// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.redirect("/index");
    //res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  var db = require("../models");

  app.get("/vendor", function (req, res) {
    db.Job.findAll({
      order: ["id"],
      include: [
        {
          model: db.Language,
          as: 'LanguageTo',
        },
        {
          model: db.Language,
          as: 'LanguageFrom',
        },
        {
          model: db.User,
          as: "User"
        }
      ]
    }
    ).then(function (dbJobs) {
      db.Language.findAll({
        order: ["name"],
      }).then(function (dbLanguages) {
        console.log(dbJobs[0]);

        var hbsObject = {
          jobs: dbJobs,
          languages: dbLanguages
        };
        console.log(hbsObject);
        res.render("vendor", hbsObject);
      })
    });
  });

  app.get("/user", function (req, res) {
    db.Job.findAll({
      order: ["id"],
      include: [
        {
          model: db.Language,
          as: 'LanguageTo',
        },
        {
          model: db.Language,
          as: 'LanguageFrom',
        },
        {
          model: db.Vendor,
          as: "Vendor"
        }
      ]
    }).then(function (dbJobs) {

      console.log(dbJobs[0]);

      var hbsObject = {
        jobs: dbJobs
      };
      console.log(hbsObject);
      res.render("user", hbsObject);
    });
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  // app.get("/login", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
