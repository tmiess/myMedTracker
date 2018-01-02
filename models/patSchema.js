///Reference for schema model
module.exports = function(sequelize, DataTypes) {
    var Patient = sequelize.define("Patient", {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pat_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bday: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        visit_reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pat_uid: {
            type: DataTypes.STRING,
        }
    });

    Patient.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Patient.belongsTo(models.Doctor, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Patient;
};
