const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const chats = sequelize.define('chats', {
        privateKey: {
            type: DataTypes.STRING(10000),
            allowNull: true
        },
        publicKey: {
            type: DataTypes.STRING(10000),
            allowNull: true
        }
    },
     {
        paranoid: true,
        deletedAt: 'TimeDelete'
    })
    return chats
}