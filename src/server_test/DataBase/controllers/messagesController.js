const db = require('../index')
const messages = db.messages
const users = db.users
const { Op } = require("sequelize");
const createError = require('http-errors')
const CryptoJS = require('crypto-js')
const crypto = require('crypto')
const fs = require('fs');
const { chats } = require('../index');

const generateKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: ''
        }
        
    })
    return {
            privateKey: privateKey,
            publicKey: publicKey
        }
    // fs.writeFileSync("public_key", publicKey);
    // fs.writeFileSync("private_key", privateKey);
}

// function encryptString (plaintext, publicKeyFile) {
//     const publicKey = fs.readFileSync(publicKeyFile, "utf8");
  
//     // publicEncrypt() method with its parameters
//     const encrypted = crypto.publicEncrypt(
//         publicKey, Buffer.from(plaintext));
  
//     return encrypted.toString("base64");
// }

// function decryptString (ciphertext, privateKeyFile) {
//     const privateKey = fs.readFileSync(privateKeyFile, "utf8");
  
//     // privateDecrypt() method with its parameters
//     const decrypted = crypto.privateDecrypt(
//       {
//         key: privateKey,
//         passphrase: '',
//       },
//       Buffer.from(ciphertext, "base64")
//     );
  
//     return decrypted.toString("utf8");
// }

