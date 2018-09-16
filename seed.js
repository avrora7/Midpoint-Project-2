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
                status: true,
                LanguageId: languages[0].get("id"),
                VendorId: vendors[0].get("id"),
              },
              {
                title: "Consecutive interpreter/ economic forum/ 27-28 September/ Vienna, Austria",
                status: true,
                LanguageId: languages[1].get("id"),
                VendorId: vendors[1].get("id"),
              },
              {
                title: "1650 words/financial/ 30 September",
                status: false,
                LanguageId: languages[2].get("id"),
                VendorId: vendors[2].get("id"),
                UserId: users[2].get("id")
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