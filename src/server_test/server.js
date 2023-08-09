const express = require('express')
// const redis = require('redis');
// const connectRedis = require('connect-redis');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken');


// imports Routes
const userRouter = require('./DataBase/routes/userRouter.js')
const messageRouter = require("./DataBase/routes/messageRouter.js")
const db = require('./DataBase/index.js')
const { chats } = require('./DataBase/index.js')

// config server
const app = express()
const port = 3000

// models from db
const users = db.users
const messages = db.messages


// const RedisStore = connectRedis(session)
// const redisClient = redis.createClient({
//     host: 'localhost',
//     port: 6379,
//     // ttl: 260
// })



// redisClient.on('error', (err) => {
//     console.log(err)
// })

// redisClient.on('connect', (err) => {
//     console.log('successful connected by redisStore')
// })

// redisClient.connect().then(res => {
//     console.log('success connect to client')
// })

// use middleWare
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use('/home/leonhard/Desktop/pictures/uploads', express.static('./home/leonhard/Desktop/pictures/uploads'))
// app.use(session({
//     secret: 'hotel42',
//     name: 'test',
//     // resave: false,
//     saveUninitialized: true,
//     store: new RedisStore({client: redisClient}),
//     cookie: {
//         secure: false, //Если true, то передача cookie только через https протокол
//         httpOnly: false, // Если true, то запретить использование cookie на клиенте
//         maxAge: 1000*60*10 // Время жизни сеанса в миллисекундах
//     }
// }))
app.use(cookieParser())

// use routers
app.use('/users', userRouter)
app.use('/messages', messageRouter)

// hasMany связь таблиц
users.hasMany(messages, {foreignKey: 'toId'})
users.hasMany(messages, {foreignKey: 'fromId'})
chats.hasMany(messages, {
    foreignKey: 'chatId', 
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
})


// sync sequalize
db.sequelize.sync().then(() => {
    console.log('successful')
}).catch(err => {
    console.log(err)
})

// listen server
app.listen(port, () => {
        console.log(`test app listening on port ${port}`)
})



