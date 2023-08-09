import { collection, query, where, onSnapshot } from "firebase/firestore"

const observer = {
    namespaced: true,
    state: () => ({

    }),
    actions: {
        observerOfContacts() {
            const q = query(collection(db, "users"), where("id", "==", "id"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data().name);
            });
                console.log("Current cities in CA: ", cities.join(", "));
            });
        },
    },
}

export default observer