var path = require("path");
var passport = require("../config/passport");

// Requiring custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.redirect("/index");
  });

  app.get("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  var db = require("../models");

  app.get("/vendor", isAuthenticated, function (req, res) {
    if (req.user.role != db.User.ROLE_VENDOR) {
      res.redirect("/");
      return;
    }

    db.Job.findAll({
      order: [["id", "desc"]],
      where: {
        vendorId: req.user.id
      },
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

        var hbsObject = {
          jobs: dbJobs,
          languages: dbLanguages
        };
        res.render("vendor", hbsObject);
      })
    });
  });

  app.get("/translator", isAuthenticated, function (req, res) {
    if (req.user.role != db.User.ROLE_TRANSLATOR) {
      res.redirect("/");
      return;
    }
    db.Job.findAll({
      order: ["id"],
      where: {
        $or: [
          {
            userId:
            {
              $eq: req.user.id
            }
          },
          {
            userId:
            {
              $eq: null
            }
          }
        ]
      },
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
          as: "Vendor"
        }
      ]
    }).then(function (dbJobs) {
      var hbsObject = {
        jobs: dbJobs
      };
      res.render("translator", hbsObject);
    });
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
