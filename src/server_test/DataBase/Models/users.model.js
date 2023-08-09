const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(42),
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatar: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        file: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Users;
};