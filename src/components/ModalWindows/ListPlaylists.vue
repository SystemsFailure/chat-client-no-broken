<template>
    <div class="list-playlist-window">
        <div class="lds-ripple" v-if="localLoader"><div></div><div></div></div>
        <div class="inner">
            <div class="close-btn">
                <span>Your playlists</span>
                <img src="@/assets/svgassets/icons8-удалить.svg" alt="" srcset="" @click="this.$emit('closeListPlaylistWindowFunction')">
            </div>


            <div class="playlist-container">
                <div class="playlist_" v-for="playlist in listplaylist" :key="playlist.id" @click="openPlaylist(playlist)">
                    <img :src="playlist.imgUrl !=null ? playlist.imgUrl : require('@/assets/playlist.png')" alt="" srcset="">
                    <div class="title-playlist"><span>{{ playlist.name }}</span></div>
                    <div class="avtor-title"><span>{{ playlist.avtor }}</span></div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
    data() {
        return {
            listplaylist: [],
            localLoader: true,
        }
    },

    mounted() {
        this.setCerrentUserId(localStorage.getItem('user-id'))
        this.getAllPlayList().then(() => {
            this.listplaylist = this.playlistList_
            this.localLoader = false
        })
    },

    computed: {
        ...mapState('playlist', {
            playlistList_: 'playlistList',
            playlistID: 'playlistID',
        }),
    },

    methods: {
        ...mapMutations('playlist', {
            setCerrentUserId: 'setCerrentUserId',
            setplaylistId: 'setplaylistId',
        }),
        ...mapActions('playlist', {
            getAllPlayList: 'getAllPlayList',
        }),

        openPlaylist(playlistInstance) {
            this.setplaylistId(playlistInstance.id)
            this.$emit('showViewPlaylistCompFunction', true)
        },

        slice_field(text) {
            if (!text) text = 'default field'
            var sliced = text.slice(0,10);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        },
    },
}
</script>
<style lang="scss" scoped>

.list-playlist-window {
    width: 800px;
    min-height: 150px;
    // max-height: 500px;
    position: absolute;
    background-color: rgba($color: #000000, $alpha: .5);
    z-index: 11;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 5px;
    overflow: auto;
    .inner {
        width: 100%;
        height: 100%;
        padding: 5px;
        position: relative;

        .playlist-container {
            margin-top: 10px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            overflow: auto;
            .playlist_ {
                width: 100px;
                display: flex;
                flex-direction: column;
                position: relative;
                margin-left: 10px;
                margin-top: 10px;
    
                .avtor-title {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    color: white;
                    font-size: 8px;
                    margin-top: 5px;
                }
                
                .title-playlist {
                    margin-top: 8px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    color: white;
                    font-size: 8px;
                }
    
                img {
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
    
                }
    
                &:hover {
                    cursor: pointer;
                    opacity: .6;
                    transition: .4s;
                }
            }
        }





        .close-btn {
            position: absolute;
            top: 0;
            width: 100%;
            height: auto;
            padding: 5px;
            display: flex;
            align-items: center;

            span {
                color: white;
                font-family: Lato,sans-serif;
                font-weight: 500;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: .02em;
                // margin-left: 10px;
            }

            img {
                width: 15px;
                height: 15px;
                margin-left: auto;
                cursor: pointer;
                &:hover {
                    opacity: .5;
                    transition: .3s;
                }
            }
        }
    }

}

.lds-ripple {
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

</style>