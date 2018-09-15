module.exports = function (sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // vendor_id: {
    //   type: DataTypes.INT,
    //   allowNull: false,
    // } 
  });


  Job.associate = function (models) {
    Job.belongsTo(models.Vendor, {
      foreignKey: {
        allowNull: false
      }
    });
    Job.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
    Job.belongsTo(models.Language, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Job;
};

