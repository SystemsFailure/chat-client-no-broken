<template>
    <div class="lclass-context-menu">
        <div class="inner">
            <div 
                class="item" 
                v-for="it in listItemsContextMenu" 
                :key="it.id"
                @click="onItem(it.vl, it)"
                >
                <img :src="require(`@/assets/svgassets/${it.iurl}`)" alt="">
                <span :style="it.vl === 'delete' ? {'color' : 'red'} : {'color' : '#999'}">
                    {{ it.text }}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import { ChatApi } from '@/api/ChatController'
export default {
    data() {
        return {
            listItemsContextMenu: [
                {id: 0, text: 'select', vl: 'select', iurl: 'icons8-галочка.svg'},
                {id: 2, text: 'answer', vl: 'answer', iurl: 'icons8-отправить-комментарий-96.png'},
                {id: 5, text: 'edit', vl: 'edit', iurl: 'icons8-карандаш-90.png'},
                {id: 6, text: 'collection', vl: 'collection', iurl: 'icons8-закладка-лента.svg'},
                {id: 4, text: 'save', vl: 'save', iurl: 'icons8-экспорт-90.png'},
                {id: 1, text: 'copy text', vl: 'copy', iurl: 'icons8-копия-2-96.png'},
                {id: 3, text: 'delete', vl: 'delete', iurl: 'icons8-удалить-навсегда-90-rd.png'},
            ],
        }
    },

    computed: {
        ...mapState('contextmenu', {
            idSelectedMessage: 'idSelectedMessage'
        }),
        ...mapState({
            user_to_id: 'user_to_id',
        }),
    },

    methods: {
        async getChatId() {
            let chatID = null
            let user_id = localStorage.getItem('user-id') ? localStorage.getItem('user-id') : null
            if(this.user_to_id && user_id) {
                await ChatApi.getChat({toID: this.user_to_id, fromID: user_id}).then( async chat => {
                    chatID = chat[0].id
                }).catch(err => {
                    console.log(err)
                })
            }
            console.log(chatID, user_id, this.user_to_id)
            return {chatid: chatID}
        },
        ...mapActions('contextmenu', {
            deleteMessageById: 'deleteMessageById',
        }),
        ...mapMutations('toast', {
            addToast: 'addToast',
        }),
        async onItem(vl) {
            if(vl === 'edit')
            {
                this.$emit('editMessageFunction', this.idSelectedMessage)
                this.$emit('closeContextmenuFunction', false)
                this.$emit('showEditMessWindowFunction')
            }
            if(vl === 'answer')
            {
                this.$emit('answerOnMessageFunction', this.idSelectedMessage)
                this.$emit('closeContextmenuFunction', false)
            }
            if(vl === 'copy')
            {
                this.$emit('copyTextFromMessageFunction', this.idSelectedMessage)
                this.$emit('closeContextmenuFunction', false)
            }
            if(vl === 'select')
            {
                console.log('select', this.idSelectedMessage)
                this.$emit('visSelSysFunction', this.idSelectedMessage)

            }
            if(vl === 'delete')
            {
                if(this.idSelectedMessage != undefined || this.idSelectedMessage != null)
                {
                    this.deleteMessageById()
                    this.addToast(
                        {id: this.idSelectedMessage, icon: 'delete document', textContent: 'The document has been deleted', type: 'red', typeOf: 'delete',  bottContent: 'The document (message) was successfully deleted from the block, it is impossible to restore it'},

                    )
                    this.$emit('closeContextmenuFunction', false)
                    this.$emit('updateMessageHelper', this.idSelectedMessage, null, 'delete')
                    // let {chatid} = await this.getChatId()
                    // console.log('chatid', chatid)
                    // ChatApi.decrimentField(chatid)
                    console.log('deleted mess with id == ', this.idSelectedMessage)
                }
            }
        },
    }
}
</script>
<style lang="scss" scoped>

.lclass-context-menu {
    width: 200px;
    height: auto;
    background: rgba($color: #090909, $alpha: 1.0);
    position: absolute;
    z-index: 15;
    border-radius: 10px;

    .inner {
        width: 100%;
        height: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;

        .item {
            padding: 8px;
            color: #999;
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 500;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            width: 100%;
            display: flex;
            align-items: center;
            // justify-content: center;

            img {
                margin-right: 8px;
                width: 20px;
                height: 20px;
            }

            &:hover {
                cursor: pointer;
                opacity: .5;
                transition: .3s;
            }
        }
    }
}

</style>