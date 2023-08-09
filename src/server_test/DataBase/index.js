const Sequelize = require("sequelize")

const sequelize = new Sequelize('postgres', 'postgres', '31415', {
    host: 'localhost',
    dialect: 'postgres',
    // operatorsAliases: false,
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./Models/users.model.js')(sequelize, Sequelize)
db.messages = require('./Models/Messages.model')(sequelize, Sequelize)
db.chats = require('./Models/chat.model.js')(sequelize, Sequelize)

module.exports = db