import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/main";
const contextmenu = {
    state: () => ({
        idSelectedMessage: undefined,
        editedText: undefined,
        curr_messageInstance: undefined,
    }),

    mutations: {
        setidSelectedMessage(st, vl) {
            st.idSelectedMessage = vl
        },
        setcurr_messageInstance(st, vl) {
            st.curr_messageInstance = vl
        }
    },

    actions: {
        async deleteMessageById({state}) {
            await deleteDoc(doc(db, "messages", state.idSelectedMessage));
        },
    },

    getters: {

    },

    namespaced: true,
}

export default contextmenu