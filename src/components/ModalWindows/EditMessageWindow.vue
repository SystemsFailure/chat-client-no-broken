<template>
    <div class="main-class-edit-mess-window">
        <span>edit message - id - {{ currentMessageEditId }}</span>

        <div class="input-box">
            <!-- <input type="text" placeholder="new message" > -->
            <textarea name="textarea-for-edit-mess" id="textarea-for-edit-mess-id" :value="currmessText"></textarea>
        </div>

        <div class="btns-box">
            <div class="btn-edit btn-"
                @click="editMessage"
            >
                edit
            </div>
            <div class="cancel-btn btn-" @click="this.$emit('closeEditMessageWindow', false)">
                cancel
            </div>
        </div>
    </div>
</template>
<script>
import { MessagesApi } from '@/api/MessagesController';
export default {
    data() {
        return {
            
        }
    },
    
    props: {
        currmessText: {},
        currentMessageEditId: {},
    },

    mounted() {
        const textareaElem = document.getElementById('textarea-for-edit-mess-id')
        textareaElem.focus()

        textareaElem.addEventListener('keydown', (e) => {
            // if(e.code === 'Enter' || !e.shiftKey) {
            //     this.editMessage()
            // }
            if(e.code === 'Escape')
            {
                this.$emit('closeEditMessageWindow', false)
            }  
        })
    },

    methods: {
        editMessage() {
            if(this.currentMessageEditId)
            {
                if(this.currentMessageEditId)
                {
                    let newContent = document.getElementById('textarea-for-edit-mess-id').value
                    MessagesApi.editMessage(this.currentMessageEditId, newContent).then(() => {
                        this.$emit('updateMessage', this.currentMessageEditId, newContent, 'edit')
                        this.$emit('closeEditMessageWindow', false)
                    })
                }
            }  
        },
    
    }
}
</script>
<style lang="scss" scoped>

.main-class-edit-mess-window {
    position: absolute;
    width: 300px;
    background-color: rgba($color: #000000, $alpha: .5);
    z-index: 11;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 20px;

    .input-box {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        padding: 5px;
        margin: 0;
        border: 1px solid #111;
        margin-top: 15px;

        textarea {
            height: 100%;
            padding: 5px;
            color: #999;
            font-size: 12px;
            border: none;
            outline: none;
            background: none;
            max-width: 100%;
            max-height: 100px;
            min-width: 100%;
        }
    }

    span {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        padding: 10px;
        color: #888;
        font-family: Lato,sans-serif;
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: .02em;
    }

    .btns-box {
        margin-top: 25px;
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        // padding-left: 30px;
        // padding-right: 30px;

        .btn-edit {
            background-color: dodgerblue;
            border-radius: 5px;
            color: white;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .cancel-btn {
            background-color: rgba($color: #000000, $alpha: .5);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn- {
            padding: 8px;
            font-family: Lato,sans-serif;
            font-weight: 700;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .02em;

            &:hover {
                cursor: pointer;
                opacity: .7;
                transition: .3s;
            }
        }
    }
}

</style>