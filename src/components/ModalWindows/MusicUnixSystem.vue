<template>
    <div class="main-unix-music-sys">
        <audio v-for="it in listAudios" :key="it.id" :src="it.url" class="audioListUnix" :id="it.id + '-unix'"></audio>
        <div class="inner">
            <div class="controller">
                <div 
                class="priview"
                @click="goNextOrPreview('mode -')"
                ><i class="fi fi-bs-angle-double-left"></i></div>
                <div class="play-and-stop">
                    <img src="@/assets/svgassets/icons8-воспроизведение-50.png" v-if="showBtnPlay" class="fi fi-bs-play" @click="PlayerplaySong">
                    <img src="@/assets/svgassets/icons8-пауза-60.png" v-else  @click="stopAudio">
                </div>
                <div
                @click="goNextOrPreview()"
                class="next"
                ><i class="fi fi-bs-angle-double-right"></i></div>
            </div>
            <div class="data-container">

                <div class="wrapper-container-for-input">
                    <div class="abs-progress" id="audioPlayerContainer_unix"></div>
                    <input
                        type="range"
                        id="progress-id"
                        @input="setCurrTime"
                        @change="setCurrTimeToUnixPlayer"
                        value="0"
                    >
                </div>

                <div class="btn-expand">
                    <img 
                    v-if="visibleBtnExpand"
                    src="@/assets/svgassets/icons8-down-arrow-64.png" 
                    @click="() => {this.visibleBtnExpand = false; this.visiblehideSideUnix = true; this.localConfigurationListAudiosElements();}"
                    >
                    <img 
                    v-else src="@/assets/svgassets/icons8-up-chevron-50.png" alt="" srcset="" 
                    @click="pauseUnix()"
                    >
                </div>


            </div>

        </div>
        <div class="hide-side-unix" v-show="visiblehideSideUnix">
            <div class="inner-wrap">
                <span id="name-songs-id">Keep for you</span>
                <span id="name-artist-id">Comele Francline</span>
                <span id="current-time-id-uid">00:00</span>
                <span id="total-time">00:00</span>
                <div class="tools">
                    <div class="add it-tools"><i class="fi fi-bs-plus"></i></div>
                    <div class="mix it-tools"><i class="fi fi-bs-shuffle"></i></div>
                    <div class="repeat it-tools"><i class="fi fi-bs-arrows-repeat-1"></i></div>
                    <div class="share it-tools"><i class="fi fi-bs-redo"></i></div>
                </div>
            </div>

            <div class="inner-music-box">
                <div
                    class="it-audio"
                    v-for="it in listcurrentaudioplaylist"
                    :key="it.id"
                    @click="playmusic(it.id, it)"
                    :id="`hideList-${it.id}`"
                    >
                    <div class="btn-play-and-stop-box">
                        <img 
                        src="@/assets/svgassets/icons8-воспроизведение-50.png" alt="" 
                        :id="`play-audio-btn-uid--${it.id}`"
                        class="list-all-play-elements-btns"
                        @click="playMusicUnixHideList(it.id, it)"
                        >
                        <img 
                        src="@/assets/svgassets/icons8-пауза-60.png" alt="" 
                        :id="`stop-audio-btn-uid--${it.id}`" 
                        class="list-all-pause-elements-btns"
                        @click="pauseMusicUnixHideList(it.id)"
                        >
                    </div>
                    <div class="name-song-and-art-box">
                        <span id="name-song-box-uid">{{ it.name }}</span>
                        <span id="name-art-box-uid">{{ it.artist }}</span>
                    </div>
                    <div class="time-box">
                        <span>{{ '03:52' }}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            listAudios: [],
            listcurrentaudioplaylist: [],
            visibleBtnExpand: true,
            visiblehideSideUnix: false,
            indexSn: null,
        }
    },
    mounted() {
        this.setTimeContainer(document.getElementById('current-time-id-uid'))
        this.setInput(document.getElementById('progress-id'))
        this.setCurrentTimeElement(document.getElementById('total-time'))
        this.setProgressInline(document.getElementById('audioPlayerContainer_unix'))
        this.listcurrentaudioplaylist = this.isArray
        this.localConfigurationListAudiosElements()
    },
    watch: {
        isArray: {
            handler(newArray) {
                this.listcurrentaudioplaylist = this.isArray
                this.localConfigurationListAudiosElements()
                if(!this.returnAudioElementId) {console.log('audio id is null'); return;}
                new Promise((resolve) => {
                    this.listAudios = newArray
                    resolve()
                }).then(() => {
                    let audio = document.getElementById(this.returnAudioElementId + '-unix')
                    this.playMusicUnix(audio)
                    this.displayAudioDurationUnix()
                    this.setSliderMaxUnix()
                    let listAudio = document.getElementsByClassName('audioListUnix')
                    for (let index = 0; index < listAudio.length; index++) {
                        const element = listAudio[index]
                        if(element.id != audio.id)
                        {
                            element.pause()
                        }
                    }
                })
            },
            root: true,
        }
    },
    computed: {
        ...mapState('player', {
            showBtnPlay: 'showBtnPlay',
            isArray: 'isArray',
        }),
        ...mapGetters('player', {
            returnAudioElementId: 'returnAudioElementId',
        })
    },
    methods: {
        goNextOrPreview(mode) {
            // Если мод === 'mode -' то идем в обратную сторону dicrement function...
            if(mode === 'mode -')
            {
                // здесь будет обрабатываться условие, если (текущее значение duration текущего трека < 30% всего duration теущего трека) then мы устанавливаем duration значение 0
                this.indexSn--
                if(this.indexSn < 0)
                {
                    this.indexSn = this.listAudios.length - 1
                }
                let it = this.listAudios[this.indexSn]
                if(it)
                {
                    this.playMusicUnixHideList(it.id, it)
                } else {
                    console.log('it is not found in mode -, correct your code')
                }
            } else {
                // Это функция воспроизведения следующей песни по списку
                if(this.indexSn != null)
                {
                    // инкремент мндекса
                    this.indexSn++
                    // Проверка, если текущий индекс больше индекса последнего элемента, то сбрасываем индекс на 0
                    if(this.indexSn > this.listAudios.indexOf(this.listAudios[this.listAudios.length - 1])) {
                        this.indexSn = 0
                    }
                    // получение элемента по индексу
                    let it = this.listAudios[this.indexSn]
                    if(it)
                    {
                        this.playMusicUnixHideList(it.id, it)
                    } else {
                        console.log('it value is not found, please to correct this line code...')
                    }

                } else {
                    // эта часть кода выполняется если индекс не определен
                    if(this.listAudios.length != 0)
                    {
                        let it = this.listAudios[0]
                        if(it)
                        {
                            this.playMusicUnixHideList(it.id, it)
                        } else {
                            console.log('it value is not found, you check value of it which searched by index === 0 as first element, check your code...')
                        }
                    }
                }   
            }
        },

        getIndex(it) {
            if(this.listAudios.indexOf(it) != -1) {
                return this.listAudios.indexOf(it)
            }
        },

        playMusicUnixHideList(id, it)
        {
            // Здесь устанавливаем индекс по нажатию на элемент из списка музыки
            this.indexSn = this.getIndex(it)
            const audio = document.getElementById(id+'-unix')
            if(audio)
            {
                this.stopAudio()
                this.localConfigurationListAudiosElements
                this.playMusicUnix(audio)
                const allaudiohidelist = document.getElementsByClassName('audioListUnix')
                for (let index = 0; index < allaudiohidelist.length; index++) {
                    const element = allaudiohidelist[index];
                    if(element.id != id+'-unix')
                    {
                        const audioID = element.id.split('-')[0]
                        element.pause()
                        const playbtnElement = document.getElementById('play-audio-btn-uid--' + audioID)
                        const stopbtnElement = document.getElementById('stop-audio-btn-uid--' + audioID)
                        playbtnElement.style.width = '14px'
                        playbtnElement.style.height = '14px'
                        stopbtnElement.style.width = '0px'
                        stopbtnElement.style.height = '0px'
                    }
                }
                this.changeBtnPlayOrPause(id, 'usual')
            } else {
                console.log('audio element is null')
                return
            }
        },
        pauseUnix() {
            this.visibleBtnExpand = true;
            this.visiblehideSideUnix = false;
            this.localConfigurationListAudiosElements()
        },
        pauseMusicUnixHideList(id) {
            if(id)
            {
                this.changeBtnPlayOrPause(id, 'reverse')
            }
            this.stopAudio()
            
        },
        // local methods // code start...
        localConfigurationListAudiosElements()
        {
            const lst = document.getElementsByClassName('list-all-pause-elements-btns')
            const lst2 = document.getElementsByClassName('list-all-play-elements-btns')
            for (let index = 0; index < lst2.length; index++) {
                const element = lst2[index];
                element.style.width = '14px'
                element.style.height = '14px'
            }
            for (let index = 0; index < lst.length; index++) {
                const iterator = lst[index];
                iterator.style.width = '0px'
                iterator.style.height = '0px'
            }
        },
        changeBtnPlayOrPause(id, mode)
        {
            if(mode === 'usual')
            {
                const playbtnElement = document.getElementById('play-audio-btn-uid--' + id)
                const stopbtnElement = document.getElementById('stop-audio-btn-uid--' + id)
                playbtnElement.style.width = '0px'
                playbtnElement.style.height = '0px'
                stopbtnElement.style.width = '14px'
                stopbtnElement.style.height = '14px'
            }
            if(mode === 'reverse')
            {
                const playbtnElement = document.getElementById('play-audio-btn-uid--' + id)
                const stopbtnElement = document.getElementById('stop-audio-btn-uid--' + id)
                playbtnElement.style.width = '14px'
                playbtnElement.style.height = '14px'
                stopbtnElement.style.width = '0px'
                stopbtnElement.style.height = '0px'
            }
        },
        playmusic() {
            console.log('play music...')
        },
        // local methods ... // code end...
        PlayerplaySong() {
            this.playMusicUnix('last')
        },
        ...mapMutations('player', {
            setCurrentTimeElement: 'setCurrentTimeElement', setProgressInline: 'setProgressInline',
            setInput: 'setInput',
            setTimeContainer: 'setTimeContainer',
            setSliderMaxUnix: 'setSliderMaxUnix',
        }),
        ...mapActions('player', {
            setCurrentTimeUnix: 'setCurrentTimeUnix',
            setCurrentTimeToAudio: 'setCurrentTimeToAudio',
            playMusicUnix: 'playMusicUnix',
            stopAudio: 'stopAudio',
            displayAudioDurationUnix: 'displayAudioDurationUnix',
        }),
        setCurrTimeToUnixPlayer() {
            this.setCurrentTimeToAudio()
        },
        setCurrTime() {
            this.setCurrentTimeUnix()
        }
    }
}
</script>
<style lang="scss" scoped>

