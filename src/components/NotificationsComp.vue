<template>
    <div class="main-class-nitification-comp" id="window-notify">
        <div class="inner-container">

            <div class="left-block-content">
                <div class="title-block"><span>Notifications</span></div>
                <div class="list-items-ness">
                    <div
                    class="global-message"
                    v-for="item in list_items_mess" 
                    :key="item.id"
                    @click="showWindowById(item.id)"
                    ><div class="text-content-0"><span>{{ item.title }}</span></div></div>
                </div>
            </div>
            
            <div class="right-block-content-global-mess" v-if="showGlobalMessWindow">
                <div class="line-up-content">
                    <div class="close-btn" @click="() => {this.$emit('closeNotificationsCompFunction', false)}"><img src="@/assets/svgassets/icons8-удалить.svg" alt=""></div>
                    <div class="expend-window"><i class="fi fi-bs-expand"></i></div>
                </div>
                <div class="no-message" v-if="noMessage && systemMessagesList.length === 0"><span>You don't have system notifications</span></div>
            </div>

            <div class="right-block-content-request-mess" v-if="showRequestMessWindow">
                <div class="line-up-content">
                    <div class="title-box"><span>list messages</span></div>
                    <div class="wrapper-boc">
                        <div v-if="visibilityExpand" class="expend-window" @click="setLocalProperty"><img src="@/assets/svgassets/icons8-expand-64.png" alt=""></div>
                        <div v-else class="compress" @click="setLocalPropertyEpress"><img src="@/assets/svgassets/icons8-minimize-keep-down-reduce-button-decrease-screen-size-shrink-96.png" alt=""></div>
                        <div class="close-btn" @click="() => {this.$emit('closeNotificationsCompFunction', false)}"><img src="@/assets/svgassets/icons8-удалить.svg" alt=""></div>
                    </div>
                </div>
                <div class="list-messages-of-request">

                    <Transition name="transition-show-tools">
                        <div class="line-useful-tools" v-if="SelectedMessagesList.length > 0">
                            <div class="wrapper-tools">
                                <div class="btn-select-all" @click="selectAll">select all</div>
                                <div class="btn-delete-all" @click="deleteSelectedNotify">delete</div>
                            </div>
                            <div class="wrapper-settings-window">
                                <div class="close" @click="() => {this.SelectedMessagesList = []}">cancel</div>
                                <div class="settings"><i class="fi fi-bs-settings"></i></div>
                            </div>
                        </div>
                    </Transition>

                    <transition-group name="bounce-item-notify">
                        <div class="message-box" 
                            v-for="message in list_requests" 
                            :key="message.id" 
                            :style="message.status ? 
                            {'border-left' : '5px solid teal'} : {'border' : '1px solid #333'}"
                        >
                            <div class="check-box-bpx">
                                <input type="checkbox" name="" id="check-id" :value="message.id" v-model="SelectedMessagesList" class="checkbox-class">
                            </div>
    
                            <div class="wrapper-container-mess-box">
                                <div class="fromWhoMessage-box"><span>{{ message.fromID }}</span></div>
                                <div class="text-message-box"><span>{{ message.priviewMessage }}</span></div>
                            </div>
    
                            <div class="wrapper-container-btns">
                                <div class="btn-success-accept-box" @click="addToChat_createChat_send_notify(message)"><span>Accept</span></div>
                                <div class="btn-fail-no-accept-box" @click="deleteAndNotify(message.id, message.fromID)"><span>Cancel</span></div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { NotifyApi } from '@/api/NotificationController'
