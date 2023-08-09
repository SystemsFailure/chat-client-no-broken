<template>
    <div class="main-class-list-following">
        <div class="lds-ripple" v-if="localLoader"><div></div><div></div></div>

        <div class="inner">
            <div class="close-btn">
                <img src="@/assets/svgassets/icons8-удалить.svg" alt="" srcset="" @click="this.$emit('closeListFollowingWindowFunction')">
            </div>

            <div class="list-followers">
                <div class="item" v-for="it in listFollowing" :key="it.id">
                    
                    <div class="img-box">
                        <img :src="it.img_url" alt="">
                    </div>
                    
                    <div class="name-box">
                        <span id="name-id-">{{ it.name }}</span>
                        <span id="desc-id-">{{ it.bio_info || "I'm just developer, i'm 20 years" }}</span>
                    </div>

                    <div class="unfolow-box">
                        <div class="btn-unfollow">unfollow</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {UserApi} from '@/api/UserController'
export default {
    data() {
        return {
            listFollowing: [],
            localLoader: true,
        }
    },

    async mounted() {
        await UserApi.getFollowings(this.$store.state.USERID).then(arr => {
            console.log(arr,'11212')
            this.listFollowing = arr
            this.localLoader = false
        })
    },
}
</script>
<style lang="scss" scoped>

.main-class-list-following {
    width: 500px;
    min-height: 160px;
    max-height: 500px;
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

        .list-followers {
            margin-top: 20px;
            overflow: auto;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            // justify-content: center;
            // align-items: center;
            color: white;
            .item {
                width: 100%;
                height: auto;
                padding: 10px;
                display: flex;
                align-items: center;
                border:1px solid rgba($color: #000000, $alpha: .0);

                &:hover {
                    cursor: pointer;
                    border:1px solid #333;
                }

                .unfolow-box {
                    padding: 5px;
                    font-family: Lato,sans-serif;
                    font-weight: 500;
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: .02em;
                    margin-left: auto;
                    .btn-unfollow {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #888;
                        border-radius: 5px;
                        background-color: #21262d;
                        border: 1px solid #333;
                        padding: 14px 10px 10px 10px;
                        &:hover {
                            cursor: pointer;
                            opacity: .8;
                            transition: .3s;
                            border: 1px solid #999;
                        }
                    }
                }

                .img-box {
                    img {
                        cursor: pointer;
                        width: 32px;
                        height: 32px;
                        margin-right: 8px;
                    }
                }

                .name-box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 100%;

                    #name-id- {
                        color: white;
                        font-size: 15px;
                    }

                    #desc-id- {
                        color: #888;
                        font-size: 14px;
                    }
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
            img {
                margin-right: 4px;
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