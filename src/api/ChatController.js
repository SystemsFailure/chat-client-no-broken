import { db } from "@/main"
import { collection, addDoc, increment} from "firebase/firestore";
import { where, query, getDocs, doc, updateDoc} from "firebase/firestore"

const ChatApi = {
    createChat: async (data) => {
        let chat = await ChatApi.getChatForCheckedOnExists({toID: data.toID, fromID: data.fromID})
        if(chat === false) {
            console.log('warning, so chat already exits, check function - createChat - > getChat() ')
            return false
        }
        await addDoc(collection(db, "ChatId"), {
            fromID: data.fromID,
            toID: data.toID,
            lastMessage: 'You not comunicated with it',
            countOfMessages: 0,
            togetherId: data.fromID + '-' + data.toID,
            atCreated: new Date().toLocaleString(),
            atUpdated: new Date().toLocaleString(),
        }).then( (chatInstance) => {
            console.log(chatInstance.id)
        }).catch(err => {
            console.log(err)
        })
    },

    getChatForCheckedOnExists: async (data_) => {
        let chat_lst = []
        const queryRequest = query( 
            collection(db, "ChatId"), 
            where("togetherId", 'in', [`${data_.fromID}-${data_.toID}`, `${data_.toID}-${data_.fromID}`])
        )
        let array = await getDocs(queryRequest)
        array.forEach(doc => {
            if(!doc) { console.log('not 00001'); return }
            let data_chat = {
                id: doc.id,
                toId: doc.data().toID,
                fromId: doc.data().fromID,
                atCreated: doc.data().atCreated,
                atUpdated: doc.data().atUpdated,
                lastMessage: doc.data().lastMessage,
                countOfMessages: doc.data().countOfMessages,
                togetherId: doc.data().togetherId,
            }
            chat_lst.push(data_chat)
        });
        if (chat_lst.length != 0)
        {
            if(chat_lst[0] === undefined)
            {
                console.log(chat_lst[0], chat_lst[1], 'ooo true')
                return chat_lst
            } else {
                console.log(chat_lst[1], 'nooo false')
                return false
            }
        }
    },

    getChat: async (data_) => {
        let chat_lst = []
        const queryRequest = query( 
            collection(db, "ChatId"), 
            where("togetherId", 'in', [`${data_.fromID}-${data_.toID}`, `${data_.toID}-${data_.fromID}`])
        )
        let array = await getDocs(queryRequest)
        array.forEach(doc => {
            if(!doc) { console.log('not 00001'); return }
            let data_chat = {
                id: doc.id,
                toId: doc.data().toID,
                fromId: doc.data().fromID,
                atCreated: doc.data().atCreated,
                atUpdated: doc.data().atUpdated,
                lastMessage: doc.data().lastMessage,
                countOfMessages: doc.data().countOfMessages,
                togetherId: doc.data().togetherId,
            }
            chat_lst.push(data_chat)
        });
        if (chat_lst.length != 0)
        {
            if(chat_lst.length === 1)
            {
                return chat_lst
            } else {
                return false
            }
        }
    },

    getChatById: async () => {

    },

    updataField: async (chatId) => {
        const docRef = doc(db, 'ChatId', chatId);

        const count = await updateDoc(docRef, {
            countOfMessages: increment(1)
        })
        return count
    },

    decrimentField: async (chatId) => {
        const docRef = doc(db, 'ChatId', chatId);

        const count = await updateDoc(docRef, {
            countOfMessages: increment(-1)
        })
        return count
    }
}

export { ChatApi }