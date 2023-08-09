// const {checkEmail} = require("./userController");
const key_secret = 'dde2213qdq3d2s4r3543seda3e24!'
const db = require('../index')
const users = db.users

const {validationResult } = require('express-validator');
const createError = require('http-errors')
const { Op } = require("sequelize");
const crypto = require('crypto-js')

const addDefaultImageToAvatar = async() => {

}

//FakeViews
exports.FakeSendFile = async(req, res, next) => {
    const user_avatar = req.file
    const path_file = user_avatar.path
    const user_id = req.body.user_id
    await users.findOne({
        where: {
            id: user_id
        }
    }).then(user => {
        if(!user) return createError(404, 'Такого поьзователя нету!')
        user.update({
            file: path_file
        }).then(result => {
            res.redirect(`callBackAvatar${user_id}`)
            console.log(result.file)
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.callBackAvatar = async(req, res) => {
    const user_id = req.params.id
    const file_path = req.params.file
    await users.findOne({
        where: {
            id: user_id
        }
    }).then(user => {
        if(user) {
            if(user?.file != null)
            {
                // Здесь файл отправляется в облако фотографий
                res.status(200).send({result: user?.file})
            } else {
                users.findOne({
                    where: {
                        id: user_id,
                        file: {[Op.not]: null}
                    }
                }).then(user => {
                    if(user?.file != null) {
                        res.send({result: false, message: '2 попытка поиска файла не увенчалась успехом!'})
                    } else {
                        res.send({result: 'Почему то файл не найден'})
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        } else {
            res.send({result: 'такого пользователя нету!'})
        }
    }).catch(err => {
        console.log(err)
    })
}

// Good
exports.addUser = async function(req, res, next){
    await users.findOne({
        where: {
            email: req.body.data[0].email
        }
    }).then((user) => {
        if(user) {
            return next(createError(401, 'Такой E-mail уже существует'))
            // res.send({'result' : false, 'message_helper': 'so email is exit'})
        } else {
            const error_hand = validationResult(req)
            if(!error_hand.isEmpty()) return res.status(400).send({errors: error_hand.array()})
            users.create({
                name: req.body.data[0].name,
                email:  req.body.data[0].email,
                password: req.body.data[0].password
            }).then(data => {
                res.send({data: data, result: true})
            }).catch(err => {
                return createError(400, err)
            })
        }
    }).catch(error => {
        return createError(400, error)
    })
}


exports.loginUser = async(req, res, next) => {
    // let AccessSession = true
    const email = req.body.email
    const password = req.body.password
    const error_hand = validationResult(req)
    if(!error_hand.isEmpty()) return res.status(400).send({errors: error_hand.array()})
    await users.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(user => {
        if(user) {
            try {
                res.send({
                        result: true,
                        message: 'user auth',
                        // session: req.session.email
                    })
            } catch(err) {
                return createError(500, err)
            }
            // res.status(200).send({result: true, 'message': 'пользователь залогинин'})
        } else {
            res.send({result: false, message: 'Такого пользователя нет'})
        }
    }).catch(err => {
        return createError(500, err)
    })
        // req.session.user = user !== null ? {email: user.email, password: user.password} : false
    // res.send({
    //         result: true,
    //         "cont-E-mail": email,
    //         "cont-password": password,
    //         "cont-session": AccessSession ? req.session : false
    //     })
}


exports.getUsers = (req, res) => {
    users.findAll().then(data => {
        res.send(data)
    })
}
exports.getByPkUser = (req, res) => {
    const id = req.params.id
    users.findByPk(id).then(data => {
        if(data) {
            res.send(data)
        } else {
            res.status(404).send({'message-error' : `Cannot find Tutorial with id=${id}.`})
        }
    })
}
exports.byName = (req, res) => {
    res.send({result: true})
}

exports.updateUser = (req, res) => {
    const id = req.params.id
    users.update({name: 'Zero'}, {
        where: {id: id}
    }).then(data => {
        res.send(data)
    })
}

exports.checkEmail = (req, res) => {
    if(!req.body) return res.send({result: false, message: 'body is empty'})
    const email = req.body.email
    users.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if(user) {
            res.status(200).send({result: true})
        } else {
            res.send({result: false})
        }
    }).catch(error => {
        return createError(400, error)
    })
}