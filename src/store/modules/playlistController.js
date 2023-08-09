import { collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { query, where, getDocs, doc, getDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/main";

const playlistModule = {
    namespaced: true,
    state: () => ({
        filesList: [],
        playlistID: null,
        data: {},
        arrayIds: [],
        currentUserId: null,
        playlistList: [],
        playlistIdList: [],

        musicsList: [],
        musicsListLV: [],

        playlistData: {},

    }),
    mutations: {
        // secondary mutatuions sigment start
        setplaylistData(st, vl) {
            st.playlistData = vl
        },
        setplaylistId(state, id) {
            console.log("setplaylist - mutation: ", id);
            state.playlistID = id
        },
        setArrayMusicId(state, array) {
            state.arrayIds = array
        },
        setData(state, object) {
            state.data = object
        },
        setToZeroList(state) {
            state.filesList = []
        },
        setCerrentUserId(state, value) {
            state.currentUserId = value
        },
        setPlaylistList(state, value) {
            state.playlistList = value
        },
        setplaylistIdList(state, value) {
            state.playlistIdList = value
        },
        setmusicsList(state, val) {
            state.musicsList = val
        },
        setmusicsListLV(state, val) {
            state.musicsListLV = val
        },
        // secondary mutations sigment end
        // primary mutatuions sigment start
        // primary mutatuions sigment end
///chat-files-object-package
    },
    actions: {
        async uploadImages(context) {
            if(!context.state.playlistID) console.log('id is null')
            if(context.state.filesList.length === 1)
            {
                await context.dispatch('createdNewPlayList')
                const storageRef = ref(storage, 'image-of-playlist/' + context.state.filesList[0].name + '-' + context.state.playlistID);
                const uploadTask = uploadBytesResumable(storageRef, context.state.filesList[0]);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, (error) => {
                        switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                        }
                    }, () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            const docRef = doc(db, "playlist", context.state.playlistID);
                            await updateDoc(docRef, {
                                imgUrl: downloadURL
                            });
                            if(context.state.playlistIdList.length === 0)
                            {
                                console.log('not choiced songs')
                                return
                            }
                            for (let index = 0; index < context.state.playlistIdList.length; index++) {
                                const element = context.state.playlistIdList[index];
                                const playlist = doc(db, "playlist", context.state.playlistID)
                                await updateDoc(playlist, {
                                    arrayMusic: arrayUnion(element)
                                })
                            }
                            context.commit('setToZeroList')
                        });
                    }
                );
            }
        },
        async createdNewPlayList(context) {
            if(context.state.currentUserId === null)
            {
                console.log('userid in global storage is null')
                return
            }
            if(context.state.data === null)
            {
                console.log('data in global store is null')
                return
            }
            const doc = await addDoc(collection(db, "playlist"), context.state.data);
            console.log('start commit set id')
            context.commit('setplaylistId', doc.id)
        },
        async getAllPlayList(context) {
            // you need to setup the currentUserIdw
            context.commit('setPlaylistList', [])
            if(context.state.currentUserId === null) 
            {
                console.log('user id into global store === null')
                return
            }
            const q = query(collection(db, "playlist"), where("userId", "==", context.state.currentUserId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = {
                    id: doc.id,
                    name: doc.data().name,
                    arrayMusic: doc.data().arrayMusic,
                    description: doc.data().description,
                    imgUrl: doc.data().imgUrl,
                    privateMode: doc.data().privateMode,
                    userId: doc.data().userId,
                }
                context.state.playlistList.push(data)
            });
            context.state.playlistList.push({ id: 'addPlaylistSuka', title: 'new playlist', img_url: 'addPlaylist4.png', arrayMusic: [], description: 'Just create new playlist ;)', avtor: 'add playlist'})

        },
        async getLimitPlaylist() {

        },

        async getPlaylistByUserId({}, userId) {
            
        },

        async getPLData({state, commit}) {
            if(state.playlistID != null)
            {
                const playlist_ = doc(db, "playlist", state.playlistID);
                await getDoc(playlist_).then(playlist => {
                    let dataPL = {
                        imgUrl: playlist.data().imgUrl,
                    }
                    commit('setplaylistData', dataPL)
                })
            }
        },

        async getDataFromPlaylist(context) {
            if(context.state.playlistID != null)
            {
                const playlist_ = doc(db, "playlist", context.state.playlistID);
                await getDoc(playlist_).then(playlist_Snap => {
                    context.commit('setmusicsList', playlist_Snap.data().arrayMusic)
                    console.log(playlist_Snap.data().arrayMusic, 'opps', context.state.musicsListLV)
                })
            } else {
                console.log('2')
            }
            context.commit('setmusicsListLV', [])
            if(context.state.musicsList) {
                for (let index = 0; index < context.state.musicsList.length; index++) {
                    const element = context.state.musicsList[index];
                    const docRef = doc(db, "musics", element);
                    const docSnap = await getDoc(docRef)
                    console.log(docSnap.data().name)
                    if(docSnap.exists()) {
                        // context.commit('setmusicsListLV', docSnap)
                        const data = {
                            id: docSnap.id,
                            url: docSnap.data().url,
                            name: docSnap.data().name,
                            artist: docSnap.data().artist,
                            size: docSnap.data().size,
                            type: docSnap.data().type,
                            userId: docSnap.data().userId,
                            playlist: docSnap.data().playlist,
                        }
                        context.state.musicsListLV.push(data)
                    }
                }
            } else {
                console.log('3')
            }
        },
    },
    getters: {

    },
}

export default playlistModule