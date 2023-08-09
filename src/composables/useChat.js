

export default function useChat(vl_id_message, messageIdForAnswer, messageText, visibleAnswerWindow, focusOn_messageInput) {
    console.log(messageIdForAnswer, 'Message Id for Answer');

    let domElementMessage = document.getElementById(vl_id_message)
    if(domElementMessage.classList[1] === 'answered-mess-id-j') {
        console.log('dont can to answer on the answer')
    }
    messageIdForAnswer = vl_id_message
    messageText = domElementMessage.textContent
    visibleAnswerWindow = true
    focusOn_messageInput ++

}