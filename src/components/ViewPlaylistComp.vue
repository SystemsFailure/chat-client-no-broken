<template>
    <div class="main-playlist0view-class">
        <div class="close-btn">
            <img src="@/assets/svgassets/icons8-удалить.svg" alt="close" title="close window" srcset="" @click="$emit('closeViewPlaylistComp', false)">
            <!-- <i class="fi fi-ss-cross" style="color: red;" @click="pauseAudio()"></i> -->
        </div>
        <div class="img-view">
            <img src="" alt="" id="img-view-id" width="800" height="270">
            <div class="mix">
                <img src="@/assets/svgassets/icons8-воспроизведение-50.png" alt="" title="play by list">
            </div>
        </div>
        <div class="list">
            <div class="it" v-for="it in listSongs" :key="it.id" :id="it.id + '-class'">
                <audio :src="it.url" :id="it.id" class="audioList"></audio>
                <div class="img-box-it">
                    <!-- <img src="@/assets/playlist.png" alt=""> -->
                    <div class="wrap-container-start-song" :id="it.id+'playbtn'">
                        <img src="@/assets/svgassets/icons8-воспроизведение-50.png" alt="" @click="PlayerplaySong(it)">
                    </div>
                    <div class="stop-song-btns-class" :id="it.id+'stopbtn'">
                        <img src="@/assets/svgassets/icons8-пауза-60.png" alt="" @click="StopSong(it)">
                    </div>
                </div>
                <div class="inner-content">
                    <span class="name-music">
                        {{ it.name }}
                    </span>
                    <span class="name-artist">{{ it.artist }}</span>
                    <span id="time-duration">03:46</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
    data() {
        return {
            listSongs: [],
        }
    },
    async mounted() {
        await this.getPLData().then(() => {
            console.log(this.playlistData.imgUrl)
            document.getElementById('img-view-id').src = this.playlistData.imgUrl
        })
        await this.getDataFromPlaylist().then(() => {
            this.listSongs = this.musicsListLV
        })
        this.setDefaultStopBtns()
    },
    methods: {
        ...mapActions('playlist', {
            getDataFromPlaylist: 'getDataFromPlaylist',
            getPLData: 'getPLData',
        }),
        ...mapMutations('player', {
            stopAudio: 'stopAudio',
            setMusicsInArray: 'setMusicsInArray',
            setCurrentSongId: 'setCurrentSongId',
        }),
        setDefaultStopBtns(id) {
            let listStopBtns = document.getElementsByClassName('stop-song-btns-class')
            let listStartBtns = document.getElementsByClassName('wrap-container-start-song')

            if(listStopBtns && listStartBtns)
            {
                for (const el of listStopBtns) {
                    el.style.display = 'none'
                }
                for (const el of listStartBtns) {
                    if(id+'playbtn' != el.id+'play-btn')
                    {
                        el.style.display = 'flex'
                    }
                }
            }
        },
        PlayerplaySong(it) {
            this.setDefaultStopBtns(it.id)
            let stopBtn = document.getElementById(it.id+'stopbtn')
            if(stopBtn)
            {
                event.target.parentNode.style.display = 'none'
                stopBtn.style.display = 'flex'
            }
            this.setMusicsInArray(this.listSongs)
            this.setCurrentSongId(it.id)
        },
        pauseAudio() {
            this.stopAudio()
        },
        StopSong(it) {
            let startBtn = document.getElementById(it.id+'playbtn')
            if(startBtn)
            {
                event.target.parentNode.style.display = 'none'
                startBtn.style.display = 'flex'
            }
        },
    },
    computed: {
        ...mapState('playlist', {
            musicsListLV: 'musicsListLV',
            playlistData: 'playlistData',
        })
    },
}
</script>
<style lang="scss" scoped>

.main-playlist0view-class {
    position: absolute;
    width: 800px;
    height: 600px;
    background-color: rgba($color: #000000, $alpha: .9);
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    // padding: 10px;
    z-index: 12;

    font-family: Lato,sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;

    .list {
        width: 100%;
        height: 100%;
        padding: 5px;
        padding-top: 275px;
        .it {
            width: 100%;
            padding: 10px;
            color: white;
            display: flex;
            align-items: center;
            border-radius: 5px;

            &:hover {
                cursor: pointer;
                opacity: .6;
                background-color: #111;
            }

            .img-box-it {
                display: flex;
                img {
                    width: 15px;
                    height: 15px;
                    font-size: 15px;

                    &:hover {
                        cursor: pointer;
                        opacity: .6;
                    }
                }
            }

            .inner-content {
                display: flex;
                align-items: center;
                margin-left: 10px;
                width: 100%;

                .name-music {

                }

                #time-duration {
                    margin-left: auto;
                    font-size: 9px;
                    color: #555;
                }

                .name-artist {
                    font-size: 9px;
                    margin-left: 10px;
                    color: #555;
                }
            }
        }
    }

    .img-view {
        position: absolute;
        width: 100%;
        height: 45%;
        z-index: 11;
        
        .mix {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: black;
            border: 1px solid #ffffff;
            position: absolute;
            top: 210px;
            left: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 2px;
            img {
                width: 20px;
                height: 20px;
            }

            &:hover {
                cursor: pointer;
                opacity: 0.8;
                transition: .3s;
            }
        }

        #img-view-id {
            width:100%;
            height: 100%;
            // object-fit: contain;
            object-fit: cover;
        }

        
    }

    .close-btn {
        position: absolute;
        display: flex;
        align-items: center;
        width: 100%;
        color: white;
        z-index: 15;
        
        img {
            width: 16px;
            height: 16px;
            margin-left: auto;
            margin-top:10px;
            margin-right: 10px;
            &:hover {
                cursor: pointer;
                opacity: 0.8;
                transition: .3s;
            }
        }

    }
}

</style>