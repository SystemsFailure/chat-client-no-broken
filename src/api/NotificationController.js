import { getDocs, collection, addDoc } from "firebase/firestore";
import { orderBy, where, query, doc, deleteDoc} from "firebase/firestore"
import { db } from "@/main";
const NotifyApi = {
    sendNotify: async (data) => {
        await addDoc(collection(db, "notifications"), {
            fromID: data.fromID,
            toID: data.toID,
            atCreated: new Date().toLocaleString(),
            atUpdated: new Date().toLocaleString(),
            status: null,
            priviewMessage: data.priviewMessage,
        }).then(() => {
            console.log('success created notify')
        }).catch(err => {
            console.log(err)
        })
    },

    getAllNotifictions: async (data_) => {
        const q = query(collection(db, "notifications"), orderBy("atCreated", "asc"), where("toID", "in", [data_.toID]))
        let notifyList = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            if(doc.data().toID === data_.toID)
            {
                if(doc.data().fromID === doc.data().toID) return
                let data_message = {
                    id: doc.id,
                    priviewMessage: doc.data().priviewMessage,
                    toID: doc.data().toID,
                    fromID: doc.data().fromID,
                    atCreated: doc.data().atCreated,
                    atUpdated: doc.data().atUpdated,
                }
                notifyList.push(data_message)
            } else return
        })
        return notifyList
    },

    deleteNotificationsSelected: (arrayID) => {
        if (arrayID)
        {
            arrayID.forEach( elem => {
                const docRef = doc(db, "notifications", elem)
                if (docRef)
                {
                    deleteDoc(docRef)
                    console.log('notify been deleted', elem)
                }
                else
                {
                    console.log('so notify not found id: ', elem)
                }
            })
        } else
        {
            console.log('array is empty')
        }
    },

    deleteNotifications: (id) => {
        const docRef = doc(db, 'notifications', id)
        if(docRef)
        {
            deleteDoc(docRef)
            console.log('delete notify from listNotifications', docRef.id)
        }
    },

    deleteAllNotifications: async (USERID) => {
        const q = query(collection(db, "notifications"))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((docum) => {
          if(docum.data().toID === USERID)
          {
            const docRef = doc(db, "notifications", docum.id)
            deleteDoc(docRef)
            console.log('delete notification', USERID)
          }
        })
    }
}

export {NotifyApi}