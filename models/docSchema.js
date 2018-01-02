///Reference for schema model
// var Patient = require("../models/patSchema.js");
module.exports = function(sequelize, DataTypes) {
    var Doctor = sequelize.define("Doctor", {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        doc_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        doc_uid: {
            type: DataTypes.STRING,
        }
    });

    Doctor.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Doctor.hasMany(models.Patient, {
            onDelete: "cascade"
        });
    };

    return Doctor;
};
