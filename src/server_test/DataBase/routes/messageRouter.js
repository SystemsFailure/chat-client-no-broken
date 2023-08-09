const express = require("express");
const messageController = require('../controllers/messagesController')
const messageRouter = express.Router();

messageRouter.get('/chat/getMessages:id', messageController.getMessages_for_this_chat)
messageRouter.post('/chat/createMessage:id', messageController.create_message)
messageRouter.delete('/chat/hard_delete', messageController.hard_delete_message)    
messageRouter.delete('/chat/soft_delete', messageController.soft_delete_message)
messageRouter.post('/chat/restore_messages', messageController.restore_messages)
messageRouter.get('/chat/get_all_TemporarilyRemoved_messages', messageController.get_all_TemporarilyRemoved_messages)
messageRouter.get('/chat/getSpecialSoftDeletedMesssagesById:id', messageController.getSpecialSoftDeletedMesssagesById)
messageRouter.post('/chat/IcreateMessageAndChatIfHisNotExist:id', messageController.IcreateMessageAndChat)
messageRouter.get('/chat/IgetMessagesFromChat:id', messageController.IgetMessagesFromChat)








module.exports = messageRouter