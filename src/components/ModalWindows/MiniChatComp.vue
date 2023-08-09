<template>
    <div class="main-con-mini-chat-window">

        <div class="title-mini-chat">
            <img :src="USERTO.img_url" alt="">
            <span style="color:white;">{{ USERTO.name || 'undefined'}}</span>
            <div class="bittle-juice">
                <img @click="() => {this.$emit('closeMiniChatCompFunction', false)}" src="@/assets/svgassets/icons8-удалить.svg" alt="">
            </div>
        </div>

        <div class="inner-container-mini-chate-window">
            <div class="bubble-card" v-for="element in listMessages" :key="element.id">
                <div class="message-bubble">
                    <div class="wrapper-class-bubble-message" v-bind:style="element.fromId === USERID ? {'float':'right', 'background-color' : 'rgba(0, 248, 248, 0.581)'} : {'float':'left'}">
                        <h6>{{ element.content }}</h6>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom-naviganor-mini-chat">
            <textarea type="text" id="inp-message-write-mini-chat" placeholder="write..." v-model="queryModel"></textarea>
            <div class="btn-send-message-0" @click="add_message"><img src="@/assets/sender.png" alt="send"></div>
        </div>
    </div>
</template>
<script>
import { MessagesApi } from '@/api/MessagesController';
export default {
    data() {
        return {
            USERID: localStorage.getItem('user-id'),
            listMessages: [],
            queryModel: '',
        }
    },

    props: {
        USERTO: {},
    },

    watch: {
        USERTO: {
            async handler(newValue) {
                const data_ = {
                    message_lst: this.listMessages,
                    toId: newValue.id,
                    fromId: this.USERID ? this.USERID : null,
                }
                await MessagesApi.getAllMessage(data_).then(arr => {
                    arr = arr.filter(message => {
                        return message.img_url === null
                    })
                    this.listMessages = arr
                }).catch(err => {
                    console.log(err)
                })
            },
            deep: true,
        }
    },

    methods: {
        async add_message() {
            const data_ = {
                message_lst: this.message_lst,
                toId: this.USERTO.id,
                fromId: this.USERID,
            }
            await MessagesApi.returnTotalNumberOfDocuments().then(async totalCountDocuments => {
                await MessagesApi.createMessage({
                    content: this.queryModel,
                    fromId: this.USERID,
                    toId: this.USERTO.id != null && this.USERTO.id != 0 ? this.USERTO.id : false,
                    size: new Blob([this.queryModel]).size,
                    result: true,
                    atCreated: new Date().toLocaleString(),
                    atUpdated: new Date().toLocaleString(),
                    view: false,
                    img_url: null,
                    img_name: null,
                    number_in_the_list: null,
                    totalCount: totalCountDocuments,
                }, data_).then(data => {
                    this.listMessages = data
                    console.log('send data now. ', this.USERTO, this.USERID)
                    this.queryModel = ''
                }).catch(err => {
                    console.log(err)
                })
            })


        },
    }

}
</script>
<style lang="scss" scoped>
.main-con-mini-chat-window {
    position: absolute;
    width: 450px;
    height: 650px;
    margin: 0;
    top: 55%;
    left: 82%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #030303, $alpha: .9);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    z-index: 102;
    padding-bottom: 30px;

    .bottom-naviganor-mini-chat {
        position: fixed;
        width: 100%;
        height: 30px;
        bottom: 0;
        background-color: #000000;
        padding: 5px;
        display: flex;
        align-items: center;
        flex-direction: row;

        #inp-message-write-mini-chat {
            width: 80%;
            height: 40px;
            resize: none;
            padding: 8px;
            color: wheat;
            outline: none;
            border: none;
            background: none;
            font-family: Lato,sans-serif;
            font-weight: 500;
            font-size: 11px;
            letter-spacing: .02em;
            color: white;
        }

        .btn-send-message-0 {
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            margin-right: 10px;
            background-color: rgba($color: #000000, $alpha: .8);
            color: wheat;
            font-family: Lato,sans-serif;
            font-weight: 500;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .02em;
            color: white;
            border-radius: 50%;
            float: right;

            img {
                width: 15px;
                height: 15px;
                border-radius: 50%;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }
    .title-mini-chat {
        position: fixed;
        width: 100%;
        height: 40px;
        background-color: rgba($color: #000000, $alpha: 1);
        display: flex;
        align-items: center;

        .bittle-juice {
            width: 100%;
            margin-right: 10px;
            text-align: end;
            font-size: 12px;
            display: flex;
            align-items: center;

            img {
                width: 14px;
                height: 14px;
                margin-left: auto;
                margin-right: 5px;
            }

            &:hover {
                cursor: pointer;
            }
        }

        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            float: left;
            margin-left: 10px;
        }

        span {
            margin-left: 8px;
        }
    }
    .inner-container-mini-chate-window {
        width: 100%;
        height: 100%;
        padding: 7px;
        padding-top: 40px;
        overflow: auto;

        .bubble-card {
            width: 100%;
            height: auto;
            display: grid;

            .message-bubble {
                width: 100%;
                height: auto;
                padding: 0 5px 0 5px;
                .wrapper-class-bubble-message {
                    margin-top: 10px;
                    border-radius: 15px;
                    color: rgb(232, 230, 230);
                    font-size: 18px;
                    background-color: rgba($color: #000000, $alpha: .8);
                    word-wrap: break-word;
                    width: auto;
                    max-width: 80%;
                    height: auto;
                    padding: 10px;

                    .data_time-class {
                        width: 25px;
                        height: 5px;
                        border-radius: 50%;
                        background-color: aqua;
                        float: right;
                        font-size: 18px;
                    }
                }
            }
        }

    }
}


</style>