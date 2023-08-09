<template>
    <div class="main-comp-class-create-playlist">
        <div class="inner-cotainer">
            <div class="inline-">
                <span>create new playlist</span>
                <div class="close-btn" @click="() => {this.$emit('closeCreateWindowPlaylistFunction', false)}"><img src="@/assets/svgassets/icons8-удалить.svg" alt=""></div>
            </div>
            <div class="wrap-container">
                <div class="field-data-playlist">
                    <div class="img-container">
                        
                        <div class="img-box-">
                            <img src="" alt="" srcset="" id="img-playlist-id" style="display: none;">
                            <div class="delete-img" @click="clearImage"><i class="fi fi-bs-trash"></i></div>
                        </div>
                        <label for="select-playlist-image" class="label_3" id="lable-id">
                            +
                        </label>
                        <span style="font-size: 13px;">Cover</span>
                        <input type="file" class="my" id="select-playlist-image" name="select-playlist-image" multiple @change="setImage">
                    </div>
                    <div class="input-continer">
                        <input type="text" placeholder="name playlist" v-model="name">
                        <textarea type="text" placeholder="description playlist" v-model="description"></textarea>
                        <div class="private-box">
                            <input type="checkbox" name="" id="sl-private-mode" v-model="privateMode">
                            <span>private mode</span>
                        </div>
                    </div>
                </div>

                <div class="two-inner-container">
                    <i class="fi fi-bs-search"></i>
                    <input type="text" placeholder="global search music" v-model="searchQuery">
                    <i class="fi fi-bs-cross"></i>
                </div>
                
            </div>

            <div class="download-from-my-list">
                <div class="btn" @click="downloadSelfList">download my list</div>
            </div>
                
            <div class="list-finded-musics">
                <span v-if="foundMusicsList.length <= 0">Here just not musics</span>
                <div class="list">
                    <transition-group name="bouncetwo">
                        <div class="item" v-for="music in filteredPlaylist" :key="music.id">
                            <img src="@/assets/voice-chat.png" alt="">
                            <div class="music-data">
                                <span class="name-music">
                                    {{ music.name }}
                                </span>
                                <span class="name-artist">
                                    {{ music.artist }}
                                </span>
                            </div>
                            <div class="add-btn" @click="addInMyPlaylist(music.id)">add</div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div class="save" v-if="this.foundMusicsList.length > 0" @click="create">
                save
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {MusicApi} from '@/api/MusicController';
import { PlaylistApi } from '@/api/PlaylistController';
export default {
    data() {
        return {
            foundMusicsList: [],
            selectedMusicsList: [],
            name: '',
            description: '',
            privateMode: false,
            userId: null,
            showPluse: true,
            addedSongsList: [],
            searchQuery: '',

            // for get list music by user id
            playlists: [],
        }
    },
    mounted() {
        this.userId = localStorage.getItem('user-id');
        MusicApi.getAllMusicsDocs().then((musics) => {
            this.foundMusicsList = musics
        })
    },
    computed: {
        ...mapState('playlist', {
            filesList: 'filesList',
        }),
        filteredPlaylist: {
            get() {
                return this.foundMusicsList.filter(music => {
                    return music.name.toLowerCase().includes(this.searchQuery.toLowerCase());
                });
            },
            set(val) {
                this.foundMusicsList = val;
            }
        }
    },
    methods: {
        ...mapActions('playlist', {
            createdNewPlayList: 'createdNewPlayList',
            uploadImages: 'uploadImages',
        }),
        ...mapMutations('playlist', {
            setData: 'setData',
            setToZeroList: 'setToZeroList',
            setplaylistIdList: 'setplaylistIdList',
        }),
        addInMyPlaylist(id) {
            this.selectedMusicsList.push(id)
            this.selectedMusicsList = [...new Set(this.selectedMusicsList)]
        },
        async downloadSelfList() {
            // Все документы музыки получаются из всех плейлистов данного пользователя и 
            // записываются в new Set() - что бы не повторятся и выводятся на интерфейс как пользовательский список песен

            let arrayMuscisIds_local = [];
            let SetArray = new Set();
            // Here download user list of songs and to add in foundlist
            if(this.userId) {
                await PlaylistApi.getPlaylistByUserId(this.userId).then(result => {
                    this.playlists = result;
                })
                if(this.playlists.length > 0 && this.playlists && this.playlists != []) {

                    this.playlists.forEach(el => {
                        arrayMuscisIds_local = [...arrayMuscisIds_local, ...el?.arrayMusic];
                    })
                    arrayMuscisIds_local.forEach(el => {
                        SetArray.add(el);
                    })

                }
            }
            arrayMuscisIds_local = [];
            SetArray.forEach(el => {
                arrayMuscisIds_local.push(el);
            })
            const musicDocs = await MusicApi.getAllPersonalMusicsDoc(arrayMuscisIds_local);
            this.foundMusicsList = musicDocs;
        },
        clearImage() {
            let img = document.getElementById('img-playlist-id')
            img.src = ''
            img.style.display = 'none'
            this.setToZeroList()
        },
        setImage() {
            let files = document.getElementById('select-playlist-image').files
            this.filesList.push(...files)
            if(this.filesList.length > 1) {
                this.setToZeroList()
            }
            document.getElementById('img-playlist-id').style.display = 'block'
            document.getElementById('img-playlist-id').src = URL.createObjectURL(files[0])
        },
        create() {
            if (this.name === '' || this.description === '') {
                alert('Please fill all fields')
            } else {
                if(this.selectedMusicsList.length != 0)
                {
                    this.setplaylistIdList(this.selectedMusicsList)
                } else {
                    console.log('length list ids of songs is zero! Selected please minimum one song')
                    return
                }
                this.setData(
                    {
                        arrayMusicsId: [],
                        description: this.description,
                        name: this.name,
                        privateMode: this.privateMode,
                        userId: this.userId,
                    }
                )
                this.uploadImages()
                console.log(this.filesList)
            }
        }
    },
}
</script>
<style lang="scss" scoped>

