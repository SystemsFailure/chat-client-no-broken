import { createApp } from 'vue'
// import VueFire from 'vuefire'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { doc, updateDoc} from "firebase/firestore";
// import { doc, onSnapshot, updateDoc} from "firebase/firestore";


import App from './App.vue';
import router from './router/router';
import store from "./store/store";
import mitt from 'mitt';


const firebaseConfig = {
    apiKey: "AIzaSyAMoQWSRlByi8OSrgGmFr5N9kL-V9HAlQg",
    authDomain: "messangercloud.firebaseapp.com",
    projectId: "messangercloud",
    messagingSenderId: "1018070323148",
    appId: "1:1018070323148:web:ada081b3aeb10270f1d769",
    measurementId: "G-Z946G7Z6PK",
    storageBucket: 'gs://messangercloud.appspot.com/'
}

const appBase = initializeApp(firebaseConfig);

const auth = getAuth(appBase);
const db = getFirestore(appBase);
const storage = getStorage(appBase)

onAuthStateChanged(auth, async (user) => {
    if (!localStorage.getItem('user-id')) {console.log('user-id is empty. SigIn to system '); return}
    if (user) {
        const userRef = doc(db, "users", localStorage.getItem('user-id') ? localStorage.getItem('user-id') : false)
        await updateDoc(userRef, {
            online: true
        }).then( () => {
            console.log('result: field online was update. true - online')
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
            console.log('result: field online was update. false - offline')
        }).catch( err => {
            console.log(err)
        })

        localStorage.removeItem('user-uid')
        store.state.isAuth = false
        store.state.online = false
    }
});

// onSnapshot(doc(db, "users", localStorage.getItem('user-id')), (doc) => {
//     console.log("Current data: ", doc.data());
// })



const emmiter = mitt()
const appVue = createApp(App)
appVue.config.globalProperties.emmiter = emmiter
appVue.use(store)
.use(router).mount('#app')

export {auth, db, storage}