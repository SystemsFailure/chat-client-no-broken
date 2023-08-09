<template>
    <div class="main-music-menu-comp">
        <div class="wraapper-continer">
            <div class="line-tools-box">
                <div class="setlectAll-btn" @click="selectedAllItems">select all</div>
                <div class="deleteSelectedItem-btn" @click="removeElementFromArrayInDB">delete</div>
                <div class="inp-box">
                    <input type="text" placeholder="search" v-model="searchValue">
                </div>
                <div class="updateList-btn"><i class="fi fi-bs-refresh" @click="updateList"></i></div>
            </div>
            <div class="listMyMusics">
                <div
                    class="itemMyMusic"
                    v-for="music in MyMusicsListFiltered" 
                    :key="music.id" 
                    :style="cheachExitMusicInArray(music.id) ? {'backgroundColor' : 'teal'} : {'backgroundColor' : 'rgba(51, 51, 51, 0)'}"
                    @dblclick="addToSelectedArray(music.id)"
                    @click="removeElementFromSelectedArray(music.id)"
                    >
                    <div class="img-class"><img src="@/assets/airPods.png" alt=""></div>
                    {{ slice_last_message(music.name) }}
                </div>
            </div>            

        </div>
    </div>
</template>
<script>
import { UserApi } from '@/api/UserController'
import { MusicApi } from '@/api/MusicController'
export default {
    data() {
        return {
            userId: localStorage.getItem('user-id'),
            MyMusicsList: [],
            selectedItem: [],
            searchValue: '',
        }
    },

    mounted() {
        this.updateListMusics()
    },

    watch: {

    },

    computed: {
        MyMusicsListFiltered() {
            return this.MyMusicsList.filter(elem => {
                return elem.name.includes(this.searchValue) 
            })
        }
    },

    methods: {
        updateList() {
            this.updateListMusics()
        },

        addToSelectedArray(id) {
            this.selectedItem.push({id: id})
        },

        removeElementFromArrayInDB() {
            if(this.selectedItem.length > 0)
            {                
                this.selectedItem.forEach(elem => {
                    MusicApi.deleteFromArrayMusicsList(this.userId, elem.id).then((result) => {
                        if (result === true)
                        {
                            this.updateListMusics()
                        }
                    }).catch(err => console.log(err))
                })
            } else {
                alert('not selected item')
            }
        },

        updateListMusics() {
            UserApi.GetPersonalDataOfUser(this.userId).then(data => {
                MusicApi.getAllPersonalMusicsDoc(data[0].arrayMusicsFastAccess).then(arrayMusics => {
                    this.MyMusicsList = arrayMusics
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        },

        removeElementFromSelectedArray(id) {
            if(this.selectedItem.length > 0)
            {
                this.selectedItem.forEach(elem => {
                    if(elem.id === id)
                    {
                        this.selectedItem = this.selectedItem.filter(item => {
                            return item.id != id
                        })
                    }
                })
            }
        },

        selectedAllItems() {
            this.MyMusicsList.forEach(elem => {
                this.selectedItem.push({id: elem.id})

            })
        },

        cheachExitMusicInArray(id) {
            let music = this.selectedItem.filter(elem => {
                return elem.id === id
            })
            if( music.length > 0 ) { return true } else { return false }
        },

        slice_last_message(text) {
            if (!text) text = 'default message'
            var sliced = text.slice(0,30);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        },
    }
}
</script>
<style lang="scss" scoped>

.main-music-menu-comp {
    width: 100%;
    height: 100%;
    // background-color: #333;
    // background: $color-back;
    background: rgba(0, 0, 0, .3);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-right: 1px solid #333;

    .wraapper-continer {
        width: 100%;
        height: 100%;

        .line-tools-box {
            width: 100%;
            height: 51px;
            border-bottom: 1px solid #333;
            display:flex;
            align-items: center;
            color: white;
            font-family: Lato,sans-serif;
            font-weight: 700;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .02em;

            .setlectAll-btn {
                padding: 10px;
                color: rgb(0, 255, 238);
                &:hover {
                    cursor: pointer;
                    opacity: .5;
                    transition: .3s;
                }
            }

            .deleteSelectedItem-btn {
                padding: 10px;
                color: red;

                &:hover {
                    cursor: pointer;
                    opacity: .5;
                    transition: .3s;
                }
            }

            .inp-box {
                height: 100%;
                padding: 12px;
                margin-left: 10px;

                input[type='text'] {
                    height: 100%;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    border: none;
                    outline: none;
                    background: rgba($color: #000000, $alpha: .5);
                    font-size: 11px;
                    color: white;
                    border-left: 1px solid #00ffee;
                }
            }

            .updateList-btn {
                margin-left: auto;
                margin-right: 10px;
                margin-top: 4px;
                padding: 10px;
                font-size: 12px;

                &:hover {
                    cursor: pointer;
                    opacity: .5;
                    transition: .3s;
                }
            }
        }

        .listMyMusics {
            width: 100%;
            height: 100%;
            overflow: auto;
            padding: 5px;
            background-color: rgba($color: #000000, $alpha: .7);
            color: white;
            .itemMyMusic {
                width: 100%;
                // height: 40px;
                padding: 5px;
                display: flex;
                align-items: center;
                // background-color: rgba($color: #000000, $alpha: .7);

                .img-class {
                    position: relative;
                    z-index: 0;
                    display: flex;
                    align-items: center;
                    padding-left: 8px;
                    margin-right: 10px;
                    img {
                        width: 45px;
                        height: 45px;
                        border-radius: 10px;
                    }
                }
            }
        }
    }
}
</style>