import { doc, getDoc} from "firebase/firestore"
import { db } from "@/main"
const playerModule = {
    namespaced: true,
    state: () => ({
        showBtnPlay: true,
        isArray: [],
        currentSong: null,
        currentSongId: null,


        currentAudioElement: null,
        timeContainer: null,
        inputElement: null,
        CurrentTime: null,
        ProgressInline: null
    }),
    mutations: {
        setMusicsInArray(state, value) {
            state.isArray = value
            console.log('setMusicsInArray', value)
        },
        clearisArray(state) {
            state.isArray = []
            state.isArray.length = 0
        },
        setCurrentSong(state, value) {
            state.currentSong = value
        },
        setCurrentSongId(state, value) {
            state.currentSongId = value
            console.log('setCurrentSongId', value)

        },
        closeBtnPlayMusic(state) {
            state.showBtnPlay = false
        },
        showBtnPlayMusic(state) {
            state.showBtnPlay = true
        },

        setProgressInline(state, val) {
            state.ProgressInline = val
        },
        setSliderMaxUnix(state){
            state.inputElement.max = Math.floor(state.currentAudioElement.duration)
        },
        setCurrentTimeElement(state, val) {
            state.CurrentTime = val
        },
        setInput(state, val) {
            state.inputElement = val
        },
        setTimeContainer(state, val) {
            state.timeContainer = val
        },
        setAudioElement(state, value) {
            state.currentAudioElement = value
        },
    },
    actions: {
        playMusicUnix({state, getters, commit}, audio) {
            if(audio === 'last')
            {
                console.log('last element played', state.currentAudioElement)
                state.currentAudioElement.play()
                commit('closeBtnPlayMusic')
            } else {
                commit('closeBtnPlayMusic')
                commit('setAudioElement', audio)
                let audioElement = state.currentAudioElement
                audioElement.play()
                audioElement.addEventListener('timeupdate', () => {
                    const {duration, currentTime} = audioElement
                    const progresscountPercent = (currentTime / duration) * 100
                    let progrssBuffer = state.ProgressInline
                    progrssBuffer.style.width = `${progresscountPercent}%`
                    state.inputElement.value = Math.floor(currentTime)
                    state.timeContainer.textContent = getters.calculateTimeUnixForCurrTime
                })
            }
        },
        stopAudio({state, commit}) {
            commit('showBtnPlayMusic')
            state.currentAudioElement.pause()
        },
        displayAudioDurationUnix(context)
        {
            context.state.timeContainer.textContent = context.getters.calculateTimeUnix
        },
        setCurrentTimeUnix({state, getters}) {
            state.textContent = getters.calculateTime
        },
        setCurrentTimeToAudio({state}) {
            let audio = state.currentAudioElement
            audio.currentTime = state.inputElement.value
            console.log(state.inputElement.value)
        },
        request_getAllMusicsById(context) {
            console.log(context.state.isArray)
        },
        async getSongById(context) {
            if(context.state.currentSongId)
            {
                const refSong = doc(db, "musics", context.state.currentSongId)
                const docSnap = await getDoc(refSong);
                if(docSnap.exists())
                {
                    console.log(docSnap.data())
                } else {
                    console.log('so music is not exists!')
                }
            }
        }
    },
    getters: {
        calculateTimeUnix(state) {
            const minutes = Math.floor(state.currentAudioElement.duration / 60);
            const seconds = Math.floor(state.currentAudioElement.duration % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        },
        calculateTimeUnixForCurrTime(state) {
            const minutes = Math.floor(state.inputElement.value / 60);
            const seconds = Math.floor(state.inputElement.value % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        },
        returnAudioElementId(state) {
            return state.currentSongId
        }
    }
}

export default playerModule