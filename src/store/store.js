import {createStore} from "vuex";
import playerModule from "@/store/modules/playerModule";
import playlistModule from '@/store/modules/playlistController'
import toastModule from "./modules/toastModule";
import contextmenu from "./modules/contextmenu";
import themescontroller from "./modules/themesController";
import filexchange from "./modules/fileExchangeModule";
import audioDriver from './modules/audioDriver'

const store = createStore({

    modules: {
        player: playerModule,
        playlist: playlistModule,
        toast: toastModule,
        contextmenu: contextmenu,
        themescontroller: themescontroller,
        filexchange: filexchange,
        audioDriver: audioDriver,
    },

    state: () => ({
        user_data: [],
        validated: true,
        isAuth: true,
        URL: 'http://localhost:3000/',
        inp_text_for_fulter: '',
        AuthOrRegister: false,
        hideExploreBar: false,
        id_backgroundImage: null,
        showProfile: false,
        itemByProfile: [],
        online: false,
        USERID: null,
        UserPersonalData: [],
        showDialogDeleteWindow: false,
        showProfileOtherUser: false,
        // showCycyleNotifyItem: false


        currentChatUserId: null,
        user_to_id: null,

    }),
    mutations: {
        setuser_to_id(st, vl) {
            st.user_to_id = vl
        },
        setcurrentChatUserId(state, value) {
            state.currentChatUserId = value
            
        },
        clearcurrentChatUserId(state) {
            state.currentChatUserId = null
        },

        changeDialogValue (state) {
            state.showDialogDeleteWindow = true
        },

        showEventMutation (state) {
            state.showProfile = !state.showProfile
        },
        changeProfile (state, newProxy) {
            state.itemByProfile = [newProxy]
        },
        globalFunctionUpdateChat (array) {
            if(array) {
                return array = []
            } else {
                console.log('array already by clean')
            }
        },
        changeShowProfileOtherUser(state) {
            state.showProfileOtherUser = !state.showProfileOtherUser;
        },
    }
})
export default store