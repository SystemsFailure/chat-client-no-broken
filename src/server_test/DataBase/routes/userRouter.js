const express = require("express");
const userController = require('../controllers/userController')
const userRouter = express.Router();
const multer = require('multer')
const db = require('../index')
const users = db.users
const { body } = require('express-validator');

const global_files_path = '/home/leonhard/Desktop/pictures/uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, global_files_path)
    },
    filename: function (req, file, cb) {
        const {originalname} = file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, originalname + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


const valid = [
    body('email')
    .isEmail(),
    body('password')
    .isLength({min: 5})
]

userRouter.get('/getUsers', userController.getUsers)
userRouter.post(
        '/register/addUser',
        body('data[0].email').isEmail(),
        body('data[0].password').isLength({min: 5}),
        body('data[0].email').custom(async(value) => {
            await users.findOne({
                where: {
                    email: value
                }
            }).then(user => {
                if(user)
                throw new Error('E-mail already in use')
                return Promise.reject('E-mail already in use')
            }).catch(err => {
                console.log(err)
            })
        }),
        body('data[0].passwordConfirmation').custom( async (value, {req}) => {
            if(value !== req.body.data[0].password) throw new Error('Password confirmation does not match password')
        }),
        userController.addUser
      )

userRouter.post(
    '/login',
    ...valid,
    userController.loginUser
)



userRouter.get('/getUser:id', userController.getByPkUser)
userRouter.post('/checking_name', userController.byName)
userRouter.get('/updateUser:id', userController.updateUser)
userRouter.post('/register/validData/checkEmail', userController.checkEmail)

// Fake requests
userRouter.post('/register/validData/FakeSendFile', upload.single('photo'), userController.FakeSendFile)
userRouter.get('/register/validData/callBackAvatar:id', userController.callBackAvatar)




module.exports = userRouter