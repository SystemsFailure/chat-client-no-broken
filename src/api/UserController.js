import { getDoc, doc, deleteDoc, runTransaction, getDocs, collection, updateDoc, arrayUnion, increment, addDoc} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import {auth, db} from '@/main.js'
import { signOut } from "firebase/auth";
import IError from "@/IError";

const UserApi = {

    userIsLogoutFromSystem: async (localStorage, store) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", localStorage.getItem('user-id') ? localStorage.getItem('user-id') : false)
                await updateDoc(userRef, {
                    online: true
                }).then( () => {
                    console.log('result: field online was update. true - online', 'Its from UserController')
                }).catch( err => {
                    console.log(err)
                })
        
                localStorage.setItem('user-uid', user.uid)
                store.state.isAuth = true
                store.state.online = true
            } else {
                const userRef = doc(db, "users", localStorage.getItem('user-id') ? localStorage.getItem('user-id') : false)
                await updateDoc(userRef, {
                    online: false
                }).then( () => {
                    console.log('result: field online was update. false - offline', 'Its from UserController')
                }).catch( err => {
                    console.log(err)
                })
        
                localStorage.removeItem('user-uid')
                store.state.isAuth = false
                store.state.online = false
            }
        });
        
    },

    addUserToBase: async (data, local) => {
        await addDoc(collection(db, "users"), {
            name: data.queryName,
            email: data.queryEm,
            password: data.queryPassword,
            image_url: null,
            online: false,
            countNotReadMessages: 0,
            atCreated: new Date().toLocaleString(),
            atUpdated: new Date().toLocaleString(),
            bio_info: null,
            status: null,
            city: null,
            country: null,
            lastMessageId: null,
            arrayNotReadMessages: [],
            arrayFollowing: [],
            arrayFollowers: [],
            arrayChats: [],
            arrayConfigurations: [],
            arrayMuteNotificationsUsers: [],
            arrayСertainUsers: [],
            arrayMusicsFastAccess: [],
            arrayPlaylists: [],
        }).then(user => {
            local.setItem('user-id', user.id)
            console.log(user.id, 'daddada')
        }).catch(err => {
            console.log(err)
        })
        
    },

    GetPersonalDataOfUser: async (userId) => {
        const dataUser = []
        const userRef = doc(db, 'users', userId)
        await getDoc(userRef).then(user => {
            if(user.exists()) {
                const data = {
                    id: user.id,
                    name: user.data().name,
                    email: user.data().email,
                    online: user.data().online,
                    img_url: user.data().image_url,
                    // lastmessage: "Hello, How are you going man? bro? good luck",
                    lastmessage: user.data().lastMessageId,
                    countNotReadMessages: user.data().countNotReadMessages,
                    arrayChats: user.data().arrayChats,
                    arrayFollowers: user.data().arrayFollowers,
                    arrayFollowing: user.data().arrayFollowing,
                    arrayNotReadMessages: user.data().arrayNotReadMessages,
                    arrayConfigurations: user.data().arrayConfigurations,
                    arrayMusicsFastAccess: user.data().arrayMusicsFastAccess,
                    arrayPlaylists: user.data().arrayPlaylists,
                    city: user.data().city,
                    country: user.data().country,
                    bio_info: user.data().bio_info || null,
                    status: user.data().status || null,
                    atCreated: user.data().atCreated,

                }
                dataUser.push(data)
            }
        })
        return dataUser
    },

    getFollowers: async(USERID) => {
        let arrayFollowers = []
        await UserApi.getIDFollowers(USERID).then(async arr => {
            if(arr) 
            {
                for (let el of arr) {
                    const ref = doc(db, 'users', el)
                    const user = await getDoc(ref)
                    const data = {
                        id: user.id,
                        name: user.data().name,
                        email: user.data().email,
                        online: user.data().online,
                        img_url: user.data().image_url,
                        lastmessage: user.data().lastMessageId,
                        countNotReadMessages: user.data().countNotReadMessages,
                        arrayChats: user.data().arrayChats,
                        arrayFollowers: user.data().arrayFollowers,
                        arrayFollowing: user.data().arrayFollowing,
                        arrayNotReadMessages: user.data().arrayNotReadMessages,
                        arrayConfigurations: user.data().arrayConfigurations,
                        arrayMusicsFastAccess: user.data().arrayMusicsFastAccess,
                        arrayPlaylists: user.data().arrayPlaylists,
                        city: user.data().city,
                        country: user.data().country,
                        bio_info: user.data().bio_info,
                        status: user.data().status,
                        atCreated: user.data().atCreated,
                    }
                    arrayFollowers.push(data)   
                }
            } else {
                console.log('nope')
            }
        }).catch(err => {
            console.log(err)
        })
        console.log(arrayFollowers, 'daddadaad')
        return arrayFollowers
    },

    getIDFollowers: async(USERID) => {
        const ref = doc(db, 'users', USERID)
        if(ref)
        {
            const docum = await getDoc(ref)
            if(docum.exists()) {
                const arrayIDS = docum.data().arrayFollowers
                return arrayIDS
            }
        }
    },

    getFollowings: async(USERID) => {
        let arrayFollowers = []
        await UserApi.getIDFollowings(USERID).then(async arr => {
            if(arr) 
            {
                for (let el of arr) {
                    const ref = doc(db, 'users', el)
                    const user = await getDoc(ref)
                    const data = {
                        id: user.id,
                        name: user.data().name,
                        email: user.data().email,
                        online: user.data().online,
                        img_url: user.data().image_url,
                        lastmessage: user.data().lastMessageId,
                        countNotReadMessages: user.data().countNotReadMessages,
                        arrayChats: user.data().arrayChats,
                        arrayFollowers: user.data().arrayFollowers,
                        arrayFollowing: user.data().arrayFollowing,
                        arrayNotReadMessages: user.data().arrayNotReadMessages,
                        arrayConfigurations: user.data().arrayConfigurations,
                        arrayMusicsFastAccess: user.data().arrayMusicsFastAccess,
                        arrayPlaylists: user.data().arrayPlaylists,
                        city: user.data().city,
                        country: user.data().country,
                        bio_info: user.data().bio_info,
                        status: user.data().status,
                        atCreated: user.data().atCreated,
                    }
                    arrayFollowers.push(data)   
                }
            } else {
                console.log('nope')
            }
        }).catch(err => {
            console.log(err)
        })
        console.log(arrayFollowers, 'daddadaad')
        return arrayFollowers
    },

    getIDFollowings: async(USERID) => {
        const ref = doc(db, 'users', USERID)
        if(ref)
        {
            const docum = await getDoc(ref)
            if(docum.exists()) {
                const arrayIDS = docum.data().arrayFollowing
                return arrayIDS
            }
        }
    },

    getAllChats: async(userId) => {
        let users = []
        const docRef = doc(db, "users", userId)
        const user_ = await getDoc(docRef)
        const listChats = user_.data().arrayChats
        if(listChats) {
            for (let index = 0; index < listChats.length; index++) {
                const elementId = listChats[index]
                const userRef = doc(db, 'users', elementId)
                await getDoc(userRef).then(user => {
                    if(user.exists()) {
                        const data = {
                            id: user.id,
                            name: user.data().name,
                            email: user.data().email,
                            online: user.data().online,
                            img_url: user.data().image_url,
                            lastmessage: user.data().lastMessageId,
                            countNotReadMessages: user.data().countNotReadMessages,
                            arrayChats: user.data().arrayChats,
                            arrayFollowers: user.data().arrayFollowers,
                            arrayFollowing: user.data().arrayFollowing,
                            arrayNotReadMessages: user.data().arrayNotReadMessages,
                            arrayConfigurations: user.data().arrayConfigurations,
                            arrayMusicsFastAccess: user.data().arrayMusicsFastAccess,
                            arrayPlaylists: user.data().arrayPlaylists,
                            city: user.data().city,
                            country: user.data().country,
                            bio_info: user.data().bio_info,
                            status: user.data().status
                        }
                        users.push(data)
                    }
                })
                
            }
        }
        return users
    },

    addUserToChats: async(userId, newValue) => {
        const user = doc(db, "users", userId)
        if(!user.id) return IError('user is not exit -> from UserController')
        await updateDoc(user, {
            arrayChats: arrayUnion(newValue)
        })
        return 'successful'
    },

    AddFollower: async(userId, value) => {
        const user = doc(db, 'users', userId);
        if(!user.id) return IError('user in not exit -> from UserController');
        await updateDoc(user, {
            arrayFollowers: arrayUnion(value),
        });
        return true
    },

    getAllUsers: async() => {
        let users_list = []
        const querySnapshot = await getDocs(collection(db, "users"))

        querySnapshot.forEach((user) => {
            const data = {
                id: user.id,
                name: user.data().name,
                email: user.data().email,
                online: user.data().online,
                img_url: user.data().image_url,
                lastmessage: user.data().lastMessageId,
                countNotReadMessages: user.data().countNotReadMessages,
                arrayChats: user.data().arrayChats,
                arrayFollowers: user.data().arrayFollowers,
                arrayFollowing: user.data().arrayFollowing,
                arrayNotReadMessages: user.data().arrayNotReadMessages,
                arrayConfigurations: user.data().arrayConfigurations,
                city: user.data().city,
                country: user.data().country,
                bio_info: user.data().bio_info,
                status: user.data().status

            }
            users_list.push(data)
            // users_list = users_list.value.filter(user => user.id != localStorage.getItem('user-id'))
            // console.log(data)
            // console.log(user.id, " => ", user.data());
        });

        return users_list
    },

    getUserById: async (user_id) => {
        const docRef = doc(db, "users", user_id)
        const userSnap = await getDoc(docRef)
        if(userSnap.exists()) {
            return userSnap
        } else {
            return null
        }
    },

    deleteUser: async (userId) => {
        await deleteDoc(doc(db, "users", userId))
    },

    leaveUser: async () => {
        signOut(auth).then(() => {
            localStorage.removeItem('user-id')
            localStorage.removeItem('user-id')
            localStorage.removeItem('user-name')
            localStorage.removeItem('user-email')
            // cookie = ''
          }).catch((error) => {
            IError(error)
          });
    },



    updateDataOfLastMessageField: async (userID, value) => {
        const user = doc(db, 'users', userID)
        await updateDoc(user, {lastMessageId: value}).then( () => {
            console.log('success update lastMessage')
        }).catch( err => {
            console.log(err)
        })
    },
}

const TransitionApi = {
    updateField: async (
            field,
            newField,
            userId
            ) => {
        try {
            await runTransaction(db, async (transaction) => {
                if(!userId) throw 'user-id is invalid or null or false'
                // const user = await transaction.get(doc(db, "users", userId))
                // if (!user.exists()) throw "Document does not exist!"
                transaction.update(doc(db, "users", userId),
                     { [field]: newField })
            });
            console.log(`${field}`)
            return 'success'
        } catch (e) {
            console.log("Transaction failed: ", e)
          }
    },

    incrementValue: async (value, userId) => {
        const washingtonRef = doc(db, "users", userId);
        await updateDoc(washingtonRef, {
            [value]: increment(1)
        })
    },
}

export {UserApi, TransitionApi}