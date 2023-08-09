const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const messages = sequelize.define('messages', {
        content: {
            type: DataTypes.STRING(10000),
            allowNull: true
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        time_read: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
     {
        paranoid: true,
        deletedAt: 'TimeDelete'
    })
    return messages
}