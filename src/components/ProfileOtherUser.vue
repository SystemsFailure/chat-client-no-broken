<script setup>
import { db } from '@/main';
import { collection } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore"; 
import { computed, onMounted, ref} from 'vue';
import { useStore } from 'vuex';
import { UserApi } from '@/api/UserController';
const store = useStore();

const toUserId = computed(() => store.state.user_to_id);
const USERID = computed(() => store.state.USERID);
const emit = defineEmits({
    showPlaylistComp: null,
});

let playlists = ref([]);
let toUser_ = ref([]);
let user = ref([]);

let CanFollow = ref(false);

async function getPlaylistsByUser() {
    if(toUserId) {
        const query_ = query(collection(db, "playlist"), where("userId", "==", toUserId.value));
        const querySnapshot = await getDocs(query_);
        querySnapshot.forEach((doc) => {
            const data = {
                id: doc.id,
                name: doc.data().name,
                arrayMusic: doc.data().arrayMusic,
                description: doc.data().description,
                imgUrl: doc.data().imgUrl,
                privateMode: doc.data().privateMode,
                userId: doc.data().userId,
            }
            playlists.value.push(data);
        });
    }
}

function setUserData(data) {
    console.log(data);
    document.getElementById('author-speciality').innerText = data.bio_info || 'No biographical info available';
    document.getElementById('author-quota').innerText = data.status || 'No status, u can set it in settings app';
    document.getElementById('author_followers').innerText = data.arrayFollowers.length;
    document.getElementById('author_followings').innerText = data.arrayFollowing.length;
    document.getElementById('author_posts').innerText = 14;

    document.getElementById('id-username').innerText = data.name;
    document.getElementById('id-useremail').innerText = data.email;
    document.getElementById('id-user_uid').innerText = data.id;
    document.getElementById('id-author_photo').src = data.img_url || require('../assets/user_profile.png');
    
}

async function follow() {
    await UserApi.AddFollower(toUserId.value, USERID.value);
    CanFollow.value = true;
    let countFollowers = document.getElementById('author_followers').innerText; 
    let parsedInt = parseInt(countFollowers);
    parsedInt += 1;
    document.getElementById('author_followers').innerText = parsedInt;
}

async function findUserIdInArrayFollowers(){
    if(toUser_.value[0].arrayFollowers.length > 0) {
        console.log('XXX');
        return toUser_.value[0].arrayFollowers.includes(user.value[0].id);
    }

}

function openPlaylist(playlistObject) {
    if(playlistObject.id) {
        store.commit('playlist/setplaylistId', playlistObject.id);
        emit('showPlaylistComp');
    }
    
};

onMounted(async () => {
    await getPlaylistsByUser();
    toUser_.value = await UserApi.GetPersonalDataOfUser(toUserId.value);
    user.value = await UserApi.GetPersonalDataOfUser(USERID.value);
    setUserData(toUser_.value[0])

    CanFollow.value = await findUserIdInArrayFollowers();
})




