<template>
    <!-- <div class="main-comp-profile-card"> -->
        <div class="content-card" id="divDrag" v-for="n in itemByProfile" :key="n.id">
            <div class="btn0-close-profile"><img src="@/assets/svgassets/icons8-удалить.svg" alt="" @click="() => {this.$emit('closeProfileFunction', false)}"></div>
            <div class="header-drag-simple" id="divDragheader-simple"></div>

            <div class="inside-content">
                <img :src="n.img_url || require('../assets/user_profile.png')" alt="" id="avatar-prof-id">
            </div>

            <div class="center-content">
                <div class="info-box">
                    <h3 class="name-user-text">{{n.name}}</h3>
                    <h3 class="name-user-text">{{n.country || undefined}}</h3>
                    <h4 class="bio-user-text">{{n.bio_info || undefined}}</h4>
                </div>

                <div class="userful-info">
                    <div class="items-info-boxes">
                        <div class="item-inf" @click="openProfileOtherUser"><h4>open</h4></div>
                    </div>

                    <div class="useful-box-bottom">
                        <div class="btns-box">
                            <!-- <div class="item-btn">Secret chat</div> -->
                            <!-- <div class="item-btn">Add to chats</div> -->
                            <!-- <div class="item-btn">Write</div> -->
                        </div>
                    </div>

                    <div class="bio-info-box">
                        <div class="name-box"><span>Anna Leonhard</span></div>
                        <div class="proffession-box"><span>ML Developer</span></div>

                        <div class="r0-w1-class-bio">
                            <span class="bio">Logic can take you from point A to point B, and imagination can take you anywhere.</span>
                        </div>
                    </div>


                    <div class="useful-info">
                        <div class="followers-box-id">
                            <span style="color: rgb(0, 251, 255);">0</span>
                            <span class="followers-id">followers</span>
                        </div>
                        <div class="following-box-id">
                            <span style="color: rgb(0, 251, 255);">12</span>
                            <span class="following-id">following</span>
                        </div>
                        <div class="following-box-id">
                            <span style="color: rgb(0, 251, 255);">25</span>
                            <span class="following-id">contacts</span>
                        </div>
                        <!-- <div class="following-box-id">
                            <span style="color: rgb(0, 251, 255);">405</span>
                            <span class="following-id">musics</span>
                        </div>
                        <div class="following-box-id">
                            <span style="color: rgb(0, 251, 255);">53</span>
                            <span class="following-id">posts</span>
                        </div> -->
                    </div>
                </div>
            </div>


        </div>
    <!-- </div>  -->
</template>

<script>
import dragApi from '@/hooks/hookDragComposition'
import { mapState, mapMutations } from 'vuex'

export default {
    data() {
        return {
            itemByProfile: this.$store.state.itemByProfile

        }
    },

    computed: {
        ...mapState([
            'player',
        ]),
    },

    mounted() {
        this.dragElement(document.getElementById('divDrag'))
    },

    methods: {
        ...mapMutations({
            changeShowProfileOtherUser: 'changeShowProfileOtherUser',
        }),
        openProfileOtherUser() {
            // code...
            this.changeShowProfileOtherUser();
            this.$emit('closeProfileFunction', false);
        },
    },

    setup() {
        const {dragElement} = dragApi()
        return {
            dragElement,
        }
    }
}
</script>

<style scoped lang="scss">
$color-back: rgba(0, 0, 0, 0.7);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;

.header-drag-simple {
        position: absolute;
        width: 100%;
        height: 100px;
        // border-bottom: 1px solid #4e5f7d;
        z-index: -1;
    }



.content-card {
    width: 400px;
    height: 50%;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    // border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(7, 7, 7, 0.85);
    position: absolute;
    z-index: 1000;
    font-family: Lato,sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;


    .btn0-close-profile {
        display: flex;
        align-items: center;
        justify-content: end;
        position: absolute;

        padding-top: 20px;
        padding-right: 20px;
        font-size: 12px;
        color: white;
        z-index: 11;
        right: 0;

        img {
            width: 14px;
            height: 14px;
        }

        &:hover {
            cursor: pointer;
            opacity: .8;
            transition: .1s;
        }
    }

    .inside-content {
        width: 100%;
        display: flex;
        justify-content: center;

        // border: 1px solid #ff6600;

        img {
            border: 1px solid rgba(255, 255, 255, 0.3);
            width: 200px;
            height: 200px;
            border-radius: 50%;
            transform: translateY(-50px);
            object-fit: contain;
            pointer-events: none;
        }

        img:hover {
            cursor: pointer;

        }
    }

    .center-content {
        width: 100%;
        // border: 1px solid #4e5f7d;
        .info-box {
            width: 100%;

            display: flex;
            align-items: center;
            flex-direction: column;
            .name-user-text {
                color: white;
            }
            .bio-user-text {
                color:white;
                font-family:Verdana, Geneva, Tahoma, sans-serif;
                font-weight: 300;
            }
        }

        .userful-info {
            margin-top: 10px;
            width: 100%;
            height: 150px;
            display: flex;
            align-items: center;
            flex-direction: column;

            .useful-info {
                color: #999;
                width: 100%;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: center;
                padding: 15px;

                .followers-box-id {
                    font-size: 12px;
                    text-transform: lowercase;
                    margin-right: 5px;
                    .followers-id {
                        margin-left: 5px;

                    }

                    &:hover {
                        cursor: pointer;
                        opacity: .6;
                        transition: .3s;
                    }
                }
                
                .following-box-id {
                    margin-left: 10px;
                    font-size: 12px;
                    text-transform: lowercase;
                    margin-right: 5px;
                    .following-id {
                        margin-left: 5px;

                    }

                    &:hover {
                        cursor: pointer;
                        opacity: .6;
                        transition: .3s;
                    }
                }
            }

            .bio-info-box {
                color: #888;
                text-transform: none;
                width: 100%;
                padding: 30px;
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

                .r0-w1-class-r {

                }
            }

            .items-info-boxes {
                width: 60%;
                display: flex;
                justify-content: space-between;
                height: 50%;

                .item-inf {
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    border: 1px solid rgba($color: #000000, $alpha: .0);
                    font-size: 10px;

                    &:hover {
                        cursor: pointer;
                        border: 1px solid #3f71c8;
                        transition: .3s;
                        
                    }


                    h4 {
                        color: white;
                    }

                    span {
                        color: white;
                        font-weight: bold;
                    }
                }
            }
            .useful-box-bottom {
                width: 100%;
                height: 50%;
                display: flex;
                justify-content: center;
                margin-top: 10px;
                .btns-box {
                    width: 80%;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .item-btn {
                        margin-left: 10px;
                        padding: 15px;
                        color: white;
                        // width: 100px;
                        // height: 40px;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        backdrop-filter: blur(4.2px);
                        -webkit-backdrop-filter: blur(4.2px);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        background: none;
                        // background: rgba($color: #212020, $alpha: .5);

                        font-weight: bold;
                    }

                    .item-btn:hover {
                        cursor: pointer;
                        box-shadow: 0 2px 15xpx rgb(0, 255, 242);
                        border: 1px solid rgb(0, 255, 242);
                        transition: .3s;
                    }
                }
            }
        }
    }
    .center-content:hover {
        cursor:default;
    }
}

</style>