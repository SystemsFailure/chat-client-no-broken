<template>
    <Transition name="transitionCustomWindow">
        <customNotifyWindow v-if="showCustomDialogWindow" v-bind:modalText="'Request was sent successfully'"></customNotifyWindow>
    </Transition>
    <div class="main-list-users-comp">
        <div class="inside-container-content">
            <div class="slose-btn-box"><img src="@/assets/svgassets/icons8-удалить.svg" alt="" @click="() => {this.$emit('closeListUsersCompFunction', false)}"></div>
            <div class="title-comp"><span>Search users</span></div>

            <div class="inside-box">

                <div class="left-box-list-users">

                    <SearchUsersBoxComp v-if="false" style="width: 65%; border: none; background:none;border-left: 1px solid teal;"></SearchUsersBoxComp>

                    <div class="inp-searching">
                        <input id="inp-search-uid" type="text" placeholder="search by name" v-model="searchParam" @keydown="searchingUsersByCurrentParams($event)">
                    </div>

                    <div class="lst-box">
                        <div class="items-box" v-for="user in list_users_computedProp" :key="user.id">
                            <div class="wrapper-x-box">
                                <div class="image-box">
                                    <img :src="user.img_url || require('@/assets/user_profile.png')" alt="" srcset="">
                                </div>
                                <div class="name-box">{{user.name}}</div>

                                <div class="btn-add-fr" @click="addUserMe(user)">
                                    {{'add to chats'}}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="right-box-conf-sorted">
                    <div class="title-container"><span>sorted configuration</span></div>

                    <div class="sett-container">
                        <div class="a-box">
                            <div class="title-conf-func"><span>Contry</span></div>
                            <div class="one-top-inp">
                                <select name="" id="selec-id-a" style="border-left: 1px solid teal;" @change="updatefieldAtributes($event, 'country')">
                                    <option value="USA">USA</option>
                                    <option value="Brasilian">Brasialia</option>
                                    <option value="Germany">Germany</option>
                                </select>
                            </div>

                            <div class="two-block-functionality">
                                <div class="one1-block">
                                    <div class="title-block"><span>followers by</span></div>
                                    <div class="inp-block">
                                        <input type="number" id="selec-id-b" placeholder="by 0" style="border-left: 1px solid teal;" v-model.number="atributesSort.followersBy">
                                    </div>
                                </div>
                                <div class="two2-block">
                                    <div class="title-block"><span>followers to</span></div>
                                    <div class="inp-block">
                                        <input type="number" id="selec-id-b" placeholder="to infinity" style="border-left: 1px solid teal;" v-model.number="atributesSort.followersTo">
                                    </div>
                                </div>

                            </div>

                            <div class="three-block-functionality">
                                <div class="title-block-c"><span>name</span></div>
                                <div class="inp-block-three">
                                    <select name="" id="selec-id-c" v-model="atributesSort.sortByName">
                                        <option value="asc">asc</option>
                                        <option value="desc">desc</option>
                                    </select>
                                </div>
                            </div>

                            <div class="three-block-functionality">
                                <div class="title-block-c"><span>online</span></div>
                                <div class="inp-block-three">
                                    <select name="" id="selec-id-c" v-model="atributesSort.online">
                                        <option value="online">online</option>
                                        <option value="offline">offline</option>
                                    </select>
                                </div>
                            </div>

                            <div class="three-block-functionality">
                                <div class="inp-block-three">
                                    <div name="" id="selec-id-btn" @click="sortSearchUser">
                                        Confirm
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import SearchUsersBoxComp from '@/components/SearchUsersBoxComp.vue';
import customNotifyWindow from '@/components/UI/customNotifyWindow.vue'
import { UserApi } from '@/api/UserController';
import { NotifyApi } from '@/api/NotificationController'
import IError from '@/IError';
import globalSearching from '@/api/globalSearching';

