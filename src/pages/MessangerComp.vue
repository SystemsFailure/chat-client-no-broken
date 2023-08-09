<template>

    <ToastNotifyListComp v-if="visibilityToastWindow"></ToastNotifyListComp>
    <dialogWindow
        v-if="this.$store.state.showDialogDeleteWindow"
        @ShowOrCloseDialogWindowChatDeletedFunction="DialogMessageBoutDeletedChatFunc">
    </dialogWindow>
    <CreateMusicWindow v-if="showCreateMusicWindow" @closeCreateMusicWinodwFunction="(v) => {this.showCreateMusicWindow = v}"></CreateMusicWindow>
    <dialogChatDeleted v-if="showDialogWindowChatDeleted"></dialogChatDeleted>
    <ProfileCardComp v-if="$store.state.showProfile" @closeProfileFunction="(value) => {this.$store.state.showProfile = value}"></ProfileCardComp>
    <ListAllUsersComp v-if="show_list_all_users_comp" @closeListUsersCompFunction="(value) => {this.show_list_all_users_comp = value}"></ListAllUsersComp>
    
    <ProfileOtherUser 
        v-if="showProfileOtherUser" 
        @closeProfileOtherUser="() => this.changeShowProfileOtherUser()"
        @showPlaylistComp="() => this.showViewPlaylistComp = true"
    ></ProfileOtherUser>
    
    <ViewPlaylistComp v-if="showViewPlaylistComp" @closeViewPlaylistComp="(val) => {this.showViewPlaylistComp = val}"></ViewPlaylistComp>
    <Transition name="transition-notifi-comp">
        <NotificationsComp 
            v-if="showNotificationComp" 
            @closeNotificationsCompFunction="(value) => {this.showNotificationComp = value}"
            @updateUsersListFunction="updateUsersList"
            ></NotificationsComp>
    </Transition>
    
    <div class="main_div">
        <div class="global-content">

            <NavigationComp @openMenu="openMenu" @showMyMusicCompFunction="() => {this.openMenu(5)}"></NavigationComp>

            <div class="right-block">
                <!-- <Transition name="up-profile-card-slide"> -->
                    <ChatWindowComp
                        v-if="showChatWindowComp"
                        v-bind:user_to_id="i_user_to_id"
                        @showNotificationWindowFunctionArrow="(value) => {this.showNotificationComp = value}"
                        v-bind:cleaningChat="cleaningChatModel"
                    ></ChatWindowComp>
                <!-- </Transition> -->
                <Transition name="up-profile-card-slide">
                    <AudioListComp v-if="showMenuMusics"></AudioListComp>
                </Transition>
                <PersonalAudioListComp v-if="shiwMyMusic" ></PersonalAudioListComp>
            </div>

            <div class="left-block">

                <Transition name="up-profile-card-slide">
                    <SearchUsersBoxComp v-if="showMenuChats" v-model="searchQuery" @clearTextFunction="() => {this.searchQuery = ''}"></SearchUsersBoxComp>
                </Transition>
                <div v-if="showChatWindowComp" class="btn-add-new-contact-chat" @click="() => {this.show_list_all_users_comp = true}">
                    <div class="icon=box"></div>
                    <div class="title-btn-new-cont"><span>new comunicated</span></div>
                </div>

                <Transition name="up-profile-card-slide">
                    <div v-if="showMenuChats" class="list-users">
                        <!-- loader -->
                        <div class="lds-ripple" v-if="localLoader"><div></div><div></div></div>

                        <ul>
                            <TransitionGroup name="list">
                                <div
                                v-for="item in filteredUsers"
                                v-bind:key="item.id"
                                class="item-list"
                                @click="open_item_of_list_users(item.id, item)"
                                :class="
                                    [
                                        this.id_currect_user === item.id? backcolorUserItemLink : ''
                                    ]
                                "
                                >
                                    <div class="name-and-img">
                                        <div class="box-img-and-toggle">
                                            <div :class="{'toggle-online' : item.online}"></div>
                                            <img :src="item.img_url || require('../assets/user_profile.png')" alt="photo" srcset="">
                                        </div>
                                        <span>{{item.name}}</span>
                                        <span id="dateLastMessage_id">{{item.dateLastMessage}}</span>
                                    </div>
                                    <!-- <h6 id="lastmess-id">{{slice_last_message('offline')}}</h6> -->
                                    <div class="box-not-read-message">
                                        <span :class="{'count-not-read-message_': item.countNotReadMessages}">{{item.countNotReadMessages ? item.countNotReadMessages:undefined}}</span>
                                    </div>
                                </div>
                            </TransitionGroup>
                        </ul>
                    </div>
                </Transition>

                <Transition name="up-profile-card-slide">
                    <SettingsComp 
                        v-show="showMenuSettings" 
                    ></SettingsComp>
                </Transition>
                    <ViewProfileComp 
                    v-show="showMenuMail" 
                    @showCreateMusicWindowFunction="() => {this.showCreateMusicWindow = true}"
                    @showDialogWindowCreatePlalistFunction="(value) => {this.showDialogCreatePlaylist = value}"
                    @showViewPlaylistCompFunction="(val) => {this.showViewPlaylistComp = val}"
                    @openChatIdFunction="(vlId, it) => {this.open_item_of_list_users(vlId, it)}"
                    ></ViewProfileComp>
                <Transition name="up-profile-card-slide">
                    <MusicMenuComp v-show="false"></MusicMenuComp>
                </Transition>

                <CreatePlaylistWindow 
                v-if="showDialogCreatePlaylist" 
                @closeCreateWindowPlaylistFunction="(value) => {this.showDialogCreatePlaylist = value}"
                ></CreatePlaylistWindow>

            </div>
        </div>
    </div>
