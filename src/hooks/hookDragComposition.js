import {ref} from 'vue'


export default function dragApi() {

    let element = null

    let positionW = ref(0) 
    let positionH = ref(0) 
    let positionX = ref(0)
    let positionY = ref(0)


    function dragElement(element_) {
        element = element_
        if (document.getElementById(element + 'header-simple')) {
            document.getElementById(element + 'header-simple').onmousedown = dragMouseDown
        } else {
            element.onmousedown = dragMouseDown
        }
    }

    const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;

        document.body.style.pointerEvents = 'all'
    }

    const elementDrag = (event) => {
        event = event || window.event
        positionW.value = positionX.value - event.clientX
        positionH.value = positionY.value - event.clientY
        positionX.value = event.clientX
        positionY.value = event.clientY


        element.style.top = (element.offsetTop - positionH.value) + 'px'
        element.style.left = (element.offsetLeft - positionW.value) + 'px'

        document.body.style.pointerEvents = 'none'


    }

    const dragMouseDown = (event) => {
        event = event || window.event
        positionX.value = event.clientX
        positionY.value = event.clientY


        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }

    return {
        dragElement
    }


}