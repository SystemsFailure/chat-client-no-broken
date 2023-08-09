import IError from "@/IError"
import { db } from "@/main"
import { collection, addDoc, orderBy, where, query, getDocs, deleteDoc, doc, runTransaction, limit, startAfter} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/main";
import { ChatApi } from "./ChatController";

const MessagesApi = {
    uploadImageMessage: async (file, user_id, data_) => {
        let file_path = null
        let file_url = null
        await ChatApi.getChat({toID: data_.toId, fromID: user_id}).then(async chat => {
            if(chat)
            {
              let countIndex = chat[0].countOfMessages
              const storageRef = ref(storage, '/chat-files-package/users-photo-message_id - ' + user_id + countIndex)
              await uploadBytes(storageRef, file).then( async (snapshot) => {
                  file_path = snapshot.metadata.fullPath
                  const starsRef = ref(storage, snapshot.metadata.fullPath)
                  if(!starsRef) {
                      console.log(starsRef, 'not found', 'MessageController -> file not found' + `${file_path}`)
                  }
                  await getDownloadURL(starsRef).then((url) => {
                      file_url = url
                    }).catch((error) => {
                      console.log(error)  
                    })
                }).catch( error => {
                  IError(error)
                })
            } else {
              console.log('chat is not defined')
            }
        }).catch(err => {
          console.log(err)
        })
        return {file_path: file_path, file_url: file_url}
      },


    getAllMessage: async (data_) => {
        const requestQuery = query(
          collection(db, "messages"),
          orderBy("index", 'asc'),
          where("togetherId", 'in', [`${data_.fromId}-${data_.toId}`, `${data_.toId}-${data_.fromId}`]),
        )
        let mess_lst = []
        const querySnapshot = await getDocs(requestQuery)
        querySnapshot.forEach((doc) => {
          let data_message = {
            id: doc.id,
            content: doc.data().content,
            toId: doc.data().toId,
            fromId: doc.data().fromId,
            result: doc.data().result,
            size: doc.data().size,
            atCreated: doc.data().atCreated,
            atUpdated: doc.data().atUpdated,
            view: doc.data().view,
            img_url: doc.data().img_url,
            img_name: doc.data().img_name,
            totalCount: doc.data().totalCount,
            index: doc.data().index,
            fileobj_url: doc.data().fileobj_url,
            namefile: doc.data().namefile,
            answered: doc.data().answered,
            answeredText: doc.data().answeredText,
            idAnsweredMessageDomElement: doc.data().idAnsweredMessageDomElement,
        }
        mess_lst.push(data_message)
        })
        return mess_lst
      },

    createMessage: async (data, data_r=null) => {
        if(!data) {IError('data is empty -> MessageApi')}
        if(!data.fromId) {IError('fromId is null -> MessageApi')}
        if(!data.toId) throw IError('toId as null -> MessageApi')

        const array = await addDoc(collection(db, "messages"), data).then( async () => {
          if (data.img_url != null)
          {
            //Это для image сообщения
            return await MessagesApi.getAllMessage(data_r)
          }
          else
          {
            //Это текстовое сообщение
            return await MessagesApi.getAllMessage(data_r)
          }
        }).catch(err => {
            console.log(err, 'error from createMessage')
            return 'failure'
        })
        return array
    },

    createMessageImage: async (data, data_r=null) => {
      if(!data) {IError('data is empty -> MessageApi')}
      if(!data.fromId) {IError('fromId is null -> MessageApi')}
      if(!data.toId) throw IError('toId as null -> MessageApi')
      const array = await addDoc(collection(db, "messages"), data).then( async () => {
          return await MessagesApi.getAllMessage(data_r)
      }).catch(err => {
          console.log(err, 'error from createMessage')
          return 'failure'
      })
      return array
    },

    deleteMessageById: async (MESSAGEID) => {
      await deleteDoc(doc(db, "messages", MESSAGEID)).then(() => {
        console.log('message was delete')
      }).catch(err => {
        console.log(err)
      })
    },

    deleteAllMessages: async (USERID) => {
      const q = query(collection(db, "messages"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((docum) => {
        if(docum.data().fromId === USERID || docum.data().toId === USERID) {
          const docRef = doc(db, "messages", docum.id)
          deleteDoc(docRef)
          console.log('delete mess', USERID)
        }
      })
    },

    returnTotalNumberOfDocuments: async () => {
      const q = query(collection(db, "messages"))
      const snapShoot = await getDocs(q)
      console.log(snapShoot.size, 'size of snap')
      return snapShoot.size
    },

    incrementValue: () => {

    },

    deleteByMessage: async (message_id) => {
      const docRef = doc(db, "messages", message_id)
      if(!docRef) {
        console.log('docRef not found')
        return
      } else {
        deleteDoc(docRef)
        console.log(docRef.id, ' was deleted...')
      }

    },

    editMessage: async (message_id, newContent) => {
      const sfDocRef = doc(db, "messages", message_id)
      try {
        await runTransaction(db, async (transaction) => {
          const sfDoc = await transaction.get(sfDocRef)
          if (!sfDoc.exists()) throw "Document does not exist!"
          // const newPopulation = sfDoc.data().population + 1
          transaction.update(sfDocRef, { content: newContent })
        })
        console.log("Transaction successfully committed!")
      } catch (e) {
        console.log("Transaction failed: ", e)
      }
      
    },

    getUniqueElement: async(data) => {
      //'Ayk4NuXMWVQxWOC4r4OF-1xfJL8tIUqMlojvBji3N' example togetherId
      const uniqueElement = query(collection(db, "messages"), where("togetherId", 'in', [`${data.fromId}-${data.toId}`, `${data.toId}-${data.fromId}`]), orderBy("index", 'desc'));
      const docs_ = await getDocs(uniqueElement)
      docs_.forEach(elem => {
        if(elem.exists())
        {
          console.log(elem.data().content, elem.data().togetherId)
        } else {
          console.log('element is not exist ---')
        }
      })
    },

    getLimitedPage: async (data_) => {
      let arr = []
      const first = query(
        collection(db, "messages"),
        where("togetherId", 'in', [`${data_.fromId}-${data_.toId}`, `${data_.toId}-${data_.fromId}`]),
        orderBy("index", 'desc'),
        orderBy('atCreated', 'asc'),
        limit(20)
      )
      const documentSnapshots = await getDocs(first)
      const lastElement = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      documentSnapshots.forEach(doc => {
        let data_message = {
          id: doc.id,
          content: doc.data().content,
          toId: doc.data().toId,
          fromId: doc.data().fromId,
          result: doc.data().result,
          size: doc.data().size,
          atCreated: doc.data().atCreated,
          atUpdated: doc.data().atUpdated,
          view: doc.data().view,
          img_url: doc.data().img_url,
          img_name: doc.data().img_name,
          totalCount: doc.data().totalCount,
          index: doc.data().index,
          togetherId: doc.data().togetherId,
          fileobj_url: doc.data().fileobj_url,
          namefile: doc.data().namefile,
          answered: doc.data().answered,
          answeredText: doc.data().answeredText,
          idAnsweredMessageDomElement: doc.data().idAnsweredMessageDomElement,
          
        }
        arr.push(data_message)
      })
      return {lastElement: lastElement, array: arr}
    },

    getNextPage: async(lastElement, data_) => {
      if(!lastElement) {console.log('next cycle'); return}
      let array = []
      const next = query(
        collection(db, 'messages'),
        where("togetherId", 'in', [`${data_.fromId}-${data_.toId}`, `${data_.toId}-${data_.fromId}`]),
        orderBy('index', 'desc'),
        orderBy('atCreated', 'asc'),
        startAfter(lastElement),
        limit(20)
      )
      const nextDocumentSnapshots = await getDocs(next)
      let lastElement_ = nextDocumentSnapshots.docs[nextDocumentSnapshots.docs.length - 1];
      nextDocumentSnapshots.forEach(doc => {
        let data_message = {
          id: doc.id,
          content: doc.data().content,
          toId: doc.data().toId,
          fromId: doc.data().fromId,
          result: doc.data().result,
          size: doc.data().size,
          atCreated: doc.data().atCreated,
          atUpdated: doc.data().atUpdated,
          view: doc.data().view,
          img_url: doc.data().img_url,
          img_name: doc.data().img_name,
          totalCount: doc.data().totalCount,
          index: doc.data().index,
          togetherId: doc.data().togetherId,
          fileobj_url: doc.data().fileobj_url,
          namefile: doc.data().namefile,            
          answered: doc.data().answered,
          answeredText: doc.data().answeredText,
          idAnsweredMessageDomElement: doc.data().idAnsweredMessageDomElement,
        }
        array.push(data_message)
      })
      console.log(lastElement_, 'lastElement_, alllllo blyat')
      return {lastElement_: lastElement_, array: array}
    },

    deleteAllMessage: () => {

    },

    ViewingMessage: () => {

    }
}

export {MessagesApi}