export default {
    data() {
        return {
            list_users: [],
            searchParam: '',
            IUserId: localStorage.getItem('user-id') || null,
            allSettingsForSortingAndFilter: [
                {},
            ],
            showCustomDialogWindow: false,

            atributesSort: {
                country: 'USA',
                followersBy: 0,
                followersTo: 1,
                sortByName: 'asc',
                online: 'online',
            }
        };
    },

    computed: {
        list_users_computedProp: function () {
            return this.list_users
        }
    },

    mounted() {
        this.filterAllUsers()
    },

    methods: {
        updatefieldAtributes(event, key) {
            this.atributesSort[key] = event.target?.value
        },
        async sortSearchUser() {
            console.log(this.atributesSort)
            let found_users = await globalSearching.globalSorted(this.atributesSort)
            this.list_users = found_users
        },

        async searchingUsersByCurrentParams(event) {
            if(event.keyCode === 13) {
                // Search users by name
                if(this.searchParam.length != 0 && this.searchParam != '') {
                    let inp_doc = document.getElementById('inp-search-uid')
                    if(!inp_doc) {console.log('not found input element'); return;}
                    if(inp_doc.focus) {
                                let found_users = await globalSearching.search_users_by_name(this.searchParam)
                                if(found_users.length === 0) {console.log('so user with name: ' + `${this.searchParam}` + ' not found'); return;}
                                else this.list_users = found_users
                    } else {
                        console.log('no focus')
                    }
                } else {
                    this.filterAllUsers()
                    alert('You writed not valid of data')
                }
            }
        },
        async filterAllUsers() {
            await UserApi.getAllUsers().then(async array => {
                await UserApi.getUserById(this.IUserId).then(user => {
                    if (!user.data().arrayChats) {
                        console.log('arrayChats not work')
                        return
                    }
                    if (user.data().arrayChats.length === 0) this.list_users = array
                    this.list_users = array.filter(globalUser => user.data().arrayChats.indexOf(globalUser.id) == -1)
                })
            })
        },

        addUserMe(user) {
            if(user) {
                if(!this.IUserId) return IError('error -> from ListUsersComp')
                const data = {
                    toID: user.id,
                    fromID: this.IUserId,
                    priviewMessage: 'Hi, do you want to comunicated with me?'
                }
                NotifyApi.sendNotify(data)
                    .then( () => {
                        this.showCustomDialogWindow = true
                        setTimeout( () => {
                            this.showCustomDialogWindow = false
                        }, 2500)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                return false
            }
        },
    },
    components: { SearchUsersBoxComp, customNotifyWindow }
}
</script>
<style lang="scss" scoped>

.main-list-users-comp {
    // position: fixed;
    position: absolute;
    width: 900px;
    height: 600px;
    background-color: rgba($color: #0f0e0e, $alpha: 1);
    z-index: 11;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);

    background: rgba(10, 10, 10, 0.65);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);

    padding: 0px 15px 15px 15px;
    .inside-container-content {
        width: 100%;
        height: 100%;
        // background-color: black;

        .inside-box {
            // margin-top: 20px;
            width: 100%;
            height: calc(100% - 75px - 50px);
            // background-color: aquamarine;
            display: flex;
            .left-box-list-users {
                width: 70%;
                height: 100%;
                margin-top: 28px;

                .inp-searching {
                    width: 100%;
                    height: 50px;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // background-color: red;

                    #inp-search-uid {
                        width: 100%;
                        padding: 10px;
                        background: none;
                        outline: none;
                        color: #fff;
                        border: 1px solid #222;
                    }
                    
                }

                .lst-box {
                    width: 100%;
                    height: 100%;
                    // background-color: aquamarine;
                    padding: 10px;
                    overflow: auto;
                    .items-box {
                        width: 100%;
                        height: auto;
                        margin-top: 8px;
                        background-color: rgba($color: #080707, $alpha: .6);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 10px;


                        .wrapper-x-box {
                            width: 100%;
                            display: flex;
                            align-items: center;

                            &:hover {
                                cursor: pointer;
                            }

                            .image-box {

                                img {
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                }
                            }

                            .name-box {
                                margin-left: 8px;

                            }

                            .btn-add-fr {
                                width: 100px;
                                height: 30px;
                                border: 1px solid #787d82;
                                margin-left: auto;

                                display: flex;
                                align-items: center;
                                justify-content: center;

                                color: #787d82;
                                font-family: Lato,sans-serif;
                                font-weight: 700;
                                font-size: 10px;
                                text-transform: uppercase;
                                letter-spacing: .02em;
                                &:hover {
                                    cursor: pointer;
                                    opacity: .7;
                                }
                            }
                        }
                    }
                }
            }

            .right-box-conf-sorted {
                width: 30%;
                height: 100%;
                // background-color: greenyellow;


                .sett-container {
                    width: 100%;
                    height: 100%;
                    // background-color: red;
                    padding: 10px;

                    display: flex;
                    align-items: center;
                    flex-direction: column;


                    .a-box {
                        width: 100%;
                        height: 100%;
                        // background: rgba(10, 10, 10, 0.65);
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        backdrop-filter: blur(4.2px);
                        -webkit-backdrop-filter: blur(4.2px);
                        padding: 15px;


                        .three-block-functionality {
                            width: 100%;
                            // background-color: #333;
                            margin-top: 10px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            
                            .title-block-c {
                                margin-bottom: 10px;

                                span {
                                    color: #787d82;
                                    font-family: Lato,sans-serif;
                                    font-weight: 700;
                                    font-size: 12px;
                                    text-transform: uppercase;
                                    letter-spacing: .02em;
                                }
                            }
                            .inp-block-three {
                                width: 100%;
                                
                                display: flex;
                                justify-content: center;

                                select {
                                    width: 100%;
                                    // background: #242424;
                                    // border: 1px solid var(--vt-c-divider);
                                    background: none;
                                    border:1px solid rgba($color: #787d82, $alpha: .6);
                                    padding: 8px;
                                    color: white;
                                    outline: none;
                                    border-left: 1px solid teal;
                                }

                                #selec-id-btn {
                                    width: 80%;
                                    height: 30px;
                                    // background-color: #242424;
                                    background: none;
                                    border:1px solid rgba($color: #787d82, $alpha: .6);
                                    color: #787d82;
                                    font-family: Lato,sans-serif;
                                    font-weight: 700;
                                    font-size: 12px;
                                    text-transform: uppercase;
                                    letter-spacing: .02em;

                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 40px;
                                    border-left: 1px solid teal;
                                    border-right: 1px solid teal;


                                    &:hover {
                                        cursor: pointer;
                                        opacity: .8;
                                    }
                                }
                            }
                        }

                        .two-block-functionality {
                            width: 100%;
                            // background-color: #09090a;
                            margin-top: 10px;
                            display: flex;
                            align-items: center;

                            .one1-block {
                                width: 50%;

                                
                                #selec-id-b {
                                    width: 90%;
                                    background: none;
                                    border:1px solid rgba($color: #787d82, $alpha: .6);
                                    // border: 1px solid var(--vt-c-divider);
                                    padding: 8px;
                                    color: white;
                                    outline: none;
                                }
                            }

                            .two2-block {
                                width: 50%;

                                                        
                                #selec-id-b {
                                    width: 100%;
                                    background: none;
                                    border:1px solid rgba($color: #787d82, $alpha: .6);
                                    // border: 1px solid var(--vt-c-divider);
                                    padding: 8px;
                                    color: white;
                                    outline: none;
                                }
                            }

                            .title-block {
                                margin-bottom: 10px;
                                span {
                                    color: #787d82;
                                    font-family: Lato,sans-serif;
                                    font-weight: 700;
                                    font-size: 12px;
                                    text-transform: uppercase;
                                    letter-spacing: .02em;
                                }

                                .inp-block {
                                    width: 100%;
                                }
                            }
                        }



                        .title-conf-func {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-bottom: 8px;
                            
                            span {
                                color: #787d82;
                                font-family: Lato,sans-serif;
                                font-weight: 700;
                                font-size: 12px;
                                text-transform: uppercase;
                                letter-spacing: .02em;
                            }
                        }

                        .one-top-inp {
                            width: 100%;
                            height: 50px;
                            display: flex;


                            #selec-id-a {
                                width: 100%;
                                // background: #242424;
                                background: none;
                                border:1px solid rgba($color: #787d82, $alpha: .6);

                                // border: 1px solid var(--vt-c-divider);
                                padding: 8px;
                                color: white;
                                outline: none;

                                option {
                                    background: none;
                                    color: black

                                    // padding: 8px;
                                }
                            }
                        }
                    }
                }

                .title-container {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-family: Lato,sans-serif;
                    font-weight: bold;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: .02em;
                }
            }

        }

        .slose-btn-box {
            display: flex;
            align-items: center;
            justify-content: end;

            padding-top: 20px;
            padding-right: 8px;
            font-size: 12px;
            color: white;

            img {
                width: 14px;
                height: 14px;
            }

            &:hover {
                cursor: pointer;
                opacity: .8;
                transition: .1s;
            }
        }

        .title-comp {
            // margin-top: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Lato,sans-serif;
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .02em;
        }
    }
}
.transitionCustomWindow-enter-active,
.transitionCustomWindow-leave-active {
  transition: all opacity .45s ease;
  transform: translateX(20px);
}

.transitionCustomWindow-enter-from,
.transitionCustomWindow-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>