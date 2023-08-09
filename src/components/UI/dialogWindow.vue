<template>
    <div class="main-window-dialog">
        <div class="inner-container">


            <div class="title-cont"><span style="font-size:9px;">Do you wan't to delete message?</span></div>

            <div class="wrapper">
                <div class="yes-confirm" @click="clearChat"><span style="font-size:9px;">OK</span></div>
                <div class="no-confirm" @click="() => {this.$store.state.showDialogDeleteWindow = false}"><span style="font-size:9px;">NO</span></div>
            </div>

        </div>
    </div>
</template>

<script>
import { MessagesApi } from '@/api/MessagesController';
export default {
    data() {
        return {
            USERID: localStorage.getItem('user-id')
        }
    },
    methods: {
        clearChat() {
            MessagesApi.deleteAllMessages(this.USERID)
            this.$store.state.showDialogDeleteWindow = false
            this.$emit('ShowOrCloseDialogWindowChatDeletedFunction', true)
            setTimeout(() => {
                this.$emit('CloseDialogWindowChatDeletedFunction', false)
            }, 3000);
        },
    },
}
</script>

<style lang="scss" scoped>
.main-window-dialog {
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 100px;
    position: absolute;

    border: 1px solid #787d82;
    color: #787d82;
    font-family: Lato,sans-serif;
    font-weight: 500;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: .02em;
    z-index: 101;

    background-color: rgba($color: #000000, $alpha: .9);
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);

    .inner-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;

        .title-cont {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }


        .wrapper {
            margin-top: 20px;
            width: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            .no-confirm {
                width: 60px;
                height: 20px;
                border: 1px solid #787d82;
                margin-left: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
    
                &:hover {
                    cursor: pointer;
                    border: 1px solid #00cec7;
    
                }
            }
            .yes-confirm {
                width: 60px;
                height: 20px;
                border: 1px solid #787d82;
                display: flex;
                justify-content: center;
                align-items: center;
                
                &:hover {
                    cursor: pointer;
                    border: 1px solid #00cec7;
                }
            }
        }
    }
}
</style>