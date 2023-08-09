// import { ref, list} from "firebase/storage";
import { ref, list, getDownloadURL, uploadBytes} from "firebase/storage";
import {addDoc, collection, query, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore"

import { storage } from "@/main";
import { db } from "@/main";

const MusicApi = {
    deleteFromArrayMusicsList: async (userId, removedValue) => {
        const user = doc(db, 'users', userId)
        if(user) {
            await updateDoc(user, {
                arrayMusicsFastAccess: arrayRemove(removedValue)
            })
            return true
        } else {
            console.log('user is not found!')
            return false
        }
    },

    setMusicInArrayPersonalMusicList: async (userId, newValue) => {
        const user = doc(db, "users", userId)
        if(!user.id) console.log('userId is not defined')
        await updateDoc(user, {
            arrayMusicsFastAccess: arrayUnion(newValue)
        })
        return 'successful'
    },

    getAllPersonalMusicsDoc: async(arrayMusicsList) => {
        let musics = [];
        const listMusics = arrayMusicsList;
        if(listMusics) {
            console.log(listMusics, 'listMusics');
            for (let index = 0; index < listMusics.length; index++) {
                const elementId = listMusics[index];
                const musicRef = doc(db, 'musics', elementId);
                console.log(elementId, 'elementId');
                console.log(musicRef, 'musicRef');
                await getDoc(musicRef).then(music => {
                    if(music.exists()) {
                        const data = {
                            id: music.id,
                            artist: music.data().artist,
                            name: music.data().name,
                            playlistId: music.data().playlistId,
                            size: music.data().size,
                            type: music.data().type,
                            url: music.data().url,
                            userId: music.data().userId
                        }
                        musics.push(data);
                    }
                }).catch(err => console.log(err));
            }
        } else {console.log('listMusic is undefuned or null')};
        return musics
    },

    sendFile: async ( data ) => {
        let file_url = null
        if(!data)
        {
            console.log('data is not defined')
            return
        }
        const storageRef = ref(storage, 'musics/' + `${data.name} - ` + data.userId)
        await uploadBytes(storageRef, data.file).then( async (snapshot) => {
            const starsRef = ref(storage, snapshot.metadata.fullPath)
            if(!starsRef) {
                console.log(starsRef, 'not found', 'MessageController -> file not found' + ``)
            }
            await getDownloadURL(starsRef).then((url) => {
                file_url = url
              }).catch((error) => {
                console.log(error)  
              })
          }).catch( error => {
            console.log(error)
          })
          return {file_url: file_url}
    },

    sendFileDocument: async (data) => {
        await addDoc(collection(db, "musics"), data).then( async () => {
            console.log('file been created successful')
        }).catch(err => {console.log(err)})
        
    },

    getAllMusicsDocs: async() => {
        const query_ = query(collection(db, 'musics'))
        let musicsList = []
        const querySnapshot = await getDocs(query_)
        querySnapshot.forEach((doc) => {
            let data_message = {
                id: doc.id,
                url: doc.data().url,
                name: doc.data().name,
                artist: doc.data().artist,
                size: doc.data().size,
                type: doc.data().type,
                userId: doc.data().userId,
                playlist: doc.data().playlist,
            }
            musicsList.push(data_message)
        })
        return musicsList
    },

    getImg: async () => {
        try {
            const listRef = ref(storage, 'chat-files-package');
            let firstChunck = await list(listRef, { maxResults: 100 })
            firstChunck.items.forEach(async elem => {
                await getDownloadURL(elem).then(async url => {
                    // await addDoc(collection(db, "musics"), {
                    //     name: elem.name,
                    //     url: url,
                    //     artist: 'Eric Dragons'
                    // }).then( async () => {
                    //     console.log('created document')
                    // }).catch(err => console.log(err))
                    console.log(url)
                })
            })
        } catch (error) {
            console.log(error)
        }
    },

    getAllMusics: async () => {
            let arrayList = []
            const listRef = ref(storage, 'musics');
            await list(listRef, { maxResults: 100 }).then(async firstPage => {

                for (let index = 0; index < firstPage.items.length; index++) {
                    const folderRef = firstPage.items[index];
                    let data_music = {
                        id: folderRef.name,
                        name: folderRef.name,
                        artist: 'Eric Leonhard',
                    }
                    arrayList.push(data_music)
                }
            })
            return arrayList

            
          
            // Fetch the second page if there are more elements.
            // if (firstPage.nextPageToken) {
            //   const secondPage = await list(listRef, {
                // maxResults: 100,
                // pageToken: firstPage.nextPageToken,
            //   });
              // processItems(secondPage.items)
              // processPrefixes(secondPage.prefixes)
        // }

        // const listRef_ = ref(storage, 'files/uid');

        // // Find all the prefixes and items.
        // listAll(listRef)
        // .then((res) => {
        //     res.prefixes.forEach((folderRef) => {
        //     // All the prefixes under listRef.
        //     // You may call listAll() recursively on them.
        //     });
        //     res.items.forEach((itemRef) => {
        //     // All the items under listRef.
        //     });
        // }).catch((error) => {
        //     // Uh-oh, an error occurred!
        // });
    }
}

export {MusicApi}