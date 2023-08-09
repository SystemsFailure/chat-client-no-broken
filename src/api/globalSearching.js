import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/main";


const global_search = {
    search_users_by_name: async (namefield) => {
        let found_users = []
        const nameq = query(collection(db, "users"), where("name", "==", namefield));

        const querySnapshot = await getDocs(nameq);
        querySnapshot.forEach((user) => {
            console.log(user.id, " => ", user.data());
            found_users.push({
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
                status: user.data().status,
            })
        });
        return found_users
    },

    filter_range: (arr, by_value, to_value) => {
        return arr.filter(item => (by_value <= item.arrayFollowers.length && item.arrayFollowers.length <= to_value));
    },

    globalSorted: async (atributersSort) => {
        let found_users = []
        const compositeQuery = query(
                collection(db, 'users'),
                where('country', '==', atributersSort.country),
                where('online', '==', atributersSort.online === 'online' ? true : false),
                orderBy('name', atributersSort.sortByName)
            )
        const querySnapshot = await getDocs(compositeQuery)
        querySnapshot.forEach((user) => {
            console.log(user.id, " => ", user.data());
            found_users.push({
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
                status: user.data().status,
            })
        });
        found_users = global_search.filter_range(found_users, atributersSort.followersBy, atributersSort.followersTo)
        return found_users

    }


}

export default global_search