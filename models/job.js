module.exports = function (sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: false
    }
  });

  Job.STATUS_OPEN = "open";
  Job.STATUS_ASSIGNED = "assigned";
  Job.STATUS_CLOSED = "closed";


  Job.associate = function (models) {
    Job.belongsTo(models.User, {
      as: "Vendor",
      foreignKey: {
        name:"vendorId",
        allowNull: false
      }
    });
    Job.belongsTo(models.User, {
      as: "User",
      foreignKey: {
        name: "userId",
        allowNull: true
      }
    });
    Job.belongsTo(models.Language, {
      as: "LanguageFrom",
      foreignKey: {
        name: "languageFromId",
        allowNull: false
      }
    }),
    Job.belongsTo(models.Language, {
      as: "LanguageTo",
      foreignKey: {
        name: "languageToId",
        allowNull: false
      }
    });
  };

  return Job;
};