import { UserApi } from '@/api/UserController'
import { ChatApi } from '@/api/ChatController'
export default {
    data() {
        return {
            USERID: localStorage.getItem('user-id'),
            list_items_mess: [
                {id: 0, title: 'Системные сообщения'},
                {id: 1, title: 'Заявки и запросы'}
            ],
            list_requests: [],
            systemMessagesList: [],
            noMessage: true,
            SelectedMessagesList: [],
            showGlobalMessWindow: false,
            showRequestMessWindow: true,
            visibilityExpand: true,
        }
    },

    watch: {
        SelectedMessagesList: {
            handler(newValue) {
                if(newValue.length > 0)
                {
                    console.log('newValue more zero')
                }
                else
                {
                    console.log('newValue less zero')
                }
            },
            deep: true,
        }
    },

    mounted() {
        NotifyApi.getAllNotifictions({toID: this.USERID}).then(NotifyList => {
            this.list_requests = NotifyList
        }).catch(err => {
            console.log(err)
        })
        let modeWindow = localStorage.getItem('modeWinowNotify')
        let wind = document.getElementById('window-notify')
        if (modeWindow === 'expand')
        {
            wind.style.width = '100%'
            wind.style.height = '100%'
            console.log('window been expanded')
            this.visibilityExpand = false
        } else {
            wind.style.width = '1200px'
            wind.style.height = '600px'
            this.visibilityExpand = true
        }
    },

    methods: {
        setLocalProperty() {
            localStorage.setItem('modeWinowNotify', 'expand')
            let wind = document.getElementById('window-notify')
            wind.style.width = '100%'
            wind.style.height = '100%'
            this.visibilityExpand = false
        },

        setLocalPropertyEpress() {
            localStorage.setItem('modeWinowNotify', 'copmress')
            let wind = document.getElementById('window-notify')
            wind.style.width = '1200px'
            wind.style.height = '600px'
            this.visibilityExpand = true
        },

 // Локальные методы, local mutations
        updateList() {
            NotifyApi.getAllNotifictions({toID: this.USERID}).then(notiftList => {
                this.list_requests = notiftList
            })
        },

        sendNotify(fromID) {
            const data = {
                toID: fromID,
                fromID: this.USERID,
                priviewMessage: 'your requests been cancel'
            }
            NotifyApi.sendNotify(data).then( () => {
                console.log('notify deleted +++')
            }).catch(err => {
                console.log(err)
            })
        },

// конец локальных методов end of local mutations

        deleteSelectedNotify() {
            if(this.SelectedMessagesList.length > 0)
            {
                NotifyApi.deleteNotificationsSelected(this.SelectedMessagesList)
                this.updateList()
                console.log('all selected notify been deleted')
            }
        },

        deleteAndNotify(id, fromID) {
            if(id)
            {
                NotifyApi.deleteNotifications(id)
                this.updateList()
                if(fromID)
                {
                    this.sendNotify(fromID)
                    console.log('selected notify been deleted', 'from: ' + fromID, 'id notify: ' + id)
                }
            }
            else
            {
                console.log('id is empty')
            }
        },

        selectAll() {
            let checkboxes = document.getElementsByClassName('checkbox-class')
            if (checkboxes.length != 0)
            {
                for (let index = 0; index < checkboxes.length; index++) {
                    const element = checkboxes[index];
                    element.checked = true
                }
                console.log(checkboxes)
            }

        },

        async addToChat_createChat_send_notify(message) {
            UserApi.addUserToChats(message.toID, message.fromID)
            UserApi.addUserToChats(message.fromID, message.toID)
            await ChatApi.createChat({toID: message.toID, fromID: message.fromID}).then((result) => {
                if(result === false) {console.log('chat is already exits'); return}
                console.log('chat success created')
            }).catch(err => {
                console.log(err)
            })
            this.$emit('updateUsersListFunction')
        },
        
        showWindowById(id) {
            console.log(id)
            if(id != null) {

                if(id === 0) {
                    this.showRequestMessWindow = false,
                    this.showGlobalMessWindow = true
                }

                if(id === 1) {
                    this.showGlobalMessWindow = false,
                    this.showRequestMessWindow = true
                }

            }
        },
    },
    component: {}
}
</script>
<style lang="scss" scoped>