</template>
<!-- :style="this.id_currect_user === item.id? {'background-color':'red'} : {'background-color':'rgba(10, 10, 10, 0.65)'}" -->
<!-- :class=" [ this.id_currect_user === item.id? testLink : ''] " -->

<script>
import ToastNotifyListComp from '@/components/ToastNotifyListComp.vue'
import NavigationComp from '@/components/NavigationComp.vue'
import ChatWindowComp from '@/components/ChatWindowCompFolder/ChatWindowComp.vue'
import AudioListComp from '@/components/AudioListComp.vue'
import PersonalAudioListComp from '@/components/PersonalAudioListComp.vue'
import SearchUsersBoxComp from '@/components/SearchUsersBoxComp.vue'
import SettingsComp from '@/components/SettingsComp.vue'
import ProfileCardComp from '@/components/ProfileCardComp.vue'
import ListAllUsersComp from '@/components/ListAllUsersCompFolder/ListAllUsersComp.vue'
import ViewProfileComp from '@/components/ViewProfileComp.vue'
import ViewPlaylistComp from '@/components/ViewPlaylistComp.vue'
import NotificationsComp from '@/components/NotificationsComp.vue'
import MusicMenuComp from '@/components/MusicMenuComp.vue'
import dialogWindow from '@/components/UI/dialogWindow.vue'
import CreateMusicWindow from '@/components/ModalWindows/CreateMusicWindow.vue'
import CreatePlaylistWindow from '@/components/ModalWindows/CreatePlaylistWindow.vue'
import dialogChatDeleted from '@/components/UI/dialogChatDeleted.vue'
import requestGetUsers from '@/hooks/hookRequestsToUser'
import hookBackChange from '@/hooks/hookBackgroundChange'
import ProfileOtherUser from '@/components/ProfileOtherUser.vue'
import { UserApi } from '@/api/UserController'
import { mapState, mapMutations } from 'vuex'
// import { ChatApi } from '@/api/ChatController'

