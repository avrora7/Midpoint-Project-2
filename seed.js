var db = require("./models");

var languages = null;
var users = null;
var vendors = null;

db.sequelize.sync({ force: true }).then(function () {
  var Language = db.sequelize.models.Language
  Language.count().then(function (ct) {
    if (ct == 0) {
      var tmpLanguages = [
        { name: "English" },
        { name: "German" },
        { name: "French" }
      ];
      Language.bulkCreate(tmpLanguages).then(function (dbLanguages) {
        languages = dbLanguages;

        var tmpUsers = [
          {
            fullName: "John English",
            email: "jenglish@email.com",
            password: "jenglish12"
          },
          {
            fullName: "Alice German",
            email: "agerman@email.com",
            password: "agerman34"
          },
          {
            fullName: "Nicole French",
            email: "nfrench@email.com",
            password: "nfrench56"
          },
        ];

        db.User.bulkCreate(tmpUsers).then(function (dbUsers) {
          users = dbUsers;

          var tmpVendors = [
            {
              fullName: "Pear",
              email: "pear@email.com",
              password: "pear12"
            },
            {
              fullName: "ABM",
              email: "abm@email.com",
              password: "abm34"
            },
            {
              fullName: "Conch",
              email: "conch@email.com",
              password: "conch56"
            },
          ];
          db.Vendor.bulkCreate(tmpVendors).then(function (dbVendors) {
            vendors = dbVendors;

            tmpJobs = [
              {
                title: "Simultaneous interpreter/ conference/ 15-18 October/ Amsterdam,Netherlands",
                status: db.Job.STATUS_OPEN,
                languageFromId: languages[0].get("id"),
                languageToId: languages[1].get("id"),
                vendorId: vendors[0].get("id"),
              },
              {
                title: "Consecutive interpreter/ economic forum/ 27-28 September/ Vienna, Austria",
                status: db.Job.STATUS_ASSIGNED,
                languageFromId: languages[1].get("id"),
                languageToId: languages[2].get("id"),
                vendorId: vendors[1].get("id"),
                userId: users[1].get("id")
              },
              {
                title: "1650 words/financial/ 30 September",
                status: db.Job.STATUS_CLOSED,
                languageFromId: languages[2].get("id"),
                languageToId: languages[1].get("id"),
                vendorId: vendors[2].get("id"),
                userId: users[2].get("id")
              },
            ];
            db.Job.bulkCreate(tmpJobs).then(function (dbJobs) {
              console.log(dbJobs)
            });
          });
        });
      });
    }
  });
});