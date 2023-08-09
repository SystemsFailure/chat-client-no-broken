<template>
    <EditMessageWindow
        v-if="visibleEditMessageWindow"
        id="editMessWindow-id"
        v-bind:currmessText="currmessText"
        v-bind:currentMessageEditId="currentMessageEditId"
        @updateMessage="updateMessage"
        @closeEditMessageWindow="(vl) => {this.visibleEditMessageWindow = vl}"
    ></EditMessageWindow>

    <div class="main-window-chat" id="globalID-chat">
        <img src="@/assets/svgassets/icons8-кали-линукс-wh.svg" alt="" id="kali-logo-chat">
        <Transition name="fade-comp-settChatId-v">
            <ContextMenuMessage
            v-show="visibileContextMenuMess" 
            id="context-menu-vclass-mess"
            @closeContextmenuFunction="closeContextMenuMess"
            @visSelSysFunction="selectionMessagesFunction"
            @copyTextFromMessageFunction="copyTextFromMessage"
            @answerOnMessageFunction="answerOnMS"
            @editMessageFunction="editMessage"
            @updateMessageHelper="updateMessage"
            ></ContextMenuMessage>
        </Transition>
        <!-- @showEditMessWindowFunction="() => {this.visibleEditMessageWindow = true}" -->
    

        <BannerUpComp 
        @showOrHideSettingChatId="showHideSettingChatId" 
        @showNotificationWindowFunction="(value) => {this.$emit('showNotificationWindowFunctionArrow', value)}"
        ></BannerUpComp>

        <BannerBottomComp 
        @sendMessage="add_message" 
        @add_file_messageFunction="add_file_message"
        v-bind:focusOn_messageInput="focusOn_messageInput"
        ></BannerBottomComp>

        <MiniListLastChatsComp 
        class="defined-compotent-minilist"
        v-if="showMiniListComp" 
        @MiniChatBindMiniUsersListFunction="functionBindingMiniListUsersByMiniChat"
        ></MiniListLastChatsComp>

        <MiniChatComp 
        v-if="showMiniChatValue" 
        v-bind:USERTO="USERTO" 
        @closeMiniChatCompFunction="value => this.showMiniChatValue=value"
        ></MiniChatComp>

        <viewPhotoWindow 
        v-if="showWindowImage" 
        v-model:imageURL="imageURL" 
        @closeWindowFunction="() => {this.showWindowImage = false}" 
        v-bind:toID="user_to_id"
        ></viewPhotoWindow>

        <div class="content-win-chat">
            <div class="chat-window">
                <div class="empty-title-won" v-if="Object.keys(message_lst).length == 0"><span>No chat selected</span></div>
                <Transition name="fade-comp-settChatId-v">
                    <SettingsMenuChatIdComp v-if="showSettingsChatId"></SettingsMenuChatIdComp>
                </Transition>

                <div class="generl-list-messages" id="block-chat-window-id"   @scroll="LoadLimitMessage">
                    <div class="selected-mess-sys" v-if="visibileSelSys">
                        <span class="count-sel-mess">Выбрано:  {{ sel_mess.length }}</span>
                        <img src="@/assets/svgassets/icons8-удалить.svg" alt="" @click="closeSelectionWindow()">
                    </div>
                    <div class="outer-container">
                        <div v-show="showDialogWindow" class="container-hide-box" id="query1">
                            <h5  class="mess-content-example" style="color: white;" id="q1"></h5>
                            <h5  class="mess-content-example" style="color: white;" id="q2"></h5>
                            <h5  class="mess-content-example" style="color: white;" id="q3"></h5>
                            <h5  class="mess-content-example" style="color: white;" id="q4"></h5>
                            <h5  class="mess-content-example" style="color: white;" id="q5"></h5>
                        </div>

                        <div v-for="n in message_lst" v-bind:key="n.id" class="inner-container" ref="content" :id="'inner'+n.id">
                            <div class="message-bubble">

                                <!-- FILE ELEMENT -->
                                <!-- FILE ELEMENT -->
                                <!-- FILE ELEMENT -->

                                <div 
                                        class="file-content"  
                                        v-if="n.fileobj_url"
                                    >
                                    <div 
                                        class="inner-file-container"
                                        :style="n.fromId === user_id 
                                        ? 
                                        {'margin-left' : 'auto', 'background-color' : `${currentMesssageBackgroundByTheme}`} 
                                        : 
                                        {'margine-left' : '0'}" 
                                    >
                                        <img 
                                            :src="n.result ?
                                            require('@/assets/svgassets/icons8-скачать-файл-96.png') 
                                            :
                                            require('@/assets/svgassets/icons8-счастливый-файл-96.png')"
                                            @click="downloadFile(n.fileobj_url)"
                                        >
                                        <div class="inner-box-data-of-file">
                                            <span>
                                                {{ n.namefile }}
                                            </span>
                                            <span>
                                                {{ n.size }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- IMAGE ELEMENT -->
                                <!-- IMAGE ELEMENT -->
                                <!-- IMAGE ELEMENT -->

                                <div class="image-content" v-if="n.img_url">
                                    <img
                                        :src="n.img_url" 
                                        :style="n.fromId === user_id ? {'margin-left' : 'auto'} : {'margine-left' : '0'}"
                                        @click="openImageToWindow(n.img_url)"
                                    >
                                    <div 
                                        class="data-created-img" 
                                        :style="n.fromId === user_id ? {'margin-left' : 'auto'} : {'margine-left' : '0'}"
                                        ><span>{{ n.atCreated }}</span>
                                    </div>
                                </div>

                                <!-- ANSWERED ELEMENT -->
                                <!-- ANSWERED ELEMENT -->
                                <!-- ANSWERED ELEMENT -->

                                <div 
                                    class="answered-message-content" 
                                    v-if="n.answered" 
                                    @click="sl(n)"
                                >
                                    <div 
                                        class="inner-answered-message"
                                        :style="n.fromId === user_id ?
                                        {'margin-left' : 'auto', 'background-color' : `${currentMesssageBackgroundByTheme}`}
                                        :
                                        {'margine-left' : '0'}"
                                        @mouseenter="showDetailDataMessage2($event, n.id)"
                                        @mouseleave="hideDetailDataMessage($event)"
                                        @contextmenu="showContextMessageMenu($event, n.id, n)" 
                                    >
                                        <!-- TRIGGER  -->
                                        <!-- <div 
                                            class="trigger"
                                        ></div> -->

                                        <div 
                                            class="answer-box" 
                                            @click="scrollViewToElement(n.idAnsweredMessageDomElement)"    
                                        >
                                            {{ this.sliceText(n.answeredText) }}
                                        </div>
                                        <div class="text-message answered-class-j">
                                            <span 
                                            :id="n.id" class="answ-class answered-mess-id-j"
                                            >
                                                {{ n.content }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- DEFAULT ELEMENT -->
                                <!-- DEFAULT ELEMENT -->
                                <!-- DEFAULT ELEMENT -->
                                
                                <h6 v-if="n.content && !n.answered"
                                    :id="n.id"
                                    class="im-message-content"
                                    @click="sl(n)"
                                    @contextmenu="showContextMessageMenu($event, n.id, n)"
                                    @mouseover="showDetailDataMessage($event, n.id)"
                                    @mouseout="hideDetailDataMessage($event)"
                                    :style="n.fromId === user_id ? 
                                    {
                                        'float':'right',
                                        'background-color' : `${currentMesssageBackgroundByTheme}`,
                                        'color' : 'white'
                                    }
                                    :
                                    {
                                        'float':'left', 
                                        'background-color' : '#101010', 
                                        'padding-bottom': '10px'
                                    }"
                                    >{{n.content}}
                                </h6>

                            </div>
                        </div>
                    </div>
                </div>

                <AnswerOnMessage
                    v-if="visibleAnswerWindow"
                    @closeAnswerWindowFunction="this.visibleAnswerWindow = false"
                    @scrollViewToElementFunction="scrollViewToElement"
                    :messageText="messageText"
                    :messageIdForAnswer="messageIdForAnswer"
                ></AnswerOnMessage>
            </div>

        </div>

    </div>
</template>
<script>
import EditMessageWindow from '@/components/ModalWindows/EditMessageWindow.vue'
import BannerUpComp from '@/components/BannerUpComp.vue'
import BannerBottomComp from '@/components/BannerBottomComp.vue'
import SettingsMenuChatIdComp from '@/components/SettingsMenuChatIdComp.vue'
import MiniListLastChatsComp from '@/components/ModalWindows/MiniListLastChatsComp.vue'
import MiniChatComp from '@/components/ModalWindows/MiniChatComp.vue'
import viewPhotoWindow from '@/components/ModalWindows/viewPhotoWindow.vue'
import ContextMenuMessage from '@/components/ModalWindows/ContextMenuMessage.vue'
import AnswerOnMessage from '@/components/ModalWindows/AnswerOnMessage.vue'
import { MessagesApi } from '@/api/MessagesController'
import { ChatApi } from '@/api/ChatController'
import { Timestamp } from "firebase/firestore"
import { mapMutations, mapState, mapActions } from 'vuex'
import { validDOMElement } from '@/validators'
import useAllChats from '@/services/ChatWindow/useGetAllChats';



export default {
    data() {
        return {
            showSettingsChatId: false,
            showWindowImage: false,
            user_id: localStorage.getItem('user-id') ? localStorage.getItem('user-id') : null,
            showDialogWindow: false,
            visibileContextMenuMess: false,
            // Система выбранных сообщений true / false - visiblility
            visibileSelSys: false,

            // model for editMessWindow
            visibleEditMessageWindow: false,
            currmessText: '',
            currentMessageEditId: '',

            message_lst: [],
            sel_mess: [],
            
            USERTO: null,
            showMiniChatValue: false,
            showMiniListComp: true,
            imageURL: null,

            lastMessage: '',
            visibleScroll: false,

            currentMesssageBackgroundByTheme: '',

            visibleAnswerWindow: false,
            messageText: '',
            messageIdForAnswer: null,
            
            // focuses models:
            focusOn_messageInput: 0,
        }
    },
    // Явно даю понять, что есть такой эмит компоненту .. - .. иначе будет предупреждение (Warning) ⚠️⚠️⚠️
    emits: ['showNotificationWindowFunctionArrow'],

    props: {
        user_to_id: {},
        cleaningChat: {},
    },

    computed: {
        ...mapState('themescontroller', {
            themeSchemaDefault: 'themeSchemaDefault',
            themeSchemaGreen: 'themeSchemaGreen',
            themeSchemaTeal: 'themeSchemaTeal',
            themeSchemaOrange: 'themeSchemaOrange',
            themeSchemaFeolet: 'themeSchemaFeolet',
            themeSchemaRed: 'themeSchemaRed',
            currTheme: 'currTheme',
        }),
        ...mapState('contextmenu', {
            curr_messageInstance: 'curr_messageInstance',
        })
    },

    async mounted() {
        // Установка настроек
        this.settings()

        setInterval(() => {
            this.hideScrollEffect()
        }, 2500)
        // Здесь скрываем скролл и контекстное меню по нажатию на любую область
        document.addEventListener('click', e => {
            this.hideContextMenu(e)
            this.hideScrollEffect()
            this.closeEditWindow(e)
        })

        // Здесь устанавливается onSnapshoot для слежения за index - это колл-во сообщений в чате, которое меняется каждый раз когда оправляется сообщение
        await useAllChats(this.user_id, this.message_lst, this.lastMessage, this.user_to_id);
    },

    watch: {
        user_to_id: {
            async handler() {
                this.getLimitedMessagePage(this.user_to_id)
            },
            deep: true,
        },
        currTheme: {
            handler() {
                this.settings()
            },
            deep: true,
        },
        cleaningChat: {
            handler() {
                this.showSettingsChatId = false
                this.message_lst = []
            },
            deep: true
        },
        visibileContextMenuMess: {
            handler(newValue) {
                let generalListMessages = document.getElementById('block-chat-window-id')
                if(newValue === true)
                {
                    generalListMessages.style.overflow = 'hidden'
                    
                } else {
                    generalListMessages.style.overflow = 'scroll'
                }
            },
            deep: true,
        }
    },

    methods: {
        // Настройка темы
        settings() {
            const themeSchema = localStorage.getItem('theme-schema'); 
            switch (themeSchema) {
                case 'default':
                    this.currentMesssageBackgroundByTheme = this.themeSchemaDefault.backmessage
                    break;
                case 'green':
                    this.currentMesssageBackgroundByTheme = this.themeSchemaGreen.backmessage
                    break;
                case 'teal':
                    this.currentMesssageBackgroundByTheme = this.themeSchemaTeal.backmessage
                    break;
                case 'orange':
                    this.currentMesssageBackgroundByTheme = this.themeSchemaOrange.backmessage
                    break;
                case 'feolet':
                    this.currentMesssageBackgroundByTheme = this.themeSchemaFeolet.backmessage
                    break;
                case 'red':
                    this.currentMesssageBackgroundByTheme = this.themeSchemaRed.backmessage
                    break;
                default:
                    break;
            }
        },

        // методы настройки DOM элементов
        //?????NOT USE NOT USE NOT USE NOT USE NOT USE
        setbackgroundAllMessagesVlDefault() {
            if(this.themeSchemaDefault.backmessage)
            {
                let lstMessagesElementsDOM = document.getElementsByClassName('im-message-content')
                if(validDOMElement(lstMessagesElementsDOM, 'list', this.setbackgroundAllMessagesVlDefault.name))
                {
                    for (let index = 0; index < lstMessagesElementsDOM.length; index++) {
                        const element = lstMessagesElementsDOM[index];
                        if(element.style.float === 'right')
                        {
                            element.style.backgroundColor = this.themeSchemaDefault.backmessage
                        }
                    }
                }
            } else {
                console.log('not defined or found or not seted object')
            }
        },
        //????? NOT USE NOT USE NOT USE

        downloadFile(url) {
            console.log(url, 'resp')
            const xhr = new XMLHttpRequest()
            xhr.responseType = 'blob'
            xhr.onload = (event) => {
                const blob = xhr.response
                console.log(blob, event)
            }
            xhr.open('GET', url)
            xhr.send()
        },

        scrollViewToElement(vl_id_element) {
            const el = document.getElementById(vl_id_element)
            const listAllMessElements = document.getElementsByClassName('inner-container')

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /// Элемент сравнения (если элемент последний в списке всех сообщений, либо предпоследний и так далее на 5 позиций по списку с конца, то не скроллим до него) ////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const elcomparison = document.getElementById('inner'+vl_id_element)
            if(vl_id_element)
            {
                if(el)
                {
                    for (let index = 0; index < 10; index++) {
                        if(elcomparison === listAllMessElements[listAllMessElements.length - [index]])
                        {
                            ////////////////////////////////////////////////////////
                            /// Проверка если элемент является answer элементом ////
                            ////////////////////////////////////////////////////////
                            if (el.classList[1] === 'answered-mess-id-j')
                            {
                                let parentDOMElement = el.parentNode.parentNode.parentNode
                                if(parentDOMElement) {
                                    parentDOMElement.style.backgroundColor = '#111'
                                    setTimeout(() => {
                                        parentDOMElement.style.backgroundColor = ''
                                    }, 1000);
                                }
                                return
                            } else {
                                let parentDOMElement = el.parentNode
                                if(parentDOMElement) {
                                    parentDOMElement.style.backgroundColor = '#111'
                                    setTimeout(() => {
                                        parentDOMElement.style.backgroundColor = ''
                                    }, 1000);
                                }
                                return
                            }
                        }
                    }
                    if (el.classList[1] === 'answered-mess-id-j')
                    {
                        el.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'})
                        let parentDOMElement = el.parentNode.parentNode.parentNode
                        if(parentDOMElement) {
                            parentDOMElement.style.backgroundColor = '#111'
                            setTimeout(() => {
                                parentDOMElement.style.backgroundColor = ''
                            }, 1000);
                        }
                    } else {
                        el.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'})
                        let parentDOMElement = el.parentNode
                        if(parentDOMElement) {
                            parentDOMElement.style.backgroundColor = '#111'
                            setTimeout(() => {
                                parentDOMElement.style.backgroundColor = ''
                            }, 1000);
                        }
                    }

                }
            }
        },

        // Close functions
        closeEditWindow(e) {
            let element = document.getElementById('editMessWindow-id')
            let contextMenuMessElem = document.getElementById('context-menu-vclass-mess')
            const withinBorderies = e.composedPath().includes(element);
            const withinMenuContext = e.composedPath().includes(contextMenuMessElem);
            if(!withinBorderies && !withinMenuContext) {
                this.visibleEditMessageWindow = false
            }
            
        },

        answerOnMS(vl_id_message) {
            let domElementMessage = document.getElementById(vl_id_message)
            if(domElementMessage)
            {
                if(domElementMessage.classList[1] === 'answered-mess-id-j') {
                    console.log('dont can to answer on the answer')
                }
                this.messageIdForAnswer = vl_id_message
                this.messageText = domElementMessage.textContent
                this.visibleAnswerWindow = true
                this.focusOn_messageInput ++
            }
        },

        copyTextFromMessage(vl_id_message) {
            let domElementMessage = document.getElementById(vl_id_message)
            if(domElementMessage)
            {
                navigator.clipboard.writeText(domElementMessage.textContent).then(() => {
                    console.log('domElementMessage from this element been copid text')
                }).catch(err => {
                    console.log(err)
                })
            }
        },

        // Click on message-bubble function
        // Сей час функция используется только для выбора сообщения, если открыта система выбора сообщений
        sl(it) {
            console.log('it - ', it)
            if(this.visibileSelSys)
            {
                this.selectionMessagesFunction(it.id)
            }
        },

        selectionMessagesFunction(vl) {
            this.visibileContextMenuMess = false
            this.visibileSelSys = true
            this.sel_mess.push(vl)
            let message = document.getElementById(vl)
            if(message)
            {
                message.parentNode.style.backgroundColor = '#111'
            }
        },

        closeSelectionWindow() {
            this.sel_mess = []
            this.visibileSelSys = false
            let lst_message_bubble = document.getElementsByClassName('message-bubble')
            for (let index = 0; index < lst_message_bubble.length; index++) {
                const element = lst_message_bubble[index];
                element.style.backgroundColor = ''
            }
        },

        hideScrollEffect() {
            if(this.visibleScroll)
            {
                this.visibleScroll = false
                var styleElement = document.createElement("style");
                styleElement.appendChild(document.createTextNode(
                    "::-webkit-scrollbar {-webkit-appearance: none;} ::-webkit-scrollbar-thumb {border-radius: 4px;background-color: rgba(0,0,0,.0);transition: .8s;}"
                    ));
                document.getElementsByTagName("body")[0].appendChild(styleElement);
            }
        },
        hideContextMenu(e) {
            if(this.visibileContextMenuMess === true)
            {
                // Здесь обрабатывается прверка находится ли элемент под курсором во время нажатия
                let contextMenuMessElem = document.getElementById('context-menu-vclass-mess')
                const withinBoundaries = e.composedPath().includes(contextMenuMessElem)
                if(!withinBoundaries)
                {
                    contextMenuMessElem.style.display = 'none'
                    const generalListMessages_ = document.getElementById('block-chat-window-id')
                    generalListMessages_.style.overflow = 'scroll'
                    generalListMessages_.style.overflowX = 'hidden'
                    // Это для болле плавного изчизновения скролл бара
                    generalListMessages_.style.paddingRight = '0px'
                }
            }
        },
        // Этот метод вызвается в компоненте ContextMenuMessage как this.$emit('closeWindow...', false)
        closeContextMenuMess(val) {
            this.visibileContextMenuMess = val
            const generalListMessages_ = document.getElementById('block-chat-window-id')
            generalListMessages_.style.overflow = 'hidden'
            generalListMessages_.style.overflowX = 'hidden'
            // generalListMessages_.style.overflowX = 'auto'
            generalListMessages_.style.paddingRight = '0px'
        },

        positionCursor(e){
            let x = 0
            let y = 0
            if (!e) {
                e = window.event;
            }
            if (e.pageX || e.pageY){
                x = e.pageX;
                y = e.pageY;
            } else if (e.clientX || e.clientY){
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return {x: x, y: y}
        },

        showContextMessageMenu (event, id, messageInstance) {
            this.setcurr_messageInstance(messageInstance)
            this.setidSelectedMessage(id)
            let contextMenuMessElem = document.getElementById('context-menu-vclass-mess')
            let generalListMessages = document.getElementById('block-chat-window-id')
            contextMenuMessElem.style.display = 'flex'
            this.visibileContextMenuMess = true
            generalListMessages.style.overflow = 'hidden'
            generalListMessages.style.paddingRight = '6px'
            let {x, y} = this.positionCursor()
            //Данная переменная должна инициализиоваться после присвоение элементу display = flex, иначе первое значение width будет 0
            let coordsTarget = contextMenuMessElem.getBoundingClientRect()
            let PerfomanceWidthScreen = window.innerWidth / 2
            //Справа или слева будет распологаться контекстное меню
            if(x > PerfomanceWidthScreen)
            {
                if(y > 600)
                {
                    contextMenuMessElem.style.top = (y - coordsTarget.height) + 'px'
                    contextMenuMessElem.style.left = (x - coordsTarget.width) + 'px'
                } else {
                    contextMenuMessElem.style.top = y + 'px'
                    contextMenuMessElem.style.left = (x - coordsTarget.width) + 'px'
                }
            } else {
                if(y > 700)
                {
                    contextMenuMessElem.style.top = (y - coordsTarget.height) + 'px'
                    contextMenuMessElem.style.left = x + 'px'
                }else {
                    contextMenuMessElem.style.top = y + 'px'
                    contextMenuMessElem.style.left = x + 'px'
                }
            }
            event.preventDefault()
        },

        scrollDownChat() {
            let block = document.getElementById("block-chat-window-id")
            block.scrollTop = block.scrollHeight
        },

        async LoadLimitMessage() {
            let el = document.getElementById('block-chat-window-id')
            let posTop = el.scrollTop
            if(Math.ceil(posTop) === 0) {
                const data_ = { toId: this.user_to_id, fromId: this.user_id}
                let {lastElement_, array} = await MessagesApi.getNextPage(this.lastMessage, data_).catch(err => console.log(err)) || {}
                if(array === undefined && lastElement_ === undefined)
                {
                    console.log('error with next page')
                    return
                }
                array.forEach(elem => {
                    this.message_lst.unshift(elem)
                })
                // this.settings()
                // Это временно

                let block = document.getElementById("block-chat-window-id")
                block.scrollTop = (block.scrollHeight / 100)
                this.lastMessage = lastElement_
            }
            if(this.visibleScroll === false) {
                if(posTop > 0)
                {
                    this.visibleScroll = true
                    var styleElement = document.createElement("style");
                    styleElement.appendChild(document.createTextNode(
                        "::-webkit-scrollbar {-webkit-appearance: none;} ::-webkit-scrollbar-thumb {border-radius: 4px;background-color: rgba(66, 64, 64, 0.25);}"
                    ));
                    document.getElementsByTagName("body")[0].appendChild(styleElement);	
                }
            }
        },

        async createIndex() {
            let countMess = null
            if(this.user_to_id && this.user_id) {
                await ChatApi.getChat({toID: this.user_to_id, fromID: this.user_id}).then( async chat => {
                    if (chat.length != 0)
                    {
                        if (chat.length === 1)
                        {
                            await ChatApi.updataField(chat[0].id)
                            countMess = chat[0].countOfMessages
                        }
                        else
                        {
                            console.log('length is not 1')
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            return countMess
        },

        deleteMessage(messId) {
            MessagesApi.deleteMessageById(messId)
            return false
        },

        async updateAllChat() {
            const data_ = {
                message_lst: this.message_lst,
                toId: this.user_to_id,
                fromId: this.user_id,
            }
            await MessagesApi.getAllMessage(data_).then(arr => {
                this.message_lst = arr
                let block = document.getElementById("block-chat-window-id")
                block.scrollTop = block.scrollHeight
            }).catch(err => {
                console.log(err)
            })
        },

        functionBindingMiniListUsersByMiniChat(user, value) {
            if(user) {
                this.USERTO = user
                this.showMiniChatValue = value
            } else {
                console.log('user is empty')
            }
        },

        openImageToWindow(valueImageURL) {
            this.imageURL = valueImageURL
            this.showWindowImage = true
            console.log(valueImageURL)
        },

        showHideProfile(result) {
            this.showUserInfo_model = result
        },

        showHideSettingChatId(result) {
            this.showSettingsChatId = result
        },

        showDetailDataMessage2(event, id) {
            let message = document.getElementById('query1');
            let q1 = document.getElementById('q1');
            let q2 = document.getElementById('q2');
            let q3 = document.getElementById('q3');
            let q4 = document.getElementById('q4');
            let mess_OnId = 0

            message.style = "position:fixed";
            this.showDialogWindow = true
            mess_OnId = this.message_lst.filter(mess => {
                return mess.id === id
            })
            q1.innerHTML = mess_OnId[0].result !== 'Success' 
            ? "result" + " : " + "<font color=#00cec7>"+mess_OnId[0].result+"</font>" 
            : "result" + " : " + "<font color=red>"+mess_OnId[0].result+"</font>"
            q2.innerText = "time" + " : " + mess_OnId[0].atCreated
            q3.innerText = "size" + " : " + mess_OnId[0].size + 'kb'
            q4.innerText = mess_OnId[0].view ? "Viewed" + " : " +  'Yah' : "Viewed" + " : " +   'No'
            

            let {x, y} = this.positionCursor()
            //Данная переменная должна инициализиоваться после присвоение элементу display = flex, иначе первое значение width будет 0
            let coordsTarget = event.target.getBoundingClientRect()
            let PerfomanceWidthScreen = window.innerWidth / 2
            //Справа или слева будет распологаться контекстное меню
            if(x > PerfomanceWidthScreen)
            {
                if(y > 600)
                {
                    message.style.top = (y - coordsTarget.height) + 'px'
                    message.style.left = x + 'px'
                } else {
                    message.style.top = y + 'px'
                    message.style.left = (x - coordsTarget.width) + 'px'
                }
            } else {
                if(y > 700)
                {
                    message.style.top = (y - coordsTarget.height) + 'px'
                    message.style.left = x + 'px'
                }else {
                    message.style.top = y + 'px'
                    message.style.left = x + 'px'
                }
            }
            event.preventDefault()
        },

        showDetailDataMessage(event, id) {
            let message = document.getElementById('query1');
            let q1 = document.getElementById('q1');
            let q2 = document.getElementById('q2');
            let q3 = document.getElementById('q3');
            let q4 = document.getElementById('q4');
            let coords = event.target.getBoundingClientRect()
            let mess_OnId = 0

            message.style = "position:fixed";
            this.showDialogWindow = true
            mess_OnId = this.message_lst.filter(mess => {
                return mess.id === id
            })
            q1.innerHTML = mess_OnId[0].result !== 'Success' 
            ? "result" + " : " + "<font color=#00cec7>"+mess_OnId[0].result+"</font>" 
            : "result" + " : " + "<font color=red>"+mess_OnId[0].result+"</font>"

            q2.innerText = "time" + " : " + mess_OnId[0].atCreated
            q3.innerText = "size" + " : " + mess_OnId[0].size + 'kb'
            q4.innerText = mess_OnId[0].view ? "Viewed" + " : " +  'Yah' : "Viewed" + " : " +   'No'

            if(event.target.style.float === 'left') 
            {
                if(this.message_lst.findIndex(i => i.id === mess_OnId[0].id) === this.message_lst.length - 1) 
                {
                    message.style.left = coords.right + 'px'
                    message.style.top = coords.bottom  - coords.height*2.5 + 'px'
                    return
                }
                message.style.left = coords.right + 'px'
                message.style.top = coords.bottom + 'px'
            } else {
                if(this.message_lst.findIndex(i => i.id === mess_OnId[0].id) === this.message_lst.length - 1) 
                {
                    message.style.right = coords.width + 20 + 'px'
                    if(coords.height < 50) 
                    {
                        message.style.top = coords.bottom  - coords.height*2 + 'px'
                        return
                    }
                    message.style.top = coords.bottom  - coords.height + 'px'
                    return
                }
                message.style.right = coords.width + 25 + 'px'
                message.style.top = coords.bottom + 'px'
            }
            this.$nextTick(() => {
                // this.setbackgroundAllMessagesVlDefault()
            })
        },

        hideDetailDataMessage() {
            this.showDialogWindow = false
        },

        // Основной метод, получить все сообщения текущего чата
        async getLimitedMessagePage(vl_curr_user_toId) {
            this.setuser_to_id(vl_curr_user_toId)
            const data_ = { toId: vl_curr_user_toId, fromId: this.user_id, }
            const {lastElement, array} = await MessagesApi.getLimitedPage(data_) || {}
            new Promise((resolve, failure) => {
                this.message_lst = []
                this.message_lst = array.reverse()
                this.lastMessage = lastElement
                resolve('success')
                failure('failure')
            }).then(() => {
                this.settings()    
                this.scrollDownChat()
            })
        },

        // Эта функция для обнавления конкретного сообщения, что бы не обновлять весь чат, и не соответственно не дергать все окно ChatWidnow (Здесь не обновляется список сообщений)
        // Список обновился, но мы не обновляем сразу, только, dom элемент, потом уже пользователь сам все обновить (например перезагрузив страницу)
        updateMessage(messId, newContent, additionalValue) {
            if(additionalValue === 'edit')
            {
                let message = document.getElementById(messId)
                if(message)
                {
                    message.textContent = newContent
                }
            } 
            if(additionalValue === 'delete')
            {
                // let message = document.getElementById(messId+'inner-container')
                let message = document.getElementById(messId)
                if(message)
                {
                    if(message.parentNode.classList[1] === 'answered-class-j') {
                        message.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none'
                    }
                    message.parentNode.parentNode.style.display = 'none'
                }
            }
        },

        // Функция редактирования сообщения
        editMessage(messageId) {
            if(this.curr_messageInstance.fromId != localStorage.getItem('user-id')) {
                console.log('you cant to change by content not your message')
                return;
            }
            if(messageId)
            {
                let message = document.getElementById(messageId)
                if(message)
                {
                    let currmessContent = message.textContent
                    this.currmessText = currmessContent
                    this.currentMessageEditId = messageId
                    this.visibleEditMessageWindow = true
                }
            }
        },

        async add_file_message(file, valuetype) {
            const data_ = {
                message_lst: this.message_lst,
                toId: this.user_to_id,
                fromId: this.user_id,
            }
            const count = await this.createIndex()
            // Если пользователь пытается отправить файл не img, message
            if(valuetype === 'file')
            {
                if(file)
                {
                    new Promise((res, rej) => {
                        this.message_lst.push(
                        {
                            fromId: this.user_id, content: null,
                            toId: this.user_to_id, size: file.size,
                            namefile: file.name, 
                            result: true,
                            atCreated: new Date().toLocaleString(),
                            atUpdated: new Date().toLocaleString(),
                            fileobj_url: true,
                            answered: false,
                            answeredText: null,
                            idAnsweredMessageDomElement: this.messageIdForAnswer,
                        })
                        res('successful send')
                        rej('failure sending')
                    }).then(() => {
                        this.scrollDownChat()
                    })
                    this.setFileObj(file)
                    this.setcountIndex(count)
                    this.setObjectUserData(data_)
                    this.uploadFileToCloud()
                }
            } else {
                if(file) 
                {
                    await MessagesApi.uploadImageMessage(file, localStorage.getItem('user-id'), data_).then(({file_path, file_url}) => {
                        MessagesApi.createMessage( {
                            content: null,
                            fromId: localStorage.getItem('user-id'),
                            toId: this.user_to_id != null && this.user_to_id != 0 ? this.user_to_id : false,
                            togetherId: this.user_id + '-' + this.user_to_id,
                            size: null,
                            result: true,
                            atCreated: new Date().toLocaleString(),
                            atUpdated: new Date().toLocaleString(),
                            view: null,
                            img_url: file_url,
                            img_name: file_path,
                            index: count,
                            fileobj_url: null,
                            answered: false,
                            answeredText: null,
                            idAnsweredMessageDomElement: this.messageIdForAnswer,
                        }, data_).then(data => {
                            this.message_lst = data
                        }).catch(err => {
                            console.log(err)
                        })
                    })
                }
            }
        },

        async add_message(text) {
            let countMess = 0
            let chatID = null
            const data_ = { message_lst: this.message_lst, toId: this.user_to_id, fromId: this.user_id }
            new Promise((resolve, failure) => {
                this.message_lst.push(
                    {
                        fromId: this.user_id, 
                        content: text,
                        toId: this.user_to_id, 
                        size: new Blob([text]).size, 
                        result: true,
                        atCreated: new Date().toLocaleString(),
                        atUpdated: new Date().toLocaleString(),
                        answered:  this.messageText != '' && this.messageText != 'default message' ? true : false,
                        answeredText: this.messageText != '' && this.messageText != 'default message' ? this.messageText : null,
                        idAnsweredMessageDomElement:  this.messageText != '' && this.messageText != 'default message' ? this.messageIdForAnswer : null,
                    })
                resolve('success')
                failure('failure')
            }).then(() => {
                // анимация отправки сообщения
                if(this.messageText != '' && this.messageText != 'default message') {
                    document.getElementsByClassName('inner-answered-message')[document.getElementsByClassName('inner-answered-message').length - 1].classList.add('anime-bubble-message')
                } else {
                    document.getElementsByClassName('im-message-content')[document.getElementsByClassName('im-message-content').length - 1].classList.add('anime-bubble-message')
                }
                this.scrollDownChat()
                this.visibleAnswerWindow = false
            })
            if(this.user_to_id && this.user_id) {
                await ChatApi.getChat({toID: this.user_to_id, fromID: this.user_id}).then( async chat => {
                    if (chat.length != 0)
                    {
                        if (chat.length === 1)
                        {
                            chatID = chat[0].id
                            countMess = chat[0].countOfMessages
                        }
                        else
                        {
                            console.log('length is not 1')
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            let messageContent = {
                content: text,
                fromId: this.user_id,
                toId: this.user_to_id != null && this.user_to_id != 0 ? this.user_to_id : false,
                togetherId: this.user_id + '-' + this.user_to_id,
                size: new Blob([text]).size,
                result: true,
                atCreated: Timestamp.fromDate(new Date()),
                atUpdated: Timestamp.fromDate(new Date()),
                view: false,
                img_url: null,
                img_name: null,
                index: countMess,
                fileobj_url: null,
                // Это для ответа... на сообщение
                answered: this.messageText != '' && this.messageText != 'default message' ? true : false,
                answeredText: this.messageText != '' && this.messageText != 'default message' ? this.messageText : null,
                idAnsweredMessageDomElement:  this.messageText != '' && this.messageText != 'default message' ? this.messageIdForAnswer : null,
            }
            await MessagesApi.createMessage(messageContent, data_).then( async () => {
                if(this.messageText != '' && this.messageText != 'default message') {
                    document.getElementsByClassName('inner-answered-message')[document.getElementsByClassName('inner-answered-message').length - 1].classList.remove('anime-bubble-message')
                } else {
                    document.getElementsByClassName('im-message-content')[document.getElementsByClassName('im-message-content').length - 1].classList.remove('anime-bubble-message')
                }
                this.messageText = ''
                if(chatID === null) {console.log('chatID is null'); return}
                await ChatApi.updataField(chatID)
            }).catch(err => {
                console.log(err)
                // document.getElementsByClassName('inner-answered-message')[document.getElementsByClassName('inner-answered-message').length - 1].classList.add('failure-bubble-message')
                document.getElementsByClassName('im-message-content')[document.getElementsByClassName('im-message-content').length - 1].classList.add('failure-bubble-message')
                localStorage.setItem('fail-message', messageContent)
            })
        },

        sliceText(text) {
            if (!text) text = 'default message'
            var sliced = text.slice(0,120);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        },

        ...mapMutations('contextmenu', {
            setidSelectedMessage: 'setidSelectedMessage',
            setcurr_messageInstance: 'setcurr_messageInstance',
        }),
        ...mapMutations({
            setuser_to_id: 'setuser_to_id',
        }),
        ...mapMutations('filexchange', {
            setFileObj: 'setFileObj',
            setObjectUserData: 'setObjectUserData',
            setcountIndex: 'setcountIndex',
        }),

        ...mapActions('filexchange', {
            uploadFileToCloud: 'uploadFileToCloud',
        }),
    },


    components: {
        BannerUpComp,
        BannerBottomComp,
        SettingsMenuChatIdComp,
        MiniListLastChatsComp,
        MiniChatComp,
        viewPhotoWindow,
        ContextMenuMessage,
        AnswerOnMessage,
        EditMessageWindow,
    }
}
</script>

<style scoped lang="scss">

.failure-bubble-message {
    background: #ff0000;

}

.anime-bubble-message {
    animation: change-background 3s ease infinite;
    // background: linear-gradient(-90deg, #dbdbdb, #b5b5b5, #707070, #00ff80);
    background: linear-gradient(-90deg, #cacaca, #a7a7a7, #7e7e7e, #484848);
    transition: .6s;
}

@keyframes change-background {
	0% {
		background-position: 0% 25%;
	}
    15% {
        background-position: 25% 50%;
    }
    25% {
        background-position: 50% 75%;
    }
    40% {
        background-position: 75% 100%;
    }
	50% {
		background-position: 100% 75%;
	}
    75% {
        background-position: 75% 50%;
    }
    85% {
        background-position: 50% 25%;
    }
	100% {
        background-position: 25% 0%;
	}
}

$color-back: rgba(19, 19, 19, 0.4);
$color-back-message-bubble: rgba(22, 22, 22, 0.8);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff5900;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;

$cool-back-gradient-color: linear-gradient(45deg, #ff216d, #2196f3);

:root {
    --th-color: blue;
}

.main-window-chat{
    width: 100%;
    height: 100%;
    background: rgb(7, 7, 7);

    #kali-logo-chat {
        pointer-events: none;
        opacity: .3;
        z-index: 0;
        position: absolute;
        margin: 0;
        top: 50%;
        left: 60%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    .content-win-chat {
        .chat-window {
            width: 100%;
            height: 100vh;
            background: rgba(5, 5, 5, .5);
            padding-top: 40px;
            padding-bottom: 40px;

            .empty-title-won {
                position: absolute;
                margin: 0;
                top: 50%;
                left: 65%;
                margin-right: -50%;
                transform: translate(-50%, -50%);
                font-family: Lato,sans-serif;
                font-weight: 900;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: .02em;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                word-wrap: break-word;
                // background-color: #ff216d;

                span {
                    color: white;
                }
            }

        .generl-list-messages {
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            // position: relative;
            width: 100%;
            height: 100%;
            overflow:scroll;
            overflow-x: hidden !important;

            .selected-mess-sys {
                top: 0;
                position: absolute;
                width: 71%;
                height: 60px;
                background: rgb(7, 7, 7);
                display: flex;
                align-items: center;
                padding: 15px;
                z-index: 15;
                .count-sel-mess {
                    color: wheat;
                }

                img {
                    width: 15px;
                    height: 15px;
                    margin-left: auto;

                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
            }

            .outer-container{
                padding: 10px;
                width: 100%;
                height: auto;
                .container-hide-box {
                    padding: 15px;
                    border-radius:10px;
                    width: auto;
                    height: auto;
                    background: rgba(10, 10, 10, 0.65);
                    font-size: 17px;
                    backdrop-filter: blur(4.2px);
                    -webkit-backdrop-filter: blur(4.2px);
                    z-index: 4;
                }

                .inner-container {
                    display: grid;
                    // background-color: #00cec7;
                    width: 100%;
                    
                    padding: 8px;
                    margin-top: 10px;
                    
                    .message-bubble {
                        height: auto;
                        z-index: 1;
                        // background-color:$color-back-message-bubble;
                        
                        .answered-message-content {
                            display: grid;
                            right: 0;

                            background-size: 300% 300%;
                            width: auto;
                            height: auto;
                            position: relative;

                            .inner-answered-message {
                                width: fit-content;
                                height: auto;

                                background-color: #101010;
                                border-radius: 10px;
                                // float: right;
                                display:flex;
                                flex-direction: column;
                                color: #fff;
                                max-width: 47%;
                                padding: 8px 12px 8px 12px;
                                position: relative;

                                .trigger {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    margin: 0;
                                    border-radius: 10px;
                                    // background-color: #00ff80;
                                    transform: translateX(-10px) translateY(-10px);
                                }


                                .answer-box {
                                    border-left: 1px solid #00cec7;
                                    padding-left: 10px;
                                    width: 100%;
                                    height: 50%;
                                    font-weight: 600;
                                    color: rgb(168, 168, 168);
                                    font-size: 13px;
                                    font-family: system-ui;
                                    line-height: 20px;

                                    // &:hover{
                                    //     cursor: pointer;
                                    //     opacity: .7;
                                    //     transition: .5s;
                                    // }
                                }

                                .text-message {
                                    width: auto;
                                    height: auto;
                                    margin-top: 7px;
                                    background-size: 300% 300%;
                                    word-wrap: break-word;

                                }
                            }
                        }

                        .file-content {
                            display: grid;
                            right: 0;

                            .inner-file-container {
                                background-color: #00cec7;
                                border-radius: 10px;
                                float: right;
                                display:flex;
                                align-items: center;
                                padding: 10px;
                                color: #fff;

                                .inner-box-data-of-file {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    margin-left: 10px;
                                }

                                img {
                                    width: 40px;
                                    height: 40px;
                                    &:hover {
                                        cursor: pointer;
                                    }
                                }
                            }

                        }

                        .image-content {
                            right: 0;
                            // background-color: #ff216d;   
                            display: grid;
                             
                            .data-created-img {
                                // position: absolute;
                                // // width: ;
                                color: white;
                                // margin-left: auto;
                                font-size: 12px;
                                z-index: 5;
                                float: right;
                            }

                            img{ 
                                width: 200px;
                                height: 250px;
                                float: right;
                                border: 3px solid #333;
                                object-fit: cover;

                                &:hover{
                                    cursor: pointer;
                                }
                                // margin-left: auto;


                            }
                        }
                    }

                }


                #addresator {
                        color: $color-text;
                    }
                
                .im-message-content:hover {
                    cursor:default;
                    // background-color: #1e1c1cc6;
                }
                .im-message-content {
                    // box-shadow: 0 0 10px #1D8BE1;
                    border-radius: 10px;
                    float: right;
                    background-size: 300% 300%;
                    word-wrap: break-word;
                    width: auto;
                    max-width: 47%;
                    height: auto;
                    padding: 8px 12px 8px 12px;
                    display: flex;
                    flex-direction: column;
                    transition: .4s;
                    font-weight: 600;
                    color: rgb(168, 168, 168);
                    font-size: 13px;
                    font-family: system-ui;
                    line-height: 20px;

                    // animation-duration: .5s;
                    // animation: slidein;
                }
            }
        }
    }
    }
}

// @keyframes slidein {
//   from {
//     margin-left: 100%;
//     width: 300%;
//   }

//   to {
//     margin-left: 0%;
//     width: 100%;
//   }
// }


.fade-comp-settChatId-v-enter-active,
.fade-comp-settChatId-v-leave-active {
  transition: opacity 0.3s ease;
}

.fade-comp-settChatId-v-enter-from,
.fade-comp-settChatId-v-leave-to {
  opacity: 0;
}

//LIST ANIME

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0
}



@keyframes ldio-irfwm47jvi {
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
}
.ldio-irfwm47jvi div {
  position: absolute;
  animation: ldio-irfwm47jvi 1s linear infinite;
  width: 14px;
  height: 14px;
//   top: 92px;
//   left: 92px;
  border-radius: 50%;
  box-shadow: 0 1px 0 0 #0a0a0a;
  transform-origin: 8px 8.5px;
}
.loadingio-spinner-eclipse-pguwq2zyapl {
  width: 15px;
  height: 15px;
//   padding: 10px;
  display: inline-block;
  overflow: hidden;
  margin-left: auto;
}
.ldio-irfwm47jvi {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-irfwm47jvi div { box-sizing: content-box; }


.bounce-bubble-message-enter-active {
  animation: bounce-in .9s ease-out both;
}

.bounce-bubble-message-leave-active {
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

// .bounce-bubble-message-enter-active {
//   transition: all .2s ease-out;
// }

// .bounce-bubble-message-leave-active {
//   transition: all .2s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .bounce-bubble-message-enter-from,
// .bounce-bubble-message-leave-to {
//   transform: translateX(20px);
//   opacity: 0;
// }


</style>