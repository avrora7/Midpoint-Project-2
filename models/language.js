module.exports = function (sequelize, DataTypes) {
    var Language = sequelize.define("Language", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        }
    })
    return Language;
};

