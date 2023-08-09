<template>
    <div class="main-AudioComp">
        <div class="inner-container-deep">

            <div class="line-comp">
                <div class="toggle-line-tools">
                    <div class="icon"><i class="fi fi-bs-search"></i></div>
                    <input type="text" placeholder="search music" v-model="searchValue">
                    <div class="close-btn"><i class="fi fi-bs-cross"></i></div>
                </div>
                
                <div class="player">
                    <div class="inner-container-player">

                        <div class="controller">
                            <div class="priview"><i class="fi fi-bs-angle-double-left" @click="PlayerPreviewMusic"></i></div>
                            <div class="play-and-stop">
                                <i v-if="showPlay" class="fi fi-bs-play" @click="PlayerplaySong"></i>
                                <i v-else class="fi fi-bs-pause" @click="PlayerStopSong"></i>
                            </div>
                            <div class="next"><i class="fi fi-bs-angle-double-right" @click="PlayerMextMusic"></i></div>
                        </div>

                        <div class="data-music">
                            <div class="name-music"><span id="nameMusic-id"></span></div>
                            <div class="name-avtor" id="nameArtist-id"></div>
                        </div>

                        <div class="progress-audio">
                            <div class="abs-progress" id="audioPlayerContainer"></div>
                            <input type="range" id="volume-slider" value="0" @input="setCurrentTime" @change="setCurrentTimeToAudio">
                        </div>

                        <div class="time">
                            <div class="current-time" id="curr-time-id">00:00</div>
                            /
                            <div class="total-time" id="time-container-id">--:--</div>
                        </div>

                        <div class="tools">
                            <div class="add"><i class="fi fi-bs-plus"></i></div>
                            <div class="mix"><i class="fi fi-bs-shuffle"></i></div>
                            <div class="repeat"><i class="fi fi-bs-arrows-repeat-1"></i></div>
                            <div class="share"><i class="fi fi-bs-redo"></i></div>
                        </div>

                    </div>
                </div>


            </div>


            <div class="list-audio">
                    <div class="item-audio" v-for="audio in filterdMusicList" :key="audio.id" @mouseover="itemAudioOver($event, audio.id)" :id="`innerItem-${audio.id}`">
                        <audio :src="audio.url" class="audioClassNameBy" :id="audio.id"  loop></audio>
                        <div class="inner-item" :id="`inner${audio.id}`" @mouseout="itemAudioLeave($event, audio.id)">
                            <div class="inner-image-audio">
                                <div class="image-src">
                                    <i class="fi fi-bs-play" :id="`start-audio-btn-id--${audio.id}`" @click="playMusic(audio.id, audio)"></i>
                                    <i class="fi fi-bs-pause" style="font-size: 0px;" :id="`pause-audio-btn-id-${audio.id}`" @click="pauseMusic($event, audio.id)"></i>
                                </div>
                            </div>
                            <div class="tools-item">
                                <div class="add-audio"><i @click="addMusicToPersonalArray(audio.id)" class="fi fi-bs-plus"></i></div>
                                <div class="sett-audio"><i class="fi fi-bs-menu-dots-vertical"></i></div>
                            </div>
                        </div>


                        <div class="image-audio">
                            <img src="@/assets/voice-chat.png" alt="" srcset="">
                            <!-- <Transition name="anim-fade-effect">
                            </Transition> -->
    
                        </div>
                        <div class="data-audio">
                            <div class="name-audio">{{ audio.name }}</div>
                            <div class="name-artist"><span>{{ audio.artist }}</span></div>
                        </div>
                        <div class="time-audio"><span :id="'time' + audio.id">0:00</span></div>
                    </div>
                <!-- </transition-group> -->

            </div>

        </div>    
    </div>
</template>
<script>
import { MusicApi } from '@/api/MusicController'

