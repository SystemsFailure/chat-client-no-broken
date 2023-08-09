<template>

<div class="main-banner-up">
    <div class="content">

        <div class="user-box" @click="showOrHideProfile_" v-if="$store.state.user_data.length != 0">
            <h6 style="color:white;">{{$store.state.user_data[0].name}}</h6>
            <div class="recently-ok" style="color:white; font-size: 12px;">{{ $store.state.user_data[0].online ? 'online' : 'seen at 9:46' }}</div>
        </div>

        <MusicUnixSystem></MusicUnixSystem>
        <div class="banner" :style="$store.state.user_data.length === 0 ? {'width' : '100%'} : {'width' : '30%'}">
            <div class="notifycation-container">
                <div class="nityfy-iecon">
                    <i class="fi fi-bs-bell" @click="() => {this.$emit('showNotificationWindowFunction', true)}">
                        <img src="@/assets/svgassets/icons8-почта-50.png" alt="" @click="() => {this.$emit('showNotificationWindowFunction', true)}">
                        <div class="cycle-box"></div>
                    </i>
                </div>
            </div>
            <div class="settings-chatId" @click="change">
                <div class="item-round-i"></div>
                <div class="item-round-i"></div>
                <div class="item-round-i"></div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import MusicUnixSystem from '@/components/ModalWindows/MusicUnixSystem.vue'
export default {
    data() {
        return {
            showSettingsChatId: false,
            user_id: localStorage.getItem('user-id'),
        }
    },
    methods: {
        change() {
            this.showSettingsChatId = !this.showSettingsChatId
            this.$emit('showOrHideSettingChatId', this.showSettingsChatId)
        },
        showOrHideProfile_() {
            this.$store.commit('showEventMutation')
        },
    },

    components: {
        MusicUnixSystem
    }
}
</script>

<style scoped lang="scss">

$color-back: rgba(0, 0, 0, 0.7);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;

.main-banner-up {
    position: fixed;
    width: 71%;
    height: 60px;
    display: flex;
    align-items: center;
    background: rgb(7, 7, 7);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-bottom: 1px solid rgba(30, 30, 30, 0.6);
    z-index: 5;

    .content {
        width: 100%;
        height: 50px;
        display:flex;
        align-items: center;
        justify-content: space-between;

        .banner {
            float: right;
            width: 30%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: end;

            .notifycation-container {
                width: 100%;
                // background-color: red;
                height: 100%;

                .nityfy-iecon {
                    // background-color: red;
                    height: 100%;
                    width: auto;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-right: 20px;
                    color: white;
                    font-size: 18px;

                    i {
                        font-size: 0px;
                        img {
                            position: relative;
                            width: 16px;
                            height: 16px;
                            &:hover {
                                cursor: pointer;
                                opacity: .8;
                            }
                        }
                        .cycle-box {
                            position: absolute;
                            transform: translateY(-16px) translateX(12px);
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background-color: #00cec7;
    
                        }
                    }



                }
            }
            .settings-chatId {
                margin-left: auto;
                height: 30px;
                // background: #00cec7;
                margin-right: 10px;


                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                padding: 5px;
                .item-round-i {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: white;
                }
            }
            .settings-chatId:hover {
                    opacity: 0.4;
                    cursor: pointer;
                }
        }

        .user-box:hover {
            cursor: pointer;
            opacity: 0.7;
        }

        .user-box {
            margin-left: 10px;
            width: 150px;
            height: 40px;
            display:flex;
            flex-direction: column;
            justify-content: center;
            padding-right: 10px;

            h6 {
                font-size: 11px;
            }
        }

        .navigation-menu-modes-box {
            height: 40px;
            width: 40%;
            margin-left: 10px;
            border-left: 1px solid rgba(255, 255, 255, 0.3);

            .content-box0 {
                // background-color: #ff6600;
                width: auto;
                height: 40px;
                display: flex;

                .modes-boxes:hover {
                    border-bottom: 1px solid wheat;
                    cursor: pointer;
                }
                .modes-boxes {
                    display: flex;
                    align-items: center;
                    color: wheat;
                // background-color: #00cec7;
                width: auto;
                padding: 5px;
                height: 40px;
                margin-left: 10px;
            }
            }
        }
    }
}

</style>