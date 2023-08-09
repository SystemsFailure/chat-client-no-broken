<template>
    <ListContacts 
        v-if="visibleListContactsWindow"
        @closeListContactsWindowFunction="() => {this.visibleListContactsWindow = false}"
        @openChatId="(vl, it) => {this.$emit('openChatIdFunction', vl, it); this.visibleListContactsWindow = false}"
    ></ListContacts>
    <ListFollowers
        v-if="visibleListFollowersWindow"
        @closeListFollowersWindowFunction="() => {this.visibleListFollowersWindow = false}"
    ></ListFollowers>
    <ListFollowing
        v-if="visibleListFollowingWindow"
        @closeListFollowingWindowFunction="() => {this.visibleListFollowingWindow = false}"
    ></ListFollowing>
    <ListPlaylists
        v-if="visibleListPlaylistsWindow"
        @closeListPlaylistWindowFunction="() => {this.visibleListPlaylistsWindow = false}"
        @showViewPlaylistCompFunction="() => {this.$emit('showViewPlaylistCompFunction', true)}"
    ></ListPlaylists>

    <div class="main-viewProfile-comp">

        <div class="inline-line">
            <span>Detail info</span>
            <span class="uuid-span" style="margin-left: 20px;">ID : UC39PXZKT8HABLOT7SLC</span>
            <span class="online-offline" style="margin-left: 20px;"><div class="cycle"></div> online</span>
        </div>

        <div class="inner-content">

            <div class="profile-title">

                <div class="photo-and-info">
                    <div class="photo-block">
                        <img id="avatar-profile-id" src="@/assets/user_profile.png" alt="" async>
                    </div>
                    <div class="info-container">
                        <div class="r0-w1-class">
                            <i class="fi fi-ss-mode-portrait"></i>
                            <span id="username-id"></span>
                        </div>
                        <div class="r0-w1-class">
                            <i class="fi fi-bs-link"></i>
                            <span class="status" id="status-prof-id"></span>
                        </div>
                        <div class="r0-w1-class">
                            <i class="fi fi-bs-flag"></i>
                            <span class="country" id="country-prof-id"></span>
                        </div>
                        <div class="r0-w1-class">
                            <i class="fi fi-bs-building"></i>
                            <span class="city" id="city-prof-id"></span>
                        </div>
                        <div class="r0-w1-class">
                            <div class="wrap-box" id="contacts-box-id" @click="visibleListContactsWindow = true">
                                <i class="fi fi-ss-users"></i>
                                <h5>contacts</h5>
                                <span id="contacts-id"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="about-me-block">
                    <div class="bio-info-box">
                        <!-- <div class="name-box"><span>Anna Leonhard</span></div> -->
                        <div class="proffession-box"><span id="speciality-profile-id"></span></div>

                        <div class="r0-w1-class-bio">
                            <span class="bio" id="biograpthy-profile-id">Logic can take you from point A to point B, and imagination can take you anywhere.</span>
                        </div>
                    </div>
                </div>

                <div class="info-block">
                    <span id="bio-id"
                        style="text-align: center; font-size: 9px; display: flex; flex-wrap: wrap; width: 300px; margin-top: 10px;"></span>
                </div>

                <div class="info-block-section">
                    <div class="wrapper-container">
                        <div class="wrap-box" id="followers-box-id" @click="() => {this.visibleListFollowersWindow = true}">
                            <span id="follower-id"></span>
                            <h5>followers</h5>
                        </div>
                        <div class="wrap-box" id="following-box-id" @click="() => {this.visibleListFollowingWindow = true}">
                            <span id="following-id"></span>
                            <h5>following</h5>
                        </div>
                        <div class="wrap-box" id="playlists-box-id" @click="() => {this.visibleListPlaylistsWindow = true}">
                            <span id="playlists-id"></span>
                            <h5>playlists</h5>
                        </div>
                        <!-- <div class="wrap-box" id="posts-box-id">
                            <span id="posts-id"></span>
                            <h5>posts</h5>
                        </div> -->
                    </div>
                </div>

                <div class="spinner-container-navigation" v-if="showSpiner">
                    <swiper class="swiper" :modules="modules" :slides-per-view="1" :centered-slides="true"
                        :space-between="50" :grab-cursor="false" :pagination="{
                            clickable: true
                        }">
                        <swiper-slide class="slide">Music</swiper-slide>
                        <swiper-slide class="slide">Posts</swiper-slide>
                        <swiper-slide class="slide">Photos</swiper-slide>
                    </swiper>
                </div>

                <div class="content-conteiner">
                    <div class="custom-playlist">
                        <div class="line-title">
                            <span>playlists</span>
                            <!-- <span class="text-more">show more</span> -->
                        </div>

                        <div class="playlist_" v-for="playlist in playlistList" :key="playlist.id" @click="createNewPlaylist(playlist.name, playlist)">
                            <img :src="playlist.imgUrl !=null ? playlist.imgUrl : require('@/assets/playlist.png')" alt="" srcset="">
                            <div class="title-playlist">
                                <span id="name-pl-id">{{ playlist.name }}</span>
                                <span>{{ playlist.description }}</span>
                            </div>
                            <div class="avtor-title"><span>{{ playlist.avtor }}</span></div>
                        </div>

                    </div>
                </div>

                <!-- <div class="line-bottom">
                    <div class="upload-music" @click="() => {this.$emit('showCreateMusicWindowFunction', true)}"><span>upload new music</span></div>
                </div> -->
            </div>
            
        </div>

    </div>
