function scrollDownChat(documentId) {
    // let block = document.getElementById("block-chat-window-id")
    let block = document.getElementById(documentId);
    block.scrollTop = block.scrollHeight
}

export {
    scrollDownChat
}