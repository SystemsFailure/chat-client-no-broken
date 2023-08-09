<template>
    <div class="navigation">
        <div class="content">
            <div 
                @click="openMenuAny(0)"
                class="item-im"
                :class="[showMenuMail? itemNavbarLink : '']"
            >
                <img src="@/assets/svgassets/icons8-user-67.png" alt="">
            </div>
            <div 
                @click="openMenuAny(1)" 
                class="item-im" 
                :class="[showMenuChats? itemNavbarLink : '']"
            >
                <img src="@/assets/svgassets/icons8-тема-48.png" alt="">
            </div>
            <div 
                @mouseenter="showDetailMenuFunction" 
                @mouseleave="closeDetailMenuFunction" 
                class="item-im" 
                :class="[showMenuMusics? itemNavbarLink : '']"
            >
                <div class="three-points"><img src="@/assets/svgassets/icons8-меню-2-48.png" alt=""></div>
                <div class="detailmenu" v-if="showDetailMenu">
                    <div class="myaudio" @click="showMyMusic"><img src="@/assets/svgassets/icons8-папка-с-музыкой-100.png" alt=""></div>
                    <div class="allaudio" @click="GlobalListMusicss"><img src="@/assets/svgassets/icons8-playerme-120.png" alt=""></div>
                </div>
                <img v-if="!myMusicIcon" src="@/assets/svgassets/icons8-playerme-120.png" alt="">
                <i v-else class="fi fi-bs-music-alt">
                </i>
            </div>
            <div 
                @click="openMenuAny(2)" 
                class="item-im" 
                :class="[showMenuSettings? itemNavbarLink : '']"
            >
                <img src="@/assets/svgassets/icons8-сервисы-64.png" alt="chats" srcset="">
            </div>

        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'

export default {
    data() {
        return {
            showMenuChats: true,
            showMenuMail: false,
            myMusicIcon: false,
            showMenuSettings: false,
            showMenuMusics: false,
            showDetailMenu: false,

            itemNavbarLink: '',
        }
    },
    mounted() {
        this.setbackgroundNavBarItem()
    },
    computed: {
        ...mapState('themescontroller', {
            themeSchemaDefault: 'themeSchemaDefault',
            currTheme: 'currTheme',
        }),
    },
    watch: {
        currTheme: {
            handler() {
                this.setbackgroundNavBarItem()
            },
            deep: true,
        }
    },
    methods: {
        setbackgroundNavBarItem() {
            switch (localStorage.getItem('theme-schema')) {
                case 'default':
                    this.itemNavbarLink = 'item-selected-default'
                    break;
                case 'green':
                    this.itemNavbarLink = 'item-selected-green'
                    break;
                case 'teal':
                    this.itemNavbarLink = 'item-selected-teal'
                    break;
                case 'orange':
                    this.itemNavbarLink = 'item-selected-orange'
                    break;
                case 'feolet':
                    this.itemNavbarLink = 'item-selected-feolet'
                    break;
                case 'red':
                    this.itemNavbarLink = 'item-selected-red'
                    break;
                default:
                    break;
            }
        },
        showDetailMenuFunction() {
            this.showDetailMenu = true
        },
        closeDetailMenuFunction() {
            this.showDetailMenu = false
        },
        showMyMusic() {
            this.$emit('showMyMusicCompFunction', false)
            this.myMusicIcon = true

            this.showMenuMusics = true
            this.showMenuSettings = false
            this.showMenuMail = false
            this.showMenuChats = false
        },
        GlobalListMusicss() {
            this.$emit('openMenu', 3)
            this.myMusicIcon = false

            this.showMenuMusics = true
            this.showMenuSettings = false
            this.showMenuMail = false
            this.showMenuChats = false
        },
        openMenuAny(integer) {
            switch (integer) {
                case 0:
                    this.showMenuMail = true
                    this.showMenuChats = false
                    this.showMenuSettings = false
                    this.showMenuMusics = false
                    this.$emit('openMenu', integer)
                    break;
                case 1:
                    this.showMenuChats = true
                    this.showMenuMail = false
                    this.showMenuSettings = false
                    this.showMenuMusics = false
                    this.$emit('openMenu', integer)
                    break;
                case 2:
                    this.showMenuSettings = true
                    this.showMenuMail = false
                    this.showMenuChats = false
                    this.showMenuMusics = false
                    this.$emit('openMenu', integer)
                    break;
                case 3:
                    this.showMenuMusics = true
                    this.showMenuSettings = false
                    this.showMenuMail = false
                    this.showMenuChats = false
                    this.$emit('openMenu', integer)
                    break;
                default:
                    alert('no choice something');
                    break;
            }
        }
    }
}
</script>

<style scoped lang="scss">


.item-selected-default {
    background-color: #1e1c1cc6 !important;
    border-left: 2px solid wheat;
}
.item-selected-teal {
    background-color: teal !important;
    border-left: 2px solid wheat;
}.item-selected-green {
    background-color: #00ff158e !important;
    border-left: 2px solid wheat;
}.item-selected-orange {
    background-color: #ff5900 !important;
    border-left: 2px solid wheat;
}.item-selected-feolet {
    background-color: #e100ff8e !important;
    border-left: 2px solid wheat;
}.item-selected-red {
    background-color: #ff0000c6 !important;
    border-left: 2px solid wheat;
}


$color-back: rgba(0, 0, 0, 0.7);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;

.navigation {
    width: 4%;
    height: 100vh;
    position: fixed;
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
    background: rgb(7, 7, 7);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);

    .content {
        width: 100%;

        img{
            width: 25px;
            height: 25px;
            color: white;
        }
            .item-im:hover {
                background-color: #1b1e1e80;
                border-left: 2px solid wheat;
            }
            .item-im {
                width: auto;
                height: 60px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;

                video{
                    width: 25px;
                    height: 25px;
                }

                img {
                    width: 25px;
                    height: 25px;
                    color: white;
                }

                .detailmenu {
                    right: 0;
                    height: 100%;
                    width: 120px;
                    position: absolute;
                    // background-color: red;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translateX(121px);

                    .myaudio {
                        width: 60px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        backdrop-filter: blur(5px);
                        background-color: #111;
                        
                        &:hover {
                            cursor: pointer;
                            background-color: #1b1e1e80;
                            transition: .3s;
                        }
                    }

                    .allaudio {
                        width: 60px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        backdrop-filter: blur(5px);
                        background-color: #111;



                        &:hover {
                            cursor: pointer;
                            background-color: #1b1e1e80;
                            transition: .3s;
                        }

                    }
                }

                .three-points {
                    right: 0;
                    height: 100%;
                    width: 30%;
                    position: absolute;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 12;

                    .fi-ss-menu-dots-vertical {
                        font-size: 12px;
                        margin-top: 4px;
                    }

                }
                i {
                    color:white;

                }
            }
        }
}

@media screen and (max-width: 768px) {
    .navigation {
        width: 10%;
    }
}
</style>