</template>
<script>
import ListContacts from '@/components/ModalWindows/ListContacts.vue'
import ListFollowers from '@/components/ModalWindows/ListFollowers.vue'
import ListFollowing from '@/components/ModalWindows/ListFollowing.vue'
import ListPlaylists from '@/components/ModalWindows/ListPlaylists.vue'

import {mapActions, mapMutations, mapState} from 'vuex'
import { UserApi } from '@/api/UserController.js'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

export default {
    data() {
        return {
            showDialogMenu: false,
            titleId: localStorage.getItem('user-id'),
            playlistList: [],
            showSpiner: false,
            visibleListContactsWindow: false,
            visibleListFollowersWindow: false,
            visibleListFollowingWindow: false,
            visibleListPlaylistsWindow: false,
        }
    },

    async mounted() {
        this.setCerrentUserId(localStorage.getItem('user-id'))
        await this.getAllPlayList().then(() => {
            this.playlistList = this.playlistList_
        })
        await UserApi.GetPersonalDataOfUser(this.titleId).then(user => {
            if (!user) {
                console.log('user not found')
                return
            }
            let namebox = document.getElementById('username-id')
            namebox.innerHTML = this.slice_field(user[0].name)
            namebox.setAttribute('title', user[0].name)
            document.getElementById('biograpthy-profile-id').textContent = user[0].bio_info
            document.getElementById('status-prof-id').textContent = this.slice_field(user[0].status)
            document.getElementById('country-prof-id').textContent = this.slice_field(user[0].country)
            document.getElementById('city-prof-id').textContent = this.slice_field(user[0].city)


            // document.getElementById('speciality-profile-id').textContent = user[0]
            document.getElementById('avatar-profile-id').src = user[0].img_url || '@/assets/user_profile.png'
            document.getElementById('follower-id').textContent = user[0].arrayFollowers.length
            document.getElementById('following-id').textContent = user[0].arrayFollowing.length
            document.getElementById('playlists-id').textContent = this.playlistList.length
            document.getElementById('contacts-id').textContent = user[0].arrayChats.length
            // document.getElementById('posts-id').textContent = user[0].arrayFollowing.length
        })
    },

    components: {
        Swiper,
        SwiperSlide,
        ListContacts,
        ListFollowers,
        ListFollowing,
        ListPlaylists,
    },
    setup() {
        return {
            modules: [Pagination]
        }
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
        slice_field(text) {
            if (!text) text = 'user name'
            var sliced = text.slice(0,10);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        },
        openPlaylist(playlistInstance) {
            this.setplaylistId(playlistInstance.id)
        },
        createNewPlaylist(name, playlistInstance)
        {
            console.log('click')
            if(name === this.playlistList[this.playlistList.length - 1].name)
            {
                this.$emit('showDialogWindowCreatePlalistFunction', true)
            } else {
                this.openPlaylist(playlistInstance)
                this.$emit('showViewPlaylistCompFunction', true)
            }
        }
    },

}
</script>
<style lang="scss" scoped>
$color-back: rgba(0, 0, 0, 0.8);

