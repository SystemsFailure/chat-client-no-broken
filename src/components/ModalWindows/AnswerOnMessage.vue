<template>
    <div class="answer-comp">
        <div class="on-message-box">
            <div class="img-box">
                <img src="@/assets/svgassets/icons8-отклик-96.png" alt="" srcset="">
            </div>

            <div class="wrapper">
                <div class="message-text">{{ sliceAnswerText(messageText) }}</div>
                <div class="id-message-box" @click="this.$emit('scrollViewToElementFunction', this.messageIdForAnswer)">id : {{ messageIdForAnswer }}</div>
            </div>
        </div>

        <div class="close-btn">
            <img src="@/assets/svgassets/icons8-удалить.svg" alt="" srcset="" @click="this.$emit('closeAnswerWindowFunction')">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },

    props: {
        messageText: {},
        messageIdForAnswer: {}
    },

    methods: {
        sliceAnswerText(text) {
            if (!text) text = 'default message'
            var sliced = text.slice(0,120);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        },
    }
}
</script>
<style lang="scss" scoped>
    
.answer-comp {
    width: 71%;
    height: 50px;
    position: absolute;
    background-color: #111;
    display: flex;
    align-items: center;
    bottom: 40px;
    z-index: 15;
    color: white;

    .on-message-box {
        display: flex;
        // flex-direction: column;
        // justify-content: center;
        align-items: center;
        width: 30%;
        height: auto;
        margin-right: auto;
        margin-left: 10px;

        .img-box {
            display: flex;
            align-items: center;
            height: 100%;
            img {
                width: 20px;
                height: 20px;
            }
        }

        .wrapper {
            margin-left: 10px;
            display: flex;
            // flex-direction: column;
            // justify-content: center;
            align-items: center;

            .message-text {
                width: 100%;
                // height: 5px;
                white-space: nowrap;
                display: flex;
                align-items: center;
            }

            .id-message-box {
                margin-left: 10px;
                font-size: 11px;

                &:hover {
                    cursor: pointer;
                    opacity: .8;
                    transition: .3s;
                }
            }
        }
    }

    .close-btn {
        margin-left: auto;
        margin-right: 20px;
        
        img {
            width: 15px;
            height: 15px;
            &:hover {
                cursor: pointer;
                opacity: .5;
                transition: .3s;
            }
        }
    }

}

</style>