
const toastModule = {
    namespaced: true,
    state: () => ({
        isList: [],
    }),
    mutations: {
        addToast(state, value) {
            let checker = (id) => {
                if(state.isList.length === 0)
                {
                    clearInterval(id)
                    console.log('interval been to end', id)
                } else {
                    return
                }
            }
            state.isList.push(value)
            const idInterval = setInterval(() => {
                let deletedElement = state.isList.pop()
                console.log('elemnt from array been deleted', deletedElement)
                checker(idInterval)
            }, 5000)
        },
        clearToast(state) {
            state.isList = []
        },
        deleteToast(state, toast) {
            console.log(state.isList, toast)
        },
    },
    actions: {

    },
    getters: {

    },
}

export default toastModule