export default {
    data() {
        return {
            userId: localStorage.getItem('user-id'),
            showPlay: true,
            audioList: [],
            currId: null,
            indexMusic: null,
            progressInput: null,
            searchValue: '',
        }
    },


    mounted() {
        this.getAll().then(() => {
            this.progressInput = document.getElementById('volume-slider')
            this.audioList.forEach((elem) => {
                let id = elem.id
                let audio = document.getElementById(id)
                if(audio) {
                    if(audio.readyState > 0) {
                        this.setAllSongsTimeToInitialization(audio.duration, id)
                    } else {
                        audio.addEventListener('loadedmetadata', () => {
                            this.setAllSongsTimeToInitialization(audio.duration, id)
                        })
                    }
                }
            })
        })
    },

    computed: {
        filterdMusicList() {
            return this.audioList.filter(audio => {
                return audio.name.includes(this.searchValue) 
            })
        }
    },

    methods: {
        displayAudioDuration(duration)
        {
            let timeContainer = document.getElementById('time-container-id')
            timeContainer.textContent = this.calculateTime(duration)
        },

        displayBufferedAmount(id) {
            let audio = document.getElementById(id)
            let progress = document.getElementById('audioPlayerContainer')
            const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1))
            progress.style.setProperty('width', `${(bufferedAmount / this.progressInput.max) * 100}%`)
        },

        setAllSongsTimeToInitialization(duration, id) {
            let timeContainerOnAduio = document.getElementById('time' + id)
            timeContainerOnAduio.textContent = this.calculateTime(duration)
        },

        calculateTime(secs) {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        },

        setCurrentTime() {
            document.getElementById('curr-time-id').textContent = this.calculateTime(this.progressInput.value)
        },

        setCurrentTimeToAudio(e) {
            if (this.currId)
            {
                let audio = document.getElementById(this.currId)
                audio.currentTime = e.target.value
            } else return
        },

        setSliderMax(secondsSlider, duration){
            secondsSlider.max = Math.floor(duration)
        },
        
        playMusic(audioId, audio_) {
            if(this.currId === null) this.currId = audioId 
            if(audioId != this.currId)
            {
                document.getElementById(this.currId).load()
                this.progressInput.value = 0
            }
            this.currId = audioId
            if(this.audioList.indexOf(audio_) != -1) {
                this.indexMusic = this.audioList.indexOf(audio_)
            }
            let audio = document.getElementById(audioId)
            this.displayAudioDuration(audio.duration)
            document.getElementById('nameMusic-id').innerText = this.slice_last_message(audio_.name)
            document.getElementById('nameArtist-id').innerText = this.slice_last_message(audio_.artist)
            this.setSliderMax(this.progressInput, audio.duration)
            document.getElementById('start-audio-btn-id--' + audioId).style.fontSize = '0px'
            document.getElementById('pause-audio-btn-id-' + audioId).style.fontSize = '14px'
            this.showPlay = false
            audio.play()
            audio.addEventListener('timeupdate', () => {
                const {duration, currentTime} = audio
                const progresscountPercent = (currentTime / duration) * 100
                let progrssBuffer = document.getElementById('audioPlayerContainer')
                progrssBuffer.style.width = `${progresscountPercent}%`
                this.progressInput.value = Math.floor(audio.currentTime)
                document.getElementById('curr-time-id').textContent = this.calculateTime(this.progressInput.value)
            })
            let listAudio = document.getElementsByClassName('audioClassNameBy')
            for (let index = 0; index < listAudio.length; index++) {
                const element = listAudio[index]
                if(element.id != audioId)
                {
                    element.pause()
                    document.getElementById('start-audio-btn-id--' + element.id).style.fontSize = '14px'
                    document.getElementById('pause-audio-btn-id-' + element.id).style.fontSize = '0px'
                }
            }
        },

        pauseMusic(event, audioId) {
            let audio = document.getElementById(audioId)
            event.target.style.fontSize = '0px'
            document.getElementById('start-audio-btn-id--' + audioId).style.fontSize = '14px'
            this.showPlay = true
            audio.pause()
        },
        
        addMusicToPersonalArray(id) {
            MusicApi.setMusicInArrayPersonalMusicList(this.userId, id).then(successMessage => {
                console.log(successMessage)
            }).catch(err => console.log(err))
        },

        PlayerplaySong() {
            if(!this.currId) {
                this.currId = this.audioList[0].id
                // let audio = document.getElementsByClassName('audioClassNameBy')[0]
                let audio = document.getElementById(this.audioList[0].id)
                this.displayAudioDuration(audio.duration)
                this.setSliderMax(this.progressInput, audio.duration)
                document.getElementById('start-audio-btn-id--' + this.audioList[0].id).style.fontSize = '0px'
                document.getElementById('pause-audio-btn-id-' + this.audioList[0].id).style.fontSize = '14px'
                this.showPlay = false
                audio.play()
                audio.addEventListener('timeupdate', () => {
                    const {duration, currentTime} = audio
                    const progresscountPercent = (currentTime / duration) * 100
                    let progrssBuffer = document.getElementById('audioPlayerContainer')
                    progrssBuffer.style.width = `${progresscountPercent}%`
                    this.progressInput.value = Math.floor(audio.currentTime)
                    document.getElementById('curr-time-id').textContent = this.calculateTime(this.progressInput.value)
                })
            } else {
                this.playMusic(this.currId, this.audioList[this.indexMusic])
            }
        },

        PlayerStopSong() {
            let audio = document.getElementById(this.currId)
            document.getElementById('start-audio-btn-id--' + this.currId).style.fontSize = '14px'
            document.getElementById('pause-audio-btn-id-' + this.currId).style.fontSize = '0px'
            this.showPlay = true
            audio.pause()
        },

        PlayerMextMusic() {
            if(this.indexMusic >= 0)
            {
                this.indexMusic++
                if(this.indexMusic > this.audioList.indexOf(this.audioList[this.audioList.length - 1])) {
                    this.indexMusic = 0
                }
                this.playMusic(this.audioList[this.indexMusic].id, this.audioList[this.indexMusic])
            } else {console.log(this.indexMusic, 'not')}
        },

        PlayerPreviewMusic() {
            this.indexMusic--
            if(this.indexMusic < 0) {
                this.indexMusic = this.audioList.length - 1
            }
            this.playMusic(this.audioList[this.indexMusic].id, this.audioList[this.indexMusic])
        },

        slice_last_message(text) {
            if (!text) text = 'default message'
            var sliced = text.slice(0,10);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        },