.main-unix-music-sys {
    width: 100%;
    height: 100%;
    // background-color: rgba($color: #000000, $alpha: 1.0);
    background: rgb(7, 7, 7);
    // padding:5px;
    color: white;
    font-size: 12px;
    margin-left: auto;
    position: relative;

    .hide-side-unix {
        margin-top: 10px;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #0c0c0c;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .inner-wrap {
            padding: 5px;
            display: flex;
            align-items: center;

            .tools {
                display: flex;
                align-items: center;
                margin-left: auto;
                .it-tools {
                    margin-left: 10px;
                    font-size: 15px;
                }
                .add {
                    
                }
                .mix {

                }
                .share {

                }
                .repeat {

                }
            }

            #name-songs-id {
                font-size: 13px;
                margin-left: 10px;
                width: 80px;

                &:hover {
                    cursor: pointer;
                    color: turquoise;
                    transition: .3s;
                }
            }

            #name-artist-id {
                font-size: 11px;
                color:#555;
                margin-left: 10px;
                &:hover {
                    cursor: pointer;
                    color: turquoise;
                    transition: .3s;
                }
            }

            #current-time-id-uid {
                margin-left: 10px;
                // margin-right: 2px;
            }

            #total-time {
                margin-left: 5px;
                margin-right: 20px;
            }
        }

        .inner-music-box {
            margin-top: 10px;
            // height: 300px;
            width: 100%;
            // background: rgba($color: #000000, $alpha: 1.0);
            background-color: #151515;
            overflow: auto;


            .it-audio {
                width: 100%;
                padding: 5px;
                display: flex;
                align-items: center;

                &:hover {
                    cursor: pointer;
                    background-color: #111;
                }

                .time-box {
                    margin-left: auto;
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    font-size: 12.5px;
                    color: #888;
                    font-weight: bold;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                }

                .name-song-and-art-box {
                    padding: 5px;
                    display: flex;
                    flex-direction: column;
                    // align-items: center;
                    justify-content: center;

                    #name-song-box-uid {
                        font-family: Verdana, Geneva, Tahoma, sans-serif;
                        font-size: 13px;
                        &:hover {
                            cursor: pointer;
                            opacity: .7;
                            transition: .3s;
                        }
                    }

                    #name-art-box-uid {
                        font-size: 10px;
                        color: #777;
                        line-height: 20px;
                        font-weight: 700;
                        font-family: Georgia, 'Times New Roman', Times, serif;
                        &:hover {
                            cursor: pointer;
                            opacity: .7;
                            transition: .3s;
                        }
                    }
                }

                .btn-play-and-stop-box {
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 15px;
                        height: 15px;
                        margin-bottom: 8px;

                        &:hover {
                            cursor: pointer;
                            opacity: .7;
                            transition: .3s;
                        }
                    }
                }
            }
        }
    }

    .inner {
        padding: 5px;
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;

        // .tools {
        //     display: flex;
        //     height: 100%;
        //     align-items: center;
        //     justify-content: space-between;
        //     padding-top: 4px;
        //     margin-left: auto;
        // }
    
        .data-container {
            width: 90%;
            height: 100%;
            margin-left: 10px;
            display: flex;
            align-items: center;

            .btn-expand {
                width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;

                img {
                    width: 12px;
                    height: 12px;

                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
            }

            .wrapper-container-for-input {
                display: flex;
                align-items: center;
                width: 90%;
                margin-left: 10px;
                height: 3.5px;
                position: relative;


                .abs-progress {
                    position: absolute;
                    width: 0%;
                    height: 3px;
                    background-color: rgba($color: #00fff2, $alpha: 1);
                }

                #progress-id {
                    width: 100%;
                    position: absolute;
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
                    height: 3px;
    
                }
    
                input[type="range"]::-moz-range-track {
                    background: #000000;
                    height: 3px;
                }
    
                input[type="range"]::-webkit-slider-thumb {
                    // margin-top = (высота дорожки / 2) - (высота ползунка / 2)
                    -webkit-appearance: none; /* Override default look */
                    appearance: none;
                    margin-top: -3px; /* Centers thumb on the track */
                    background-color: #111;
                    height: 9px;
                    width: 9px;    
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
        }

        .controller {
            width: 70px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left: 10px;

            .play-and-stop {

                img {
                    width: 16px;
                    height:16px;

                    &:hover {
                        cursor: pointer;
                        opacity: .7;
                        transition: .3s;
                    }
                }
            }

            .priview {
                &:hover {
                        cursor: pointer;
                        color: turquoise;
                        transition: .3s;
                    }
            }

            .next {
                &:hover {
                        cursor: pointer;
                        color: turquoise;
                        transition: .3s;
                    }
            }
        }
    }
}

</style>