exports.getMessages_for_this_chat = (req, res) => {
    //Get user (to_id) and get user (from_id)
    const toID = req.params.id
    const fromID = req.body.id
    if(fromID === toID) 
    {
        console.log('fromID and toID is equals')
        res.send({'message': 'fromID and toID is equals'})
    } else {
        messages.findAll({
            where: {
                toId: {
                    [Op.or]: [toID, fromID]
                },
                fromId: {
                    [Op.or]: [toID, fromID]
                },
    
    
                // $or: [
                //     {
                //         [Op.and]: [
                //             {
                //                 toId: {$eq: toID},
                //                 fromId: {$eq: fromID}
                //             }
                //         ]
                //     },
                //     {
                //         [Op.and]: [
                //             {
                //                 toId: {$eq: fromID},
                //                 fromId: {$eq: toID}
                //             }
                //         ]
                //     }
                // ]
    
    
                // $or: [
                //     {toId: toID, fromId: fromID},
                //     {toId: fromID, fromId: toID}
                // ]
            },
            order: [["createdAt", "ASC"]],
            // paranoid: false
        }).then((awesomeMessagesList) => {
            let data = []
            if(!awesomeMessagesList) {
                console.log('chat is empty')
                res.send({'message': 'chat is empty'})
            } else {
                for (let index = 0; index < awesomeMessagesList.length; index++) {
                    const element = awesomeMessagesList[index]
                    const decodeAwesomeMessage = decryptString(element.content, "private_key")
                    data.push(decodeAwesomeMessage)
                }
                res.status(200).send({data: data})
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

exports.create_message = async (req, res) => {
    const toId = req.params.id
    const fromId = req.body.id
    const chat_id = toId + fromId
    const content = req.body.content
    const sizeOfContent = new Blob([content]).size
    if(toId === fromId)
    {
        console.log('You not can to send message yourself')
        res.send({'message': 'You not can to send message yourself'})
        return null
    } else {
        const encrypted = encryptString(content, "./public_key");
        console.log(typeof encryptedMessage)
        await messages.create(
            {
                content: encrypted,
                size: sizeOfContent,
                toId: toId,
                fromId: fromId,
            }
        ).then(message => {
            console.log(typeof message.content)
            if(!message) return
            res.status(200).send({message: message})
        }).catch(err => {
            console.log(err)
            res.send({error: err})
        })
    }
}

const get_mess_id = async (id) => {
    await messages.findByPk(id).then(user => {
        if(user) return user
    }).catch(err => {
        console.log(err)
    })
}

exports.update_content_message = async (req, res) => {
    const message = get_mess_id(req.body.id)
}


exports.hard_delete_message = async (req, res, next) => {
    if(!req.body.array_id) return next(createError(401, 'Please login to view this page.'))
    const deleted_messages = []
    const array_id = req.body.array_id
    for (let index = 0; index < array_id.length; index++) {
        const element = array_id[index]
        await messages.destroy({
            where: {
                id: element
            },
            force: true,
        }).then(message => {
            deleted_messages.push(message)
        }).catch(err => {
            res.send({'result': false, 'error_': err})
        })

    }
    res.status(200).send({'result': true, 'list_deleted_messages': deleted_messages})
}

const TimeoutDeleteMessages = async(array) => {
    if(array.length === 0) return
    const deleted_messages = []
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        await messages.destroy({
            where: {
                id: element
            },
            force: true,
        }).then(message => {
            deleted_messages.push(message)
        }).catch(err => {
            console.log(err)
        })
    }
    console.log('delete messages')
}


exports.soft_delete_message = async (req, res, next) => {
    let time_del = 4.32e+8
    if(!req.body.array_id) return next(createError(401, 'Вы не передали body.array_id'))
    const soft_deleted_messages = []
    const array_id = req.body.array_id

    for (let index = 0; index < array_id.length; index++) {
        const element = array_id[index];
        await messages.destroy({
            where: {
                id: element
            }
        }).then(result => {
            soft_deleted_messages.push(result)
            if(result === 0){
                res.send({'result': false, 'message': 'сообщения под таким id не существует'})
                return
            }
        }).catch(err => {
            console.log(err)
            res.send({'result': false, 'error': err})
        })
    }
    let uid_proccess = setTimeout(TimeoutDeleteMessages, time_del, array_id)
    res.status(200).send({'result': true, 'list_deleted_messages': soft_deleted_messages, 'time': `${uid_proccess}: через ${time_del} ms`})
}

exports.restore_messages = async (req, res, next) => {
    if(!req.body.data) return next(createError(401, 'Вы не передали данные в body'))
    const toID = req.body.data[0].to_id
    const fromID = req.body.data[0].from_id
    await messages.restore({
        where: {
            toId: {
                [Op.or]: [toID, fromID]
            },
            fromId: {
                [Op.or]: [toID, fromID]
            }
        }
    }).then(result => {
        res.status(200).send({'result': true, 'message': result})
    }).catch(err => {
        console.log(err)
        res.send({'result': false, 'error': err})
    })
}

exports.get_all_TemporarilyRemoved_messages = async (req, res) => {
    await messages.findAll({
        where: {
            TimeDelete: {[Op.not]: null}
        },
        order: [["createdAt", "ASC"]],
        paranoid: false
    }).then(messages => {
        if(messages.length === 0) {
            res.send({'result': false, 'message': 'Сообщений с таким id нету'})
        } else {
            res.send({'result': true, 'list' : messages})
        }
    }).catch(err => {
        res.status(404).send({'result': false, 'err': err})
    })
}


exports.getSpecialSoftDeletedMesssagesById = async (req, res) => {
    const toID = req.params.id
    const fromID = req.body.from_id
    const all_mess = []
    await messages.findAll({
        where: {
            TimeDelete: {[Op.not]: null},
            toId: {
                [Op.or]: [toID, fromID]
            },
            fromId: {
                [Op.or]: [toID, fromID]
            },
        },
        order: [["createdAt", "ASC"]],
        paranoid: false
    }).then(messages => {
        if(messages.length === 0)
            {
            res.send({'result': false, 'message': 'Таких сообщений не обнаруженно'})
            return
            } else {
                all_mess.push(messages)
                res.status(200).send({'result': true, 'data': all_mess})
            }
    }).catch(err => {
        res.send({"err": createError(401, err), 'message_err-r': err})
    })
}


const getPrivateKey = (privateKeyFile) => {
    const privateKey = fs.readFileSync(privateKeyFile, "utf8");
    return privateKey
}

const getPublicKey = (publicKeyFile) => {
    const publicKey = fs.readFileSync(publicKeyFile, "utf8");
    return publicKey
}

function IencryptString (plaintext, publicKey) {
    const encrypted = crypto.publicEncrypt(
        publicKey, Buffer.from(plaintext));
    return encrypted.toString("base64");
}

function IdecryptString (ciphertext, privateKey) {
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        passphrase: '',
      },
      Buffer.from(ciphertext, "base64")
    );
    return decrypted.toString("utf8");
}





exports.IcreateMessageAndChat = async (req, res) => {
    const fromId = req.body.id
    const toId = req.params.id
    const chat_id = Number(toId) + Number(fromId)
    const content = req.body.content
    const sizeOfContent = new Blob([content]).size
    const {privateKey, publicKey} = generateKeys()
    await chats.findOne({
        where: {
            id: chat_id
        }
    }).then(chat => {
        if(!chat) {
            chats.create({
                id: chat_id,
                privateKey: privateKey,
                publicKey: publicKey
            }).then(chat => {
                // const retBytesData = (content) => {
                //     const xS_bytesArray = []
                //     if(Buffer.byteLength(content, 'utf8') > 250) {
                        
                //     } else {
                //         xS_bytesArray.push()
                //     }
                // }
                const encryptMessage = IencryptString(content, publicKey)
                messages.create({
                    content: encryptMessage,
                    size: sizeOfContent,
                    toId: toId,
                    fromId: fromId,
                    chatId: chat.id
                }).then(message => {
                    res.status(200).send({result: true, message: message})
                }).catch(err => {
                    res.status(500).send({err: err})
                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            try {
                // var words = CryptoJS.enc.Base64.parse("SGVsbG8sIFdvcmxkIQ==");
                // var base64 = CryptoJS.enc.Base64.stringify(words);

                // console.log(Buffer.byteLength(content, 'utf8'))
                // console.log(base64)
                // console.log(words)
                // console.log(Buffer.byteLength(content, 'utf8'))
                // var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
                // var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
                // var encrypted = CryptoJS.AES.encrypt(content, key, { iv: iv });
                // var encrypted = CryptoJS.AES.encrypt(content, 'key');
                // var decripted = CryptoJS.AES.decrypt(encrypted, 'key')
                // var key = '11A1764225B11AA1'; 

                // console.log('key length:', key.length );
                // var content_ = CryptoJS.enc.Utf8.parse(content); 
                // key = CryptoJS.enc.Utf8.parse(key); 
                // var encrypted = CryptoJS.AES.encrypt(content_, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }); 
                // encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
                // console.log('encrypted', encrypted);
                // var decrypted =  CryptoJS.AES.decrypt({ciphertext: CryptoJS.enc.Hex.parse(encrypted)}, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }); 
                // console.log('decrypted', decrypted.toString(CryptoJS.enc.Utf8)); 


                // let public_key = chat.publicKey
                // const encryptMessage = IencryptString(content, public_key)
                // const promise = chat.createMessage({
                //     content: encryptMessage,
                //     size: sizeOfContent,
                //     toId: toId,
                //     fromId: fromId,
                // })
                // promise.then((onFulfilled) => {
                //     if(onFulfilled) console.log('success')
                // }).catch(onRejected => {
                //     console.log(onRejected)
                // })
                try {
                    res.send({result: true})
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }).catch(err => {
        console.log(err)
    })

}

exports.IgetMessagesFromChat = async(req, res) => {
    const fromId = req.body.id
    const toId = req.params.id
    const chat_id = Number(toId) + Number(fromId)
    const chat = await chats.findOne({ where: {id: chat_id}, include: messages })
    if(!chat) res.status(404).send({result: false, message: 'chat with so id not exist'})
    if(chat) {
        let data = []
        let privateKey = chat.privateKey
        const messages = await chat.getMessages()
        for (let index = 0; index < messages.length; index++) {
            const element = messages[index];
            element.content = IdecryptString(element.content, privateKey)
            data.push(element)
        }
        res.status(200).send({result: true, messages: data})
    }

}


exports.IsoftDestroyChat = async(req, res) => {

}

exports.IhardDestroyChat = async(req, res) => {

}

exports.IgetAllChats = async(req, res) => {

}

exports.IgetByIdChat = async(req, res) => {

}

exports.IgetAllByIdSoftDeletedChat = async(req, res) => {

}