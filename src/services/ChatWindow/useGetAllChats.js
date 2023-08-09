import { UserApi } from "@/api/UserController";
import { MessagesApi } from "@/api/MessagesController";
import { scrollDownChat } from "@/utils/ChatWindow/scrollDownDocument";
import { db } from "@/main";
import { onSnapshot, where, query, collection} from "firebase/firestore";



export default async function useAllChats(userId, messages, lastmessage, user_to_id) {

    await UserApi.getAllChats(userId).then((el) => {
        el.forEach(ele => {
            const requestQuery = query(
                collection(db, "ChatId"),
                where("togetherId", 'in', [`${userId}-${ele.id}`, `${ele.id}-${userId}`]),
            )
            onSnapshot(requestQuery, (snapshot) => {
                snapshot.docChanges().forEach(async (change) => {
                    if (change.type === "added") {
                        console.log("Added: ", change.doc.data());
                    }
                    if (change.type === "modified") {
                        const data_ = { toId: user_to_id, fromId: userId, }
                        const {lastElement, array} = await MessagesApi.getLimitedPage(data_)
                        new Promise((resolve, failure) => {
                            messages = array.reverse();
                            lastmessage = lastElement;
                            resolve('success');
                            failure('failure');
                        }).then(() => {
                            scrollDownChat('block-chat-window-id');
                        })
                    }
                    if (change.type === "removed") {
                        console.log("Removed: ", change.doc.data());
                    }
                });
            })
        })
    }).catch(err => {
        console.log(err);
    })

}