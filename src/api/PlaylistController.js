import { db } from "@/main"
import { collection, query, where, getDocs } from "firebase/firestore";
const PlaylistApi = {
    createPlaylist: () => {

    },
    deletePlaylist: () => {

    },
    addMusicToPlaylist: () => {

    },
    uploadImagePlayList: () => {

    },
    getAllMusicsFromPlaylistById: () => {

    },
    getDataPlaylist: () => {

    },
    getLimitPlaylist: () => {
        
    },
    globalSearchingByName: () => {
        
    },
    async getPlaylistByUserId(userId) {
        let playlistArray = [];
        const query_ = query(collection(db, "playlist"), where("userId", "==", userId));
        const querySnapshot = await getDocs(query_);
        querySnapshot.forEach((doc) => {
            const data = {
                id: doc.id,
                name: doc.data().name,
                arrayMusic: doc.data().arrayMusic,
                arrayMusicsId: doc.data().arrayMusicsId,
                description: doc.data().description,
                imgUrl: doc.data().imgUrl,
                privateMode: doc.data().privateMode,
                userId: doc.data().userId,
            }
            playlistArray.push(data);
        });
        return playlistArray;
    },
}

export {PlaylistApi}