</script>
<template lang="html">
    <div class="profile">

        <div class="profile__inline"></div>
        <div class="profile__container">

            <div class="profile__left">

                <div class="profile__container-photo">
                    <img src = "" alt="" id="id-author_photo">
                    <div class="profile__value-online"></div>
                </div>

                <div class="profile__left-bottom-container">

                    <div class="profile__author-speciality">
                        <span id="author-speciality"></span>
                    </div>

                    <div class="profile__author-quota">
                        <span id="author-quota"></span>
                    </div>

                    <div class="profile__social-info">

                        <div class="profile__count-followers"><span class="profile__social_info" id="author_followers"></span> <span> followers</span></div>
                        <div class="profile__count-followings"><span class="profile__social_info" id="author_followings"></span> <span> followings</span></div>
                        <div class="profile__count-posts"><span class="profile__social_info" id="author_posts"></span> <span> posts</span></div>

                    </div>

                </div>

            </div>

            <div class="profile__right">

                <div class="profile__right__top-container">

                    <div 
                        class="slose-btn-box">
                        <img 
                            src="@/assets/svgassets/icons8-удалить.svg" 
                            alt="" 
                            @click="$emit('closeProfileOtherUser')"
                    ></div>

                    <div class="profile__user-data">
                        <div class="profile__username" id="id-username"></div>
                        <div class="profile__useremail" id="id-useremail"></div>
                        <div class="profile__user_uid" id="id-user_uid"></div>
                    </div>

                    <div class="profile__navigation-buttons">
                        <button class="profile__follow1b" v-if="CanFollow">followed</button>
                        <button class="profile__follow0b" @click="follow" v-else>follow</button>
                    </div>
                </div>


                <div class="profile__right__bottom-container">

                    <div class="profile__playlist-container">

                        <div class="profile__item" v-for="it in playlists" :key="0" @click="openPlaylist(it)">

                            <div class="profile__icon-container">
                                <img :src="it.imgUrl || require('@/assets/users/user-default.jpg')" alt="">

                                <div class="profile__name-author">{{ it.name }}</div>
                                <div class="profile__name-playlist">{{ it.description }}</div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>
<style lang="scss" scoped>
$--index: calc(1vw + 1vh);

$text-color-white: white;
$text-color-black: black;
$lin-fradient_oneColor: #00F0FF;
$lin-fradient_twoColor: #FF00B8;
$color-btn-follow: #00BAC6;
$color-icon-online-offline: #00FFFF;
$color-text: #00F0FF;
$color-text-little-hint: #4D4D4D;
$border_avatar__config: 1px solid transparent;
$border_image_gradient: linear-gradient(-180deg, $lin-fradient_oneColor , $lin-fradient_twoColor);
$color-disabledButton: #313131;

$text-font16: calc($--index * .8);
$text-font20: calc($--index * 1);