.main-comp-class-create-playlist {
    position: absolute;
    width: 600px;
    height: 760px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    // border: 1px solid #333;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    color: white;
    z-index: 3;

    .inner-cotainer {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .download-from-my-list {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;

            .btn {
                padding: 10px;
                font-family: Lato,sans-serif;
                font-weight: 700;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: .02em;
                border: 1px solid #333;

                &:hover {
                    cursor: pointer;
                    opacity: .7;
                    transition: .3s;
                }
            }
        }
        .save {
            // position: fixed;
            width: 100%;
            padding: 10px;
            bottom:0;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #333;
            background: none;

            &:hover {
                cursor: pointer;
                background-color: rgba($color: #00a28f, $alpha: .8);
                color: black;
                transition: .3s;
            }
        }

        .list-finded-musics {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            width: 100%;
            height: 100%;
            padding: 0px 8px 0px 8px;
            padding-bottom: 50px;
            overflow: auto;
            // position: relative;

            
            .list {
                width: 100%;
                height: 100%;
                .item {
                    width: 100%;
                    height: 50px;
                    padding: 10px;
                    background-color: rgba($color: #232323, $alpha: .3);
                    margin-top: 5px;
                    display: flex;
                    align-items: center;

                    .add-btn {
                        padding: 7px;
                        font-family: Lato,sans-serif;
                        font-weight: 700;
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing:.02em;
                        margin-left: auto;
                        border: 1px solid #333;

                        &:hover {
                            cursor: pointer;
                            opacity: 0.7;
                            transition: 0.3s;
                        }
                    }

                    img {
                        width: 30px;
                        height: 30px;
                    }

                    .music-data {
                        margin-left: 10px;
                        display: flex;
                        flex-direction: column;

                        span[class='name-music'] {
                            font-size: 15px;
                        }

                        span[class='name-artist'] {
                            font-size: 12px;
                        }
                    }
                }
            }
        }

        .wrap-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 50vh;
            padding: 10px;


            .two-inner-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 10px;
                border-bottom: 1px solid #333;

                input {
                    width: 85%;
                    height: 100%;
                    border: none;
                    background: none;
                    outline: none;
                    color: azure;
                }
                .fi-bs-search {
                    width: 10%;
                    color: white;
                    margin-top: 4px;
                    font-size: 12px;
                }

                .fi-bs-cross {
                    color: white;
                    margin-top: 4px;
                    font-size: 11px;

                    &:hover {
                        cursor: pointer;
                        opacity: .7;
                        transition: .3s;
                    }
                }
            }
            
            .field-data-playlist {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 20px;
                border-bottom: 1px solid #333;

                .img-container {
                    margin-right: 10px;

                    .img-box- {
                        position: relative;

                        .delete-img {
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            cursor: pointer;
                            transition: 0.3s;
                            font-size: 14px;
                        }

                        #img-playlist-id {
                            width: 100px;
                            height: 100px;
                            position: absolute;
                            border-radius: 10px;
                        }
                    }
                    .my {
                        width: 0.1px;
                        height: 0.1px;
                        opacity: 0;
                        overflow: hidden;
                        position: absolute;
                        z-index: -1;
                    }
                    
                    .label_3 {
                        font-size: 50px;
                        width: 100px;
                        height: 100px;
                        background-color: none;
                        border: 1px solid #333;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
    
                        border-radius: 4px;
                        // transition: all 0.18s ease-in-out;
    
                        font-family: Lato,sans-serif;
                        text-transform: uppercase;
                        letter-spacing: .02em;
                        color: white;
                    }
    
                    .label_3:hover {
                        color: white;
                        background: #00cec780;
                    }
                }

                .input-continer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    height: 100px;
                    margin-bottom: 10px;
                    .private-box {
                        margin-top: 5px;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        font-family: Lato,sans-serif;
                        font-weight: 700;
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing: .02em;

                        input[type='checkbox'] {
                            margin-right: 5px;
                        }
                    }

                    input[type='text'] {
                        width: 200px;
                        background: none;
                        outline: none;
                        color: white;
                        border: 1px solid #777;
                        border-radius: 5px;
                        padding: 8px;
                        // margin-left: 10px;
                        font-size: 12px;
                        margin-bottom: 5px;
        
                    }
        
                    textarea {
                        width: 200px;
                        font-size: 12px;
                        padding: 8px;
                        border-radius: 5px;
                        background: none;
                        outline: none;
                        color: white;
                        border: 1px solid #777;
                        padding: 5px;
                        max-width: 200px;
                        min-width: 200px;
                        max-height: 300px;
                        min-height: 50px;
                    }
                }


            }
        }


        .inline- {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            border-bottom: 1px solid #333;
            padding: 5px;
            font-family: Lato,sans-serif;
            font-weight: 500;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: .02em;

            span {
                margin-left: 10px;

            }
            .close-btn {
                margin-left: auto;
                // margin-top: 10px;
                margin-right: 10px;
                font-size: 11px;

                img {
                    width: 14px;
                    height: 14px;
                }
    
                &:hover {
                    cursor: pointer;
                    opacity: 0.8;
                    transition: .3s;
                }
            }
        }
    }

}

.bouncetwo-enter-active {
  animation: bounceListMusics-in .5s ease-out both;
}

.bouncetwo-leave-active {
  animation: bouncetwo-in .5s reverse ease-in both;
}

@keyframes bouncetwo-in {
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