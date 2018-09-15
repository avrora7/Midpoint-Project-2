var db = require("./models");
db.sequelize.sync({ force: true }).then(function() {
  var Language = db.sequelize.models.Language
  Language.count().then(function(ct) {
    if (ct == 0) {
      var languages = [
        {name:"English"},
        {name:"German"},
        {name:"French"}
      ];
      Language.bulkCreate(languages).then(function(ret) {
        console.log(ret);
      })
    }
  })
});