.main-viewProfile-comp {
    width: 100%;
    height: 100vh;
    padding-right: 10px;
    padding-left: 10px;
    background: rgb(6, 6, 6);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;
    color: white;

    .inline-line {
        width: 100%;
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        // border-bottom: 1px solid #333;
        // padding: 15px;
        font-family: Lato,sans-serif;
        font-weight: 500;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: .02em;

        .online-offline {
            display: flex;
            align-items: center;
            .cycle {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: rgb(0, 234, 234);
                margin-right: 5px;
            }
        }
    }

    .inner-content {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-bottom: 50px;
        margin-top: 10px;
        


        .bottom-n {
            width: 100%;
            height: 30vh;
            background-color: $color-back;
        }


        .profile-title {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            // justify-content: center;
            align-items: center;

            .about-me-block {
                width: 100%;
                height: auto;
                padding-left: 15px;


                .bio-info-box {
                    width: 100%;
                    padding: 30px;
                    padding-bottom: 0px;
                    display: flex;
                    flex-direction: column;
                    // align-items: center;
                    justify-content: center;  

                    .proffession-box {
                        font-size: 12px;
                    }
                    .r0-w1-class-bio {
                        word-wrap: break-word;
                        width: 100%;
                        margin-top: 10px;
                        // margin-left: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;            

                    }
                }
            }

            .content-conteiner {
                width: 100%;
                height: 100%;
                // padding: 10px;
                // display: flex;
                align-items: center;
                margin-top: 20px;
                border: 1px solid #111;


                .custom-playlist {
                    margin-top: 10px;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    overflow: auto;

                    .line-title {
                        width: 100%;
                        // padding-left: 40px;
                        margin-bottom: 10px;
                        display: flex;
                        justify-content: center;
                        
                        .text-more {
                            text-transform:lowercase;
                            font-size: 11px;
                            margin-left: 10px;
                            // float: right;

                            &:hover {
                                cursor: pointer;
                                opacity: .7;
                                text-decoration:underline;
                            }
                        }
                    }

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
                            font-size: 12px;
                            margin-bottom: 5px;
                        }
                        
                        .title-playlist {
                            margin-top: 8px;
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            // align-items: center;
                            color: rgba($color: white, $alpha: .5);
                            font-size: 12px;


                            #name-pl-id {
                                margin-bottom: 5px;
                            }
                        }

                        img {
                            width: 100px;
                            height: 100px;
                            // object-fit: contain;
                            object-fit: cover;

                        }

                        &:hover {
                            cursor: pointer;
                            opacity: .6;
                            transition: .4s;
                        }
                    }
                }
            }

            .spinner-container-navigation {
                width: 100%;
                height: 50px;
                padding: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                margin-top: 20px;
                // background-color: red;

                .swiper {
                    width: 50%;
                    height: 100px;
                    // background-color: #333;
                }

                .slide {
                    width: 50%;
                    font-size: 14px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    cursor: default;

                    &:nth-child(1n) {
                        width: 30%;
                    }

                    &:nth-child(2n) {
                        width: 40%;
                    }

                    &:nth-child(3n) {
                        width: 30%;
                    }
                }

            }

            .info-block-section {
                width: 100%;
                height: auto;
                padding: 5px;
                display: flex;
                align-items: center;
                // justify-content: center;

                .wrapper-container {
                    display: flex;
                    // flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-left: 40px;
                    font-size: 16px;

                    // justify-content: space-between;
                    // width: 50%;

                    #posts-box-id {
                        display: flex;
                        align-items: center;
                        #posts-id {
                            text-transform: lowercase;
                            margin-right: 5px;
                            color: rgb(0, 251, 255);
                        }
                                                
                        h5 {
                            text-transform: lowercase;
                            margin-right: 5px;
                            &:hover {
                                cursor: pointer;
                                opacity: .6;
                                transition: .5s;
                            }
                        }
                    }

                    #playlists-box-id {
                        display: flex;
                        align-items: center;
                        #playlists-id {
                            text-transform: lowercase;
                            margin-right: 5px;
                            color: rgb(0, 251, 255);
                        }
                                                
                        h5 {
                            text-transform: lowercase;
                            margin-right: 5px;
                            &:hover {
                                cursor: pointer;
                                opacity: .6;
                                transition: .5s;
                            }
                        }
                    }

                    #following-box-id{
                        display: flex;
                        align-items: center;

                        #following-id {
                            text-transform: lowercase;
                            margin-right: 5px;
                            color: rgb(0, 251, 255);
    
                        }
                        
                        h5 {
                            text-transform: lowercase;
                            margin-right: 5px;
                            &:hover {
                                cursor: pointer;
                                opacity: .6;
                                transition: .5s;
                            }
                        }
                    }
                    
                    #followers-box-id{
                        display: flex;
                        align-items: center;

                        #follower-id {
                            text-transform: lowercase;
                            margin-right: 5px;
                            color: rgb(0, 251, 255);
    
                        }
                        
                        h5 {
                            text-transform: lowercase;
                            margin-right: 5px;
                            &:hover {
                                cursor: pointer;
                                opacity: .6;
                                transition: .5s;
                            }
                        }
                    }

                }

            }


            .line-main-informations {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .btn-detail {
                    padding: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:hover {
                        cursor: pointer;
                        opacity: .6;
                        transition: .5s;
                    }

                    span {
                        margin-left: 5px;
                        font-size: 12px;
                    }

                    img {
                        // margin-top: 10px;
                        width: 16px;
                        height: 16px;
                    }
                }
            }


            .photo-and-info {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
                img {
                    width: 180px;
                    height: 180px;
                    object-fit: contain;
                }

                .info-container {
                    margin-left: 20px;
                    color: white;
                    .r0-w1-class {
                        width: 100%;
                        margin-top: 5px;
                        display: block;

                        #contacts-box-id {
                            display: flex;
                            align-items: center;
                            
                            &:hover {
                                cursor: pointer;
                                opacity: .6;
                                transition: .5s;
                            }

                            h5 {
                                margin-left: 8px;
                                font-family: Lato,sans-serif;
                                font-weight: 500;
                                font-size: 12px;
                                color: rgb(0, 242, 255);
                            }
                            
                            i {
                                margin-right: 5px;
                                color: rgb(0, 242, 255);

                            }

                            #contacts-id {
                                text-transform: lowercase;
                                margin-right: 5px;
                                color: rgb(0, 251, 255);
                                margin-left: 8px;
                                font-family: Lato,sans-serif;
                                font-weight: 500;
                                font-size: 13px;
                            }

                        }

        
                        span {
                            margin-left: 8px;
                            font-family: Lato,sans-serif;
                            font-weight: 500;
                            font-size: 12px;
                        }
        
                        i {
                            margin-right: 5px;
                        }
                    }
                }

            }

        }
    }
}
</style>