.main-class-nitification-comp {
    width: 1200px;
    height: 600px;
    background-color: rgba($color: #030303, $alpha: 1);
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    z-index: 101;
    // border: 1px solid #333;

    font-family: Lato,sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;
    .inner-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;

        .left-block-content {
            width: 20%;
            height: 100%;
            padding: 10px;

            .title-block {
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                width: 100%;
            }
            
            .list-items-ness {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: white;
                .global-message {
                    margin-top: 10px;
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #333;
                    background-color: rgba($color: #000000, $alpha: 1.0);
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        cursor: pointer;
                        background-color: rgba($color: #0e0e0e, $alpha: 1.0);
                    }
    
                    .text-content-0 {
    
                    }
                }

            }
            
        }

        .right-block-content-global-mess {
            width: 80%;
            height: 100%;
            padding: 10px;
            // background-color: yellow;
            // display: flex;
            // flex-direction: column;

            .no-message {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                // background-color: red;
                color: white;
                font-size: 16px;
            }

            .line-up-content {
                width: 100%;
                height: auto;
                color: white;
                font-size: 12px;
                padding-top: 5px;

    
                .expend-window {
                    float: right;
                    margin-right: 10px;
    
                    &:hover {
                        cursor: pointer;
                        opacity: 0.8;
                        transition: .3s;
                    }
                }
    
                .close-btn {
                    float: right;
                    margin-right: 10px;

                    img {
                        width: 14px;
                        height: 14px;
                    }
    
                    &:hover {
                        cursor: pointer;
                        opacity: 0.8;
                        transition: .3s;
                    }
                }
            }

        }

        .right-block-content-request-mess {
            width: 80%;
            height: 100%;
            padding: 10px;
            // background-color: red;

            .list-messages-of-request {
                width: 100%;
                height: 98%;
                // margin-top: 10px;
                padding: 10px;

                .line-useful-tools {
                    width: 100%;
                    height: 40px;
                    border: 1px solid #333;
                    color: white;
                    display: flex;


                    .wrapper-tools {
                        height: 100%;
                        width: 15%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-left: 10px;
                        // background-color: yellow;

                        .btn-select-all {
                            padding: 5px;
                            border: 1px solid #333;

                            &:hover {
                                cursor: pointer;
                                border: 1px solid teal;
                            }
                            
                        }

                        .btn-delete-all {
                            padding: 5px;
                            border: 1px solid #333;

                            &:hover {
                                cursor: pointer;
                                border: 1px solid teal;
                            }
                        }
                    }
                    .wrapper-settings-window {
                        margin-left: auto;
                        width: 10%;
                        height: 100%;
                        // background-color: red;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .close {
                            padding: 5px;
                            border: 1px solid #333;

                            &:hover {
                                cursor: pointer;
                                border: 1px solid red;
                            }
                        }

                        .settings {
                            padding: 5px;
                            // border: 1px solid #333;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            margin-right: 5px;

                            &:hover {
                                cursor: pointer;
                                opacity: .7;
                                transition: .3s;
                            }

                            i {
                                margin-top: 4px;
                            }
                        }
                    }
                }

                .message-box {
                    width: 100%;
                    padding: 10px;
                    background-color: rgba($color: #000000, $alpha: 1.0);
                    color: white;
                    margin-top: 15px;
                    height: 50px;
                    border: 1px solid #333;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .check-box-bpx {
                        width: 20px;

                        input {
                            padding: 4px;
                            color: white;
                            background: none;
                        }

                    }

                    .wrapper-container-mess-box {
                        width: 70%;
                        display: flex;
                        .fromWhoMessage-box {
                            border-right: 1px solid #333;
                            padding-right: 20px;
                            span {
    
                            }
                        }
    
                        .text-message-box {
                            margin-left: 20px;
                            span { color: white; }
    
                        }
                    }

                    .wrapper-container-btns {
                        width: 20%;
                        display: flex;
                        justify-content: flex-end;
                        .btn-success-accept-box {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 8px;
                            border: 1px solid #333;

                            &:hover {
                                cursor: pointer;
                                background-color: rgba($color: #000000, $alpha: 1.0);
                                border: 1px solid teal;
                                transition: .1s;
                            }
                        }
    
                        .btn-fail-no-accept-box {
                            margin-left: 10px;
                            padding: 8px;
                            border: 1px solid #333;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            &:hover {
                                cursor: pointer;
                                background-color: rgba($color: #000000, $alpha: 1.0);
                                border: 1px solid red;
                                transition: .1s;
                            }
                        }
                    }

                }
                
            }

            .line-up-content {
                width: 100%;
                height: auto;
                color: white;
                font-size: 12px;
                padding-top: 5px;
                display: flex;
                align-items: center;
                justify-content: center;

                .title-box {
                    margin-left: auto;
                }

                .wrapper-boc {
                    margin-left: auto;
                    display: flex;

                    img {
                        width: 14px;
                        height: 14px;
                    }
                    .compress {
                        margin-right: 10px;
                        
                        &:hover {
                            cursor: pointer;
                            opacity: 0.8;
                            transition: .3s;
                        }
                    }
                    .expend-window {
                        margin-right: 10px;
        
                        &:hover {
                            cursor: pointer;
                            opacity: 0.8;
                            transition: .3s;
                        }
                    }
        
                    .close-btn {
                        margin-right: 10px;

                        img {
                            width: 14px;
                            height: 14px;
                        }
        
                        &:hover {
                            cursor: pointer;
                            opacity: 0.8;
                            transition: .3s;
                        }
                    }

                }
    
            }
        }

    }
}

.transition-show-tools-enter-active,
.transition-show-tools-leave-active {
//   transition: opacity .8s ease;
  transition: all 0.15s ease-out;

  transform: translateY(5px);
}

.transition-show-tools-enter-from,
.transition-show-tools-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}



.bounce-item-notify-enter-active {
  animation: bounce-in .3s ease-out both;
}

.bounce-item-notify-leave-active {
  animation: bounce-in .3s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);
  }
}

</style>