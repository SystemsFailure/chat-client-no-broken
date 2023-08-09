<template>
    <div class="toasts-notify-class" @click="add">
        <div class="outside">
            <div class="list">
                <div 
                    class="it"
                    v-for="it in ToastsList" :key="it.id"
                    :class="{
                    'fail' : it.type === 'red',
                    'neutrally' : it.type === 'blue',
                    'succ' : it.type === 'green'
                    }"
                >
                    <div
                        class="close-btn-toast"
                        @click="() => {}"
                    >
                        <img src="@/assets/svgassets/icons8-удалить.svg" alt="">
                    </div>

                    <div class="wrapper">
                        <div class="frame-icon">
                            <img v-if="it.typeOf === 'delete'" src="@/assets/toasts/icons8-отмена.svg" alt="">
                            <img v-if="it.typeOf === 'file'" src="@/assets/toasts/icons8-загрузить-96.png" alt="">
                            <img v-if="it.typeOf === 'send'" src="@/assets/toasts/icons8-проверено.svg" alt="">
                        </div>

                        <div class="inner-wrapper">
                            <div class="text-content">
                                {{ it.textContent }}
                            </div>

                            <div class="text-bottom-content">
                                {{ it.bottContent }}
                            </div>
                            
                            <div class="progress-upload" v-if="it.typeOf === 'file'">
                                <div class="procent-value" id="procent-value-id">{{ '58%' }}</div>

                                <div class="progress-empty" id="progress-empty-id">
                                    <div class="progress-inline" id="progress-inline-id"></div>
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
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            ToastsList: [
                {id: 0, icon: 'delete document', textContent: 'The document has been deleted', type: 'red', typeOf: 'delete',  bottContent: 'The document (message) was successfully deleted from the block, it is impossible to restore it'},
                {id: 1, icon: 'delete document', textContent: 'File uploading', type: 'blue', typeOf: 'file',  bottContent: 'The file has been successfully uploaded to the cloud, copy the link'},
                {id: 2, icon: 'delete document', textContent: 'Request was sent successfully', type: 'green', typeOf: 'send', bottContent: 'The request was sent successfully, please wait for feedback'},
            ],
        }
    },

    watch: {
        isList: {
            handler(newArray) {
                this.ToastsList = newArray
                console.log('array is been to updated', newArray)
            },
            deep: true,
        }
    },
    computed: {
        ...mapState('toast', {
            isList: 'isList',
        })
    },

    mounted() {
        this.ToastsList = this.isList
        console.log(this.isList, this.ToastsList, 'bomba')
    },
    methods: {
        ...mapMutations('toast', {
            addToast: 'addToast',
        }),
    }
}
</script>
<style lang="scss" scoped>
// #ff0000

.fail {
    background: linear-gradient(41deg, rgba(4,4,4,1) 0%, rgba(52,0,0,0.8995973389355743) 100%, rgba(52,223,109,0.9920343137254902) 100%);
}
.neutrally {
    background: linear-gradient(41deg, rgba(4,4,4,1) 0%, rgba(0,32,47,0.8995973389355743) 100%, rgba(52,223,109,0.9920343137254902) 100%);
}
.succ {
    background: linear-gradient(41deg, rgba(4,4,4,1) 0%, rgba(0,47,31,0.8995973389355743) 100%, rgba(52,223,109,0.9920343137254902) 100%);
}

.toasts-notify-class {
    position: absolute;
    right: 10px;
    top: 30px;
    width: 400px;
    z-index: 11;
    .outside {
        width: 100%;
        height: 100%;


        .list {
            width: 100%;
            height: 100%;
            // overflow: auto;
            .it {
                width: 100%;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-radius: 10px;
                padding-left: 20px;
                margin-top: 10px;
                z-index: 50;
                color: #888;
                font-family: Lato,sans-serif;
                font-weight: 700;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: .02em;
                position: relative;
                .close-btn-toast {
                    position: absolute;
                    top: 0;
                    width: 50%;
                    right: 0;
                    display: flex;
                    align-items: center;
                    img {
                        width: 12px;
                        height: 12px;
                        margin-left: auto;
                        margin-right: 10px;
                        margin-top: 10px;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .wrapper {
                    width: 100%;
                    display: flex;
                    align-items: center;

                    .frame-icon {
                        
                        img {
                            width: 30px;
                            height: 30px;
                            opacity: .7;
                        }
                    }

                    .inner-wrapper {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        padding: 10px;

                        .text-content {
                            margin-left: 10px;
                            display: flex;
                            flex-direction: column;
                        }

                        .progress-upload {
                            width: 100%;
                            display:flex;
                            flex-direction: column;
                            justify-content: center;
                            padding: 5px;
                            margin-left: 5px;
                            margin-top: 5px;

                            .progress-empty {
                                background-color: #222;
                                width: 100%;
                                margin-top: 5px;


                                .progress-inline {
                                    width: 58%;
                                    height: 2px;
                                    background-color: aqua;
                                }
                            }

                            .procent-value {
                                margin-left: auto;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
    
                        .text-bottom-content {
                            margin-top: 5px;
                            display: flex;
                            flex-direction: column;
                            margin-left: 10px;
                            font-size: 11px;
                            padding-right: 10px;
                            text-transform: lowercase;
                        }
                    }
        
                }


            }
        }
    }
}

</style>