export default {
    data() {
        return {
            localLoader: true,
            userId: localStorage.getItem('user-id') || null,
            i_user_to_id: null,
            show_list_all_users_comp: false,
            // Для установки бэкграунда по клику  на этот элмент
            id_currect_user: null,
            backcolorUserItemLink: 'selected-item-of-list-messages-teal',

            searchQuery: '',
            up: true,
            list_users: [],
            cleaningChatModel: 0,
            showSettingsChatId: false,
            showChatWindowComp: true,
            showNotificationComp: false,
            showMenuChats: true,
            showMenuMail: false,
            showMenuSettings: false,
            showMenuMusics: false,
            showCreateMusicWindow: false,
            showDialogWindowChatDeleted: false,
            showDialogCreatePlaylist: false,
            shiwMyMusic: false,
            showViewPlaylistComp: false,
            visibilityToastWindow: true,

        }
    },


    setup() {
        let {users_list, getUsers} = requestGetUsers()
        const {changeBack, imgs_path_list, getCookieValueByName} = hookBackChange()
        

        return {
            users_list,
            getUsers,
            changeBack,
            imgs_path_list,
            getCookieValueByName,
        }
    },


    mounted() {
        // Если в локал сторадже нету данного поля, то устанавливается значение по умолчанию -> так же если нету данного поля, то мы берем из базы данных текущего пользователя
        // и проверяем есть ли у него поле theme, если есть, то берем значение и устанавливаем его в lcStorage
        if(!localStorage.getItem('theme-schema')) localStorage.setItem('theme-schema', 'default')
        this.changeTheme(localStorage.getItem('theme-schema'))
        this.setbackcolorUserItem()

        this.$store.state.USERID = localStorage.getItem('user-id')
        if(this.getCookieValueByName('imgId') != '' && document.cookie) {
            document.body.style.backgroundImage = `url(${require('@/assets/' + this.imgs_path_list[this.getCookieValueByName('imgId')].img_path)})`
        } else { console.log('cookie is empty!') }
        const users = UserApi.getAllChats(this.userId)
        users.then(data => {
            this.list_users = data
            this.localLoader = false
        })
    },

    unmounted() {
        this.$store.state.USERID = null
    },

    computed: {
        filteredUsers() {
            if(this.searchQuery) {
                return this.list_users.filter(user => {
                    return user.name.includes(this.searchQuery)
                })
            }
            return this.list_users
        },
        ...mapState('themescontroller', {
            currTheme: 'currTheme',
        }),

        ...mapState( {
            showProfileOtherUser: 'showProfileOtherUser',
        })
    },

    watch: {
        currTheme: {
            handler() {
                this.setbackcolorUserItem()
            },
            deep: true,
        }
    },

    methods: {
        ...mapMutations('themescontroller', {
            changeTheme: 'changeTheme',
        }),

        ...mapMutations({
            changeShowProfileOtherUser: 'changeShowProfileOtherUser',
        }),

        test(vl, vl2) {
            console.log(vl, vl2, 'values');
        },

        setbackcolorUserItem() {
            switch (localStorage.getItem('theme-schema')) {
                case 'default':
                    this.backcolorUserItemLink = 'selected-item-of-list-messages-default'
                    break;
                case 'green':
                    this.backcolorUserItemLink = 'selected-item-of-list-messages-green'
                    break;
                case 'teal':
                    this.backcolorUserItemLink = 'selected-item-of-list-messages-teal'
                    break;
                case 'orange':
                    this.backcolorUserItemLink = 'selected-item-of-list-messages-orange'
                    break;
                case 'feolet':
                    this.backcolorUserItemLink = 'selected-item-of-list-messages-feolet'
                    break;
                case 'red':
                    this.backcolorUserItemLink = 'selected-item-of-list-messages-red'
                    break;
                default:
                    break;
            }
        },

        DialogMessageBoutDeletedChatFunc(value) {
            this.showDialogWindowChatDeleted = value
            this.cleaningChatModel++
            setTimeout(() => {
                this.showDialogWindowChatDeleted = false
            }, 3000);
        },

        // async getLastMessageWithItChat(item) {
        //     let lastMess = 'You dont to comunicated'
        //     await ChatApi.getChat({toID: item.id, fromID: this.userId}).then(data => {
        //         if(data.length != 0) {
        //             console.log(data[0].lastMessage, data[0], '0011')
        //             lastMess = data.lastMessage
        //         } else {
        //             console.log('chat not found')
        //             return
        //         }
        //     }).catch(err => {
        //         console.log(err)
        //     })

        //     console.log(lastMess)
        //     return lastMess
        // },

        updateUsersList() {
            const users = UserApi.getAllChats(this.userId)
            users.then( data => {
                this.list_users = data
            })
        },

        open_item_of_list_users(user_to_id, item) {
            const user_ = this.list_users.filter(user => user.id === user_to_id)
            this.$store.state.user_data = user_

            this.i_user_to_id = user_to_id
            this.id_currect_user = user_to_id
            this.$store.commit('changeProfile', item)
        },


        openMenu(id_) {
            switch (id_) {
                case 5:
                    this.showMenuMail = false
                    this.showMenuChats = false
                    this.showMenuSettings = false
                    this.showMenuMusics = false
                    this.showChatWindowComp = false
                    this.shiwMyMusic = true
                    break;
                case 0:
                    this.showMenuMail = true
                    this.showMenuChats = false
                    this.showMenuSettings = false
                    this.showMenuMusics = false
                    this.shiwMyMusic = false
                    break;
                case 1:
                    this.showMenuChats = true
                    this.showChatWindowComp = true
                    this.showMenuMail = false
                    this.showMenuSettings = false
                    this.showMenuMusics = false
                    this.shiwMyMusic = false
                    break;
                case 2:
                    this.showMenuSettings = true
                    this.showChatWindowComp = false
                    this.showMenuMail = false
                    this.showMenuChats = false
                    this.showMenuMusics = false
                    this.shiwMyMusic = false
                    break;
                case 3:
                    this.showMenuMusics = true
                    this.showChatWindowComp = false
                    this.showMenuSettings = false
                    this.showMenuMail = false
                    this.shiwMyMusic = false
                    this.showMenuChats = false
                    break;
                default:
                    break;
            }
        },

        slice_last_message(text) {
            if (!text) text = 'default message'
            var sliced = text.slice(0,40);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        },
    },

    components: 
    {
        NavigationComp, ChatWindowComp,
        SearchUsersBoxComp, SettingsComp,
        ProfileCardComp, ListAllUsersComp,
        ViewProfileComp, dialogWindow,
        AudioListComp, MusicMenuComp,
        NotificationsComp, dialogChatDeleted,
        CreateMusicWindow, CreatePlaylistWindow,
        PersonalAudioListComp,
        ViewPlaylistComp, ToastNotifyListComp,
        ProfileOtherUser,
    }

}