//         abstractPlayMethod() {},
//         // audioChange(id) {this.currId = id},

//         startMusic(e, id) {
//             this.currId = id
//             let audio = document.getElementById(this.currId)
//             this.setSliderMax(this.secondsSlider, audio.duration)
//             this.displayBufferedAmount(this.currId)
//             this.displayAudioDuration(audio.duration)
//             audio.addEventListener('progress', () => {
//                 this.displayBufferedAmount(this.currId)
//             })
//             audio.play()
//             requestAnimationFrame(this.whilePlaying)
//             this.showPlay = false
//             e.target.style.fontSize = '0px'
//             document.getElementById('pause-audio-btn-id-' + id).style.fontSize = '14px'
//             let listAudio = document.getElementsByClassName('audioClassNameBy')
//             for (let index = 0; index < listAudio.length; index++) {
//                 const element = listAudio[index]
//                 if(element.id != id)
//                 {
//                     element.pause()
//                     document.getElementById('start-audio-btn-id--' + element.id).style.fontSize = '14px'
//                     document.getElementById('pause-audio-btn-id-' + element.id).style.fontSize = '0px'
//                 }
//             }
//         },

//         stopMusic(e, id) {
//             let audio = document.getElementById(this.currId)
//             audio.pause()
//             cancelAnimationFrame(this.raf)
//             this.showPlay = true
//             e.target.style.fontSize = '0px'
//             document.getElementById('start-audio-btn-id--' + id).style.fontSize = '14px'
//         },


//        ///////////////////////////////////////////////////////////////// // Play and pause methods - start /////////////////////////////////////////////////////////////////
//         playSong() {
//             let audio = document.getElementById(this.currId)
//             this.setSliderMax(this.secondsSlider, audio.duration)
//             this.displayBufferedAmount(this.currId)
//             this.displayAudioDuration(audio.duration)
//             audio.addEventListener('progress', () => {
//                 this.displayBufferedAmount(this.currId)
//             })
//             // audio.addEventListener('timeupdate', () => {
//             //     const duration = audio.duration;
//             //     let progress = document.getElementById('audioPlayerContainer')
//             //     if (duration > 0) {
//             //         progress.style.width = `${audio.currentTime / duration * 100}%`
//             //     }
//             // })
//             audio.play()
//             requestAnimationFrame(this.whilePlaying)
//             this.showPlay = false
//         },

//         pauseSong() {
//             let audio = document.getElementById(this.currId)
//             audio.pause()
//             cancelAnimationFrame(this.raf)
//             this.showPlay = true
//         },
//         /////////////////////////////////////////////////////////////////// Play and pause methods - end /////////////////////////////////////////////////////////////////


