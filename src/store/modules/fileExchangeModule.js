
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/main";
import { MessagesApi } from "@/api/MessagesController";


const filexchange = {
    state: () => ({
        objectUserData: '',
        file: null,
        countIndex: null,
        progressUpload: '',
    }),
    mutations: {
        setprogressUpload(st, vl) {
            st.progressUpload = vl
        },
        setFileObj(st, vl) {
            st.file = vl
        },
        setcountIndex(st, vl) {
            st.countIndex = vl
        },
        setObjectUserData(st, vl) {
            st.objectUserData = vl
        }
    },
    actions: {
        uploadFileToCloud({state, getters, commit}) {
            if(state.file === null)
            {
                console.log(state.progressUpload, getters)
                return
            }
            const storageRef = ref(storage, 'chat-files-object-package/' + state.file.name + '-' + state.countIndex)
                const uploadTask = uploadBytesResumable(storageRef, state.file)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        commit('setprogressUpload', progress)
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break;
                        case 'running':
                            console.log('Upload is running')
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
                            if(state.objectUserData)
                            {
                                console.log(downloadURL)
                                MessagesApi.createMessage({
                                    content: null,
                                    fromId: state.objectUserData.fromId,
                                    toId: state.objectUserData.toId != null && state.objectUserData.toId != 0 ? state.objectUserData.toId : false,
                                    togetherId: state.objectUserData.fromId + '-' + state.objectUserData.toId,
                                    size: state.file.size,
                                    result: true,
                                    atCreated: new Date().toLocaleString(),
                                    atUpdated: new Date().toLocaleString(),
                                    view: null,
                                    img_url: null,
                                    img_name: null,
                                    index: state.countIndex,
                                    fileobj_url: downloadURL,
                                    download: false,
                                    namefile: state.file.name,
                                }, state.objectUserData)
                            }
                        });
                    }
                );
        },
    },
    getters: {
        getprogressUpload(st) {
            return st.progressUpload
        },
    },

    namespaced: true,
}

export default filexchange