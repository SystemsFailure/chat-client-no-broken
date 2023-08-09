

const audioDriver = {
    state: () => ({

    }),

    mutations: {

    },

    actions: {
        recorder() {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then(strean => {
                    const mediaRecorder = new MediaRecorder(strean)
                    let voice = []
                    document.getElementById('recordVoice').addEventListener('click', () => {
                        mediaRecorder.start()
                    })

                    mediaRecorder.addEventListener('dataavailable', (event) => {
                        voice.push(event.data)
                    })

                    document.getElementById('stop-unv-btn').addEventListener('click', () => {
                        mediaRecorder.stop()
                    })
                })
        },
    },

    getters: {

    },

    namespaced: true,
}

export default audioDriver