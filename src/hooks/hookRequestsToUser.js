// import { collection, addDoc, getDocs, where, query, orderBy} from "firebase/firestore";
import { collection, getDocs} from "firebase/firestore"; 

import {db} from '@/main.js'
import {ref} from "vue";

export default function requestGetUsers() {
    let users_list = ref([])

    // const q = query(collection(db, "users"), where("", "==", true);
    // const querySnap = query(collection(db, "users"))

    const getUsers = async() => {
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((user) => {
            const data = {
                id: user.id,
                name: user.data().name,
                email: user.data().email,
                online: user.data().online,
                img_url: user.data().image_url,
                lastmessage: "Hello, How are you going man? bro? good luck",
                countNotReadMessages: user.data().countNotReadMessages,


            }
            users_list.value.push(data)
            // users_list = users_list.value.filter(user => user.id != localStorage.getItem('user-id'))
            // console.log(data)
            // console.log(user.id, " => ", user.data());
        });
    }
    // console.log(users_list, 'next cycle')
    return {
        users_list, getUsers
    }
}