</script>

<style scoped lang="scss">

///////////////////////////////////// FOR THEME
.selected-item-of-list-messages-teal {
    background-color: teal !important;
}
.selected-item-of-list-messages-default {
    background-color: #1e1c1cc6 !important;
}.selected-item-of-list-messages-orange {
    background-color: #ff5900 !important;
}.selected-item-of-list-messages-feolet {
    background-color: #e100ff8e !important;
}.selected-item-of-list-messages-green {
    background-color: #00ff158e !important;
}.selected-item-of-list-messages-red {
    background-color: #ff0000c6 !important;
}
////////////////////////////////// FOR THEME

.backgroundColorWhite {
    background-color: azure;
}


.list-enter-active, .list-leave-active {
  transition: all 0.6s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}



$color-back: rgba(0, 0, 0, 0.8);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;
.block-settings {
    background: $color-back;
    border: $color-text;
}

.box-not-read-message {
    // background-color: #ff6600;
    display: flex;
    justify-content: end;
}

.count-not-read-message_ {
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    background-color: #00cec7;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
    color: black;
}

.main_div {
    width: 100%;
    height: 100vh;
    
    .global-content {
        width: 100%;
        height: 100vh;
        // background-color: blue;

        .right-block {
            width: 71%;
            height: 100vh;
            // background-color: aqua;
            float: right;
        }

        .left-block{
            width: 25%;
            height: 100vh;
            float: left;
            margin-left: 4%;
            border-right: 1px solid #111;

            .btn-add-new-contact-chat {
                    position: fixed;
                    width: 25%;
                    bottom: 0;
                    height: 40px;
                    background: rgba(7, 7, 7, 1);
                    display: flex;
                    padding: 10px;
                    align-items: center;
                    justify-content: center;
                    z-index: 11;

                    &:hover {
                        cursor: pointer;
                        border: 1px solid #00cec7;
                    }

                    .title-btn-new-cont {
                        color: #888;
                        font-family: Lato,sans-serif;
                        font-weight: 700;
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: .02em;
                        // background-image: linear-gradient(90deg, #00ff2a, #00e1ff);
                        // -webkit-background-clip: text;
                        // -webkit-text-fill-color: transparent;
                    }
                }

            

            .list-users{
                width: 100%;
                height: 100%;
                padding-top: 60px;
                overflow:auto;
                overflow-x: hidden;
                font-family: Lato,sans-serif;
                background: rgba(6, 6, 6, 1);
                backdrop-filter: blur(4.2px);
                -webkit-backdrop-filter: blur(4.2px);
                padding-bottom: 40px;
                // border-right: 1px solid rgba(21, 21, 21, 0.6);


                .item-list:hover {
                    background-color: rgba(48, 54, 54, 0.281);
                    }
                .item-list{
                    height: 60px;
                    color:white;
                    padding-left: 15px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    // background-color: rgba(10, 10, 10, 0.65);


                    span {
                        margin-right: 5px;
                    }

                    .name-and-img {
                        display: flex;
                        align-items: center;

                        :last-child {
                            font-size: 12px;
                            color: white;
                            margin-left: auto;
                        }


                        .box-img-and-toggle {
                            // width: 30px;
                            // height: 30px;
                            border-radius: 50%;

                            .toggle-online {
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                background: #00cec7;
                                position: fixed;
                            }

                            img {
                                width: 40px;
                                height: 40px;
                                margin-right: 5px;
                                border-radius: 50%;
                                // object-fit: contain;
                            }
                        }

                        span {
                            margin-right: 5px;
                            margin-left: 5px;                            
                        }
                    }

                    h6 {
                        margin-top: 5px;
                        margin-left: 35px;
                    }
                }
            }
        }
    }

}


@media screen and (max-width: 768px) {
.main_div .global-content .right-block{
        display: none;
        width: 0%;
        }
}

@media screen and (max-width: 768px) {
.main_div .global-content {
    .left-block {
        width: 90%;
        margin-left: 10%;

        .search-users {
            width: 90%;

            .inp-search {
                width: 100%;
            }
        }
        }
    }

}

.up-profile-card-slide-enter-active,
.up-profile-card-slide-leave-active {
  transition: all 0.4s ease-out;
}

.up-profile-card-slide-enter-from {
  opacity: 0;
//   transform: translateY(-100px);
}

.up-profile-card-slide-leave-to {
  opacity: 0;
//   transform: translateY(-100px);
}

.transition-notifi-comp-enter-active,
.transition-notifi-comp-leave-active {
  transition: opacity .3s ease;
}

.transition-notifi-comp-enter-from,
.transition-notifi-comp-leave-to {
  opacity: 0;
}


.lds-ripple {
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>