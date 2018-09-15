// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our Vendor model
module.exports = function(sequelize, DataTypes) {
  var Vendor = sequelize.define("Vendor", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our Vendor model. This will check if an unhashed password entered by the vendor can be compared to the hashed password stored in our database
  Vendor.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the Vendor Model lifecycle
  // In this case, before a Vendor is created, we will automatically hash their password
  Vendor.hook("beforeCreate", function(vendor) {
    vendor.password = bcrypt.hashSync(vendor.password, bcrypt.genSaltSync(10), null);
  });
  return Vendor;
};