.profile {
    position: absolute;
    width: calc($--index * 55);
    height: calc($--index * 28);
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    text-align: center;
    background-color: rgba($color: #0b0b0b, $alpha: .5);
    backdrop-filter: blur(15px);
    border-radius: 10px;

    // border: 1px solid transparent;
    // border-image: linear-gradient(-180deg, $lin-fradient_oneColor , $lin-fradient_twoColor);
    // border-image-slice: 1;
}

.profile__inline {
    width: 100%;
    height: calc($--index * .05);
    background-color: #00FFFF;
    z-index: 9;
    position: absolute;
    margin-top: calc($--index * 7);
    z-index: -1;
}


.profile__container {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;


    .profile__left {
        position: relative;
        top: 0;
        left: 0;
        width: calc($--index * 25);
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        .profile__left-bottom-container {
            width: calc($--index * 10);
            height: calc($--index * 12);
            // background-color: red;
            padding: 30px 0px;


            .profile__author-speciality {
                margin-top: 10px;
                color: $text-color-white;
                word-spacing:.2pc;
                font-size: $text-font20;
                text-align: start;
            }
            .profile__author-quota {
                text-align: start;
                color: $text-color-white;
                opacity: .5;
                margin-top: 10px;
                word-spacing: .2pc;
                font-size: $text-font16;
                word-wrap: break-word;
            }
            .profile__social-info {
                width: calc($--index * 10.5);
                height: calc($--index * 10.5);
                display: flex;
                flex-direction: column;
                align-items: start;
                padding-top: 30px;
                font-size: $text-font16;
                text-transform: uppercase;
                word-spacing: .5pc;
                color: $color-text;
                line-height: 30px;
                .profile__count-followers {
                    span{color: $text-color-white}
                    .profile__social_info{color: $color-text}

                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
                .profile__count-followings {
                    span{color: $text-color-white}
                    .profile__social_info{color: $color-text}
                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
                .profile__count-posts {
                    span{color: $text-color-white}
                    .profile__social_info{color: $color-text}
                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
            }
        }
    }
    .profile__container-photo {
        position: relative;
        width: calc($--index * 12);
        height: calc($--index * 12);
        border: 1px solid transparent;
        background: linear-gradient(180deg, $lin-fradient_oneColor , $lin-fradient_twoColor);
        border-radius: 50%;
        
        
        img {
            width: calc($--index * 11.9);
            height: calc($--index * 11.9);
            border-radius: 10em;
            object-fit:cover;
        }
        .profile__value-online {
            width: calc($--index * .9);
            height: calc($--index * .9);
            border-radius: 10em;
            background-color: #00F0FF;
            
            // holy sheet, магия
            position: absolute;
            transform: translate(50%, 50%);
            bottom: 14.64%;
            right: 14.64%;
        }
    }

    .profile__right {
        position: relative;
        top: 0;
        right: 0;
        width: calc($--index * 40);
        height: calc($--index * 50);

        .profile__right__top-container {
            width: 100%;
            height: calc($--index * 6.5);
            display: flex;
            position: relative;
            .slose-btn-box {
                position: absolute;
                right: 0;
                top: 0;
                z-index: 1;


                img {
                    width: calc($--index * 0.8);
                    height: calc($--index * 0.8); 
                }

                &:hover {
                    cursor: pointer;
                    opacity: .5;
                }
            }

            .profile__user-data {
                font-size: $text-font16;
                text-align: start;
                color: $text-color-white;
                line-height: calc($--index * 1.5);
                display: flex;
                flex-direction: column;
                justify-content: center;

                .profile__username {

                }
                .profile__useremail {
                }
                .profile__user_uid {
                }

            }
            .profile__navigation-buttons {
                position: relative;
                width: calc($--index * 25);
                height: calc($--index * 5.5);
                margin-left: auto;
                display: flex;
                align-items: end;
                justify-content: center;

                .profile__follow1b {
                    padding: calc($--index * .5) calc($--index * 2);
                    font-size: calc($--index * .6);
                    word-spacing:normal;
                    text-align: center;
                    color: $text-color-white;
                    background-color: $color-disabledButton;
                    border: none;
                    text-transform: uppercase;
                    font-weight: 700;
                    border-radius: .3em;
                    margin-bottom: 20px;
                    margin-right: 50px;
                }
                .profile__follow0b {
                    padding: calc($--index * .5) calc($--index * 2);
                    font-size: calc($--index * .6);
                    word-spacing:normal;
                    text-align: center;
                    color: $text-color-white;
                    background-color: $color-btn-follow;
                    border: none;
                    text-transform: uppercase;
                    font-weight: 700;
                    border-radius: .3em;
                    margin-bottom: 20px;
                    margin-right: 50px;
                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
                .profile__message0b {
                    padding: calc($--index * .5) calc($--index * 2);
                    font-size: calc($--index * .6);
                    word-spacing:normal;
                    text-align: center;
                    color: $text-color-white;
                    background-color: transparent;
                    border: 1px solid $color-btn-follow;
                    text-transform: uppercase;
                    font-weight: 700;
                    border-radius: .3em;
                    margin-bottom: 20px;
                    margin-right: 50px;

                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
            }

        }
        .profile__right__bottom-container {
            width: 100%;
            height: calc($--index * 20.4);
            padding: 10px;

            .profile__playlist-container {
                overflow: auto;
                width: calc($--index * 38);
                height: calc($--index * 20);
                display:flex;
                flex-wrap: wrap;
                padding: 20px;
                color: $text-color-white;
            }
            .profile__item {
                width: calc($--index * 8);
                height: calc($--index * 8);
                border-radius: 10px;
                margin: 0 5px;
                flex: 1 1 1;

                margin-top: 50px;
                // margin-left: 20px;
            }
            .profile__icon-container {
                
                img {
                    border-radius: 10px;
                    width: 100%;
                    height: 100%;

                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
            }
            .profile__name-author {
            }
            .profile__name-playlist {
            }
        }
    }


}

    
</style>