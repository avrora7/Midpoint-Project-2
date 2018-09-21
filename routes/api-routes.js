// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log(req) 
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json(req.user.get("role"));
  });

  app.post("/api/signup", function (req, res) {
    console.log(req.body);

    var userData = req.body;
    userData.password = userData.password1

    db.User.create(userData).then(function () {
      //res.redirect(307, "/api/login");
      res.json("ok");
    }).catch(function (err) {
     
      res.status(422).json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.post("/api/jobs", function (req, res) {

    var newJob = req.body;
    newJob.vendorId = req.user.id;
    newJob.status = db.Job.STATUS_OPEN;
    console.log(newJob)
    db.Job.create(newJob).then(function () {
      res.json("OK");
    }).catch(function (err) {
      console.log(err);
      res.status(422).json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.put("/api/jobs", function (req, res) {

    var jobUpdate = req.body;
    console.log("*********************");
    console.log(req.body);
    console.log("*********************");

     db.Job.findById(req.body.id).then(function(job) {
      if (job) {
        var currentStatus = job.status;
        if (req.body.action == "apply" && job.get("status") == db.Job.STATUS_OPEN) {
          console.log("1111")
          job.set("status", db.Job.STATUS_ASSIGNED);
          job.set("userId", req.user.id);
        } else if (jobUpdate.action == "close" && job.get("status") == db.Job.STATUS_ASSIGNED && job.get("userId") == req.user.id) {
          console.log("222")
          job.set("status", db.Job.STATUS_CLOSED);
        }
        else {
          console.log("3333")
          res.status(422).json("Error");
        }
        job.save().then(function(updatedJob) {
          res.json(updatedJob);
        });
      }
    });

    // newJob.vendorId =1;
    // newJob.status = db.Job.STATUS_OPEN;
    // console.log(newJob)
    // db.Job.create(newJob).then(function () {
    // }).catch(function (err) {
    //   console.log(err);
    //   res.json(err);
    //   // res.status(422).json(err.errors[0].message);
    // });
  });

};



