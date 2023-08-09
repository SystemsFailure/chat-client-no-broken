<template>
    <div class="main-sett-chat-id-comp">
        <div class="sett-chat-id-content">

            <div class="items-content-settings">
                <div></div>
                <div class="view-profile item-setting"><img src="@/assets/svgassets/icons8-user-67.png" alt=""><h4>View profile</h4></div>
                <div class="unmute item-setting" @click="this.MuteActive = !this.MuteActive"><img src="@/assets/svgassets/icons8-средняя-громкость-100.png" :class="{'mute-active' : MuteActive}" alt=""><h4 :class="{'mute-active' : MuteActive}">Mute</h4></div>
                <div class="copy-link item-setting"><img src="@/assets/svgassets/icons8-скопировать-фигуру-96.png" alt=""><h4>Copy link</h4></div>
                <div class="clear-chat item-setting" @click="() => {this.$store.commit('changeDialogValue')}"><img src="@/assets/svgassets/icons8-удалить-навсегда-90-rd.png" alt=""><h4>Clear chat</h4></div>
                <div class="clear-chat leave-app item-setting" @click="leaveApp"><img src="@/assets/svgassets/icons8-экспорт-100.png" alt=""><h4>Leave</h4></div>
            </div>

        </div>
    </div>
</template>

<script>
import AuthApi from '@/api/AuthController';
export default {
    data() {
        return {
            MuteActive: false,
        }
    },

    methods: {
        leaveApp() {
            AuthApi.signout()
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped lang="scss">
.mute-active {
    color: #00cec7;
}

.main-sett-chat-id-comp {
    margin-top: 5px;
    position: fixed;
    width: 200px;
    // height: 300px;
    right: 0;
    z-index: 100;
    transform: translateX(-15px);

    background-color: rgba(10, 10, 10, 1);
    padding: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    // border: 1px solid rgba(255, 255, 255, 0.3);

    .sett-chat-id-content {
        font-family: Lato,sans-serif;
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: .02em;

        
        .items-content-settings {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;

            .item-setting {
                width: 100%;
                padding: 10px;
                color:white;
                font-weight: bold;
                display: flex;
                align-items: center;
                // justify-content: center;

                img {
                    width: 14px;
                    height: 14px;
                    margin-bottom: 3px;
                }

                // background-color: rgba(10, 10, 10, 0.65);

                // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                // backdrop-filter: blur(8.2px);
                // -webkit-backdrop-filter: blur(8.2px);
                // border: 1px solid rgba(255, 255, 255, 0.3);
                // margin-top: 10px;
                // display: flex;
                // justify-content: center;

                h4 {
                    margin-left: 8px;
                }
            }

            .clear-chat {
                color: rgb(255, 31, 31);
            }

            .leave-app {
                color: rgba($color: #00ffee, $alpha: 1.0)
            }
            .item-setting:hover {
                cursor: pointer;
                opacity: 0.6;
                // background:#00cec7;
                background-color: rgba(0, 0, 0, 0.1);
            }

        }
    }
}


</style>