//         ///////////////////////////////////////////////////////////////// Установка текущего положения аудио в input - changed - start /////////////////////////////////////////////////////////////////
//         setCurrentTimeToAudio(e) {
//             let cId = this.currId ? this.currId : null
//             if (cId)
//             {
//                 let audio = document.getElementById(cId)
//                 audio.currentTime = e.target.value
//                 if(!audio.paused)
//                 {
//                     requestAnimationFrame(this.whilePlaying)
//                 }
//             } else return
//         },
//         ///////////////////////////////////////////////////////////////// Установка текущего положения аудио в input - emd /////////////////////////////////////////////////////////////////


//         ///////////////////////////////////////////////////////////////// Установка текущего положения аудио в input /////////////////////////////////////////////////////////////////
//         setCurrentTime() {
//             let audio = document.getElementById(this.currId)
//             document.getElementById('curr-time-id').textContent = this.calculateTime(this.secondsSlider.value)
//             if(!audio.paused)
//             {
//                 cancelAnimationFrame(this.raf)
//             }
//         },
//         ///////////////////////////////////////////////////////////////// Установка текущего положения аудио в input /////////////////////////////////////////////////////////////////
        

//         ///////////////////////////////////////////////////////////////// увеличение width прогресса /////////////////////////////////////////////////////////////////
//         displayBufferedAmount(id) {
//             let audio = document.getElementById(id)
//             let progress = document.getElementById('audioPlayerContainer')
//             const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1))
//             progress.style.setProperty('width', `${(bufferedAmount / this.secondsSlider.max) * 100}%`)
//         },
//         ///////////////////////////////////////////////////////////////// увеличение width прогресса /////////////////////////////////////////////////////////////////


//         ///////////////////////////////////////////////////////////////// установка максимального значения /////////////////////////////////////////////////////////////////
//         setSliderMax(secondsSlider, duration){
//             secondsSlider.max = Math.floor(duration)
//         },
//         ///////////////////////////////////////////////////////////////// установка максимального значения /////////////////////////////////////////////////////////////////


//         setAllSongsTimeToInitialization(duration, id) {
//             let timeContainerOnAduio = document.getElementById('time' + id)
//             timeContainerOnAduio.textContent = this.calculateTime(duration)
//         },

//         ///////////////////////////////////////////////////////////////// установка времени в input величину аудио, 2 и установка всем аудио свое время в процессе инициализации /////////////////////////////////////////////////////////////////
//         displayAudioDuration(duration)
//         {
//             let timeContainer = document.getElementById('time-container-id')
//             timeContainer.textContent = this.calculateTime(duration)
//         },
//         ///////////////////////////////////////////////////////////////// установка времени в input величину аудио, 2 и установка всем аудио свое время в процессе инициализации /////////////////////////////////////////////////////////////////


//         ///////////////////////////////////////////////////////////////// разчеты /////////////////////////////////////////////////////////////////
//         calculateTime(secs) {
//             const minutes = Math.floor(secs / 60);
//             const seconds = Math.floor(secs % 60);
//             const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
//             return `${minutes}:${returnedSeconds}`;
//         },
//         ///////////////////////////////////////////////////////////////// разчеты /////////////////////////////////////////////////////////////////


// // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN


//         whilePlaying() {
//             if(this.currId){
//                 let audio = document.getElementById(this.currId)
//                 if(audio) {
//                     let secondsSlider = document.getElementById('volume-slider')
//                     let audioPlayerContainer = document.getElementById('audioPlayerContainer')
//                     secondsSlider.value = Math.floor(audio.currentTime)
//                     document.getElementById('curr-time-id').textContent = this.calculateTime(secondsSlider.value)
//                     audioPlayerContainer.style.setProperty('width', `${secondsSlider.value / secondsSlider.max * 100}%`)
//                     this.raf = requestAnimationFrame(this.whilePlaying)
//                 }
//             }
//         },

// NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN




















        async getAll() {
            await MusicApi.getAllMusicsDocs().then(arr => {
                this.audioList = arr
            }).catch(err => console.log(err))
        },

        itemAudioOver(e, id) {
            let elem = document.getElementById(`inner${id}`)
            if (elem)
            {
                elem.style.zIndex = 1
                elem.style.display = 'flex'
            } else {
                return
            }
        },

        itemAudioLeave(e, id) {
            e.target.style.zIndex = -1
            let itemList = document.getElementsByClassName('inner-item')
            for (let index = 0; index < itemList.length; index++) {
                const element = itemList[index]
                if (element.id === id)
                {
                    return
                } else {
                    element.style.zIndex = -1
                    element.style.display = 'none'
                }
                
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.main-AudioComp {
    position: absolute;
    width: 96%;
    height: 100%;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12.2px);
    -webkit-backdrop-filter: blur(12.2px);
    .inner-container-deep {
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .5);
        // z-index: 99;

        .line-comp {
            height: 100px;
            width: 100%;
            position: relative;

            .player {
                position: absolute;
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                color: white;
                bottom: 0;
                border-bottom: 1px solid #333;
                border-top: 1px solid #333;

                .inner-container-player {
                    background-color: rgba($color: #000000, $alpha: .8);
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;

                    .tools {
                        display: flex;
                        width: 120px;
                        height: 100%;
                        align-items: center;
                        justify-content: space-between;
                        padding-top: 4px;
                        margin-left: 25px;
                        .add {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .mix {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .repeat {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .share {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                    }

                    .time {
                        padding: 5px;
                        display: flex;
                        align-items: center;
                        height: 100%;
                        font-size: 12px;

                        .current-time {
                            margin-left: 10px;
                            margin-right: 5px;


                        }

                        .total-time {
                            margin-left: 5px;

                        }
                    }

                    .controller {
                        padding: 7px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 14px;
                        width: 70px;
                        height: 100%;
                        padding-top: 11px;
                        margin-left: 15px;
                        

                        .priview {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .play-and-stop {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .next {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                    }

                    .data-music {
                        height: 100%;
                        padding: 7px;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .name-music {
                            font-size: 14px;
                            margin-left: 10px;
                            font-weight: 700;

                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }

                        }

                        .name-avtor {
                            // text-transform: uppercase;
                            font-size: 12px;
                            margin-left: 10px;

                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }
                    }
                }
            }

            .progress-audio {
                display: flex;
                align-items: center;
                // justify-content: center;
                width: 50%;
                margin-left: 10px;
                height: 5px;
                position: relative;

                .abs-progress {
                    position: absolute;
                    width: 0%;
                    height: 4px;
                    background-color: rgba($color: #00fff2, $alpha: 1);
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    cursor: pointer;
                    width: 100%;
                    z-index: 11;
                }

                input[type="range"]::-webkit-slider-runnable-track {
                    background: rgba($color: #212121, $alpha: .8);
                    height: 3.5px;

                }

                input[type="range"]::-moz-range-track {
                    background: #000000;
                    height: 3.5px;
                }

                input[type="range"]::-webkit-slider-thumb {
                    // margin-top = (высота дорожки / 2) - (высота ползунка / 2)
                    -webkit-appearance: none; /* Override default look */
                    appearance: none;
                    margin-top: -3.5px; /* Centers thumb on the track */
                    background-color: #111;
                    height: 10px;
                    width: 10px;    
                    border-radius: 50%;


                    &:hover {
                        background-color: teal;
                    }

                }

                input[type="range"]::-moz-range-thumb {
                    border: none; /*Removes extra border that FF applies*/
                    border-radius: 0; /*Removes default border-radius that FF applies*/
                    background-color: #111;
                    height: 2rem;
                    width: 1rem;
                }
            }

            .toggle-line-tools {
                position: absolute;
                width: 100%;
                height: 50px;
                background-color: rgba($color: #000000, $alpha: .8);
                // bottom: 0;
                display: flex;
                align-items: center;
                color: white;


                .icon {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // border: 1px solid #333;
                    border-right: none;
                    padding: 5px 10px;
                    width: 5%;
                    
                    i {
                        color: white;
                        margin-top: 4px;
                    }
                }

                input {
                    width: 90%;
                    height: 100%;
                    background: none;
                    padding: 8px;
                    border: none;
                    outline: none;
                    // border-bottom: 1px solid #333;
                    border-right: none;
                    border-left: none;
                    color:white;
                    // margin-left: 15px;
                }

                .close-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 10px 0 0;
                    height: 100%;
                    // border: 1px solid #333;
                    border-left: none;
                    font-size: 12px;
                    width: 5%;

                    &:hover {
                        cursor: pointer;
                        color: rgba($color: teal, $alpha: 1.0);
                        transition: .5s;
                    }

                }

            }
        }

        .list-audio {
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000000, $alpha: .8);
            overflow: auto;
            display: flex;
            flex-direction: column;
            padding-bottom: 100px;
            padding-top: 5px;

            .item-audio {
                width: 100%;
                color: white;
                display: flex;
                align-items: center;
                // margin-top: 8px;
                padding: 5px;
                position: relative;

                .inner-item {
                    z-index: -1;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: rgba($color: #059e91, $alpha: .5);
                    display: none;
                    align-items: center;
                    padding-left: 8px;
                    border-radius: 5px;

                    .tools-item {
                        margin-left: auto;
                        margin-right: 80px;
                        width: 100px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        // background-color: rgba($color: #000000, $alpha: .5);
                        border-radius: 10px;
                        z-index: -1;

                        .add-audio {
                            width: 50%;
                            height: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            // background-color: red;
                            color: white;
                            border-right: 1px solid #333;

                            i {
                                margin-top: 4px;

                                &:hover {
                                    transition: .3s;
                                    cursor: pointer;
                                    color: rgba($color: #00fff2, $alpha: 1.0);
                                }
                            }
                        }

                        .sett-audio {
                            width: 50%;
                            height: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            // background-color: yellow;
                            color: white;
                            
                            i {
                                margin-top: 4px;

                                &:hover {
                                    transition: .3s;
                                    cursor: pointer;
                                    color: rgba($color: #00fff2, $alpha: 1.0);
                                }
                            }
                        }
                    }

                    .inner-image-audio {
                        position: relative;
                        z-index: 2;
                        display: flex;
                        align-items: center;
                        width: 45px;
                        height: 45px;
                        // background-color: red;
                        border-radius: 5px;

                        .image-src {
                            font-size: 14px;
                            width: 45px;
                            height: 45px;
                            position: absolute;
                            margin: 0;
                            top: 50%;
                            left: 50%;
                            margin-right: -50%;
                            transform: translate(-50%, -50%);      
                            
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            background-color: rgba($color: #000000, $alpha: .5);
                            border-radius: 10px;

                            i {
                                margin-top: 4px;
                                &:hover {
                                    transition: .3s;
                                    color: rgba($color: #00fff2, $alpha: 1.0);
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }

                .time-audio {
                    z-index: 0;

                    margin-left: auto;
                    margin-right: 10px;
                }
                .data-audio {
                    margin-left: 20px;
                    z-index: 2;


                    .name-artist {
                        font-size: 12px;

                        &:hover {
                            transition: .3s;
                            color: rgba($color: #00fff2, $alpha: 1.0);
                            cursor: pointer;
                        }
                    }

                    .name-audio {
                        &:hover {
                            transition: .3s;
                            color: rgba($color: #00fff2, $alpha: 1.0);
                            cursor: pointer;
                        }
                    }
                }

                .image-audio {
                    position: relative;
                    z-index: 0;
                    display: flex;
                    align-items: center;
                    padding-left: 8px;


                    .box-show {
                        width: 45px;
                        height: 45px;
                        position: absolute;
                        margin: 0;
                        top: 50%;
                        left: 50%;
                        margin-right: -50%;
                        transform: translate(-50%, -50%);      
                        
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        background-color: rgba($color: #000000, $alpha: .5);
                        border-radius: 10px;

                        i {
    
                        }
                    }
                    

                    img {
                        width: 45px;
                        height: 45px;
                        border-radius: 10px;

                    }
                }

                .image-audio:hover::after {
                    opacity: 1; /* Полная видимость */
                    // bottom: 0;
                }
            }

        }
    }
}

.anim-fade-effect-enter-active,
.anim-fade-effect-leave-active {
  transition: opacity .3s ease;
}

.anim-fade-effect-enter-from,
.anim-fade-effect-leave-to {
  opacity: 0;
}

.audiolist-enter-active {
  animation: audiolist-in .4s ease-out both;
}

.audiolist-leave-active {
  animation: audiolist-in .4s reverse ease-in both;
}

@keyframes audiolist-in {
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

</style>