<template>
    <div class="main-class-view-photo-window">
        <div class="btn-container"><div><i @click="() => {this.$emit('closeWindowFunction', false)}" class="fi fi-bs-cross"></i></div></div>
        <div class="wrap-wrapper-cont">
            <div class="wrapper-continer">

                <!-- <img :src="imageURL ? imageURL : null" alt=""> -->

                <swiper
                class="top-swiper"
                :style="{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff'
                }"
                :modules="modules"
                :space-between="10"
                :navigation="true"
                :thumbs="{ swiper: thumbsSwiper }"
                >
                    <swiper-slide class="slide" v-for="index in arrayListImages" :key="index">
                        <img :src="index.img_url" sizes="(max-width: 1000px) 1000px, (min-width: 1000px) 1000px" />
                    </swiper-slide>
                </swiper>
                
            </div>
        </div>
        
        <div class="animator-target" @mouseover="() => {this.showBottomSlider = true}">
            <div class="title-targer">
                <span>swipe</span>
                <i class="fi fi-bs-angle-double-small-down"></i>
            </div>
            <transition name="bottom-slide">
                <div class="list-images" @mouseleave="() => {this.showBottomSlider = false}" v-show="showBottomSlider">

                    <swiper
                    class="thumbs-swiper"
                    :modules="modules"
                    :space-between="10"
                    :slides-per-view="4"
                    :watch-slides-progress="true"
                    :prevent-clicks="false"
                    :prevent-clicks-propagation="false"
                    @swiper="setThumbsSwiper"
                    >
                        <swiper-slide class="slide" v-for="index in arrayListImages" :key="index">
                            <img :src="index.img_url"/>
                        </swiper-slide>
                    </swiper>

                </div>
            </transition>
        </div>

    </div>
</template>
<script>
import {MessagesApi} from '@/api/MessagesController'

import { ref } from 'vue'
import { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export default {
    data() {
        return {
            arrayListImages: [],
            showBottomSlider: false,
        }
    },
    props: {
        imageURL: {},
        toID: {},
    },

    mounted() {
        if (this.$store.state.USERID !=null || undefined)
        {
            MessagesApi.getAllMessage({fromId: this.$store.state.USERID, toId: this.toID}).then(arrayList => {
                arrayList.forEach(elem => {
                    if (elem.img_url != null)
                    {
                        this.arrayListImages.push(elem)
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.log('USERID is not defined')
        }
    },

    components: {
      Swiper,
      SwiperSlide
    },
    setup() {
      const thumbsSwiper = ref()
      const setThumbsSwiper = (swiper) => {
        thumbsSwiper.value = swiper
      }

      return {
        modules: [Navigation, Thumbs],
        setThumbsSwiper,
        thumbsSwiper
      }
    }
}
</script>
<style lang="scss" scoped>


.thumb-example {
    height: 480px;
    // background-color: $black;
  }

  .top-swiper,
  .thumbs-swiper {
    .slide {
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        // image-rendering: pixelated;
      }
    }
  }

  .top-swiper {
    height: 90%;
    width: 100%;
  }

  .thumbs-swiper {
    height: 100%;
    box-sizing: border-box;
    // padding: $gap 0;

    .slide {
      width: 25%;
      height: 100%;
      opacity: 1;
      &:not(.swiper-slide-thumb-active) {
        opacity: 0.4;
      }
    }
  }


.main-class-view-photo-window {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .8);
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    position: absolute;
    z-index: 12;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;

    .animator-target {
        position: absolute;
        width: 100%;
        height: 20%;
        // background-color: black;
        z-index: 13;
        bottom: 0;

        .title-targer
        {
            position: absolute;
            margin: 0;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -10%);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 22px;

        }
        .list-images {
            position: absolute;
            width: 100%;
            height: 100%;
            // background-color: red;
            bottom: 0;
        }
    }


    .btn-container {
        position: absolute;
        margin-left: auto;
        color: white;
        // background-color: red;
        right: 0;
        font-size: 12px;
        margin-right: 10px;
        margin-top: 10px;
        z-index: 15;

        &:hover {
            cursor: pointer;
            opacity: .7;
        }

        i {

            &:hover {
            }
        }

    }
    .wrap-wrapper-cont {
        width: 100%;
        height: 100%;
        z-index: 12;
        display: flex;
        align-items: center;
        justify-content: center;


        .wrapper-continer {
            width: 1000px;
            height: 95%;
            background-color: rgba($color: #000000, $alpha: 1);

            img {
                width: 100%;
                height: 100%;
                // max-width: 800px;
                // max-height: 600px;
                border: 1px solid #333;
            }
        }
    }

}


.bottom-slide-enter-active,
.bottom-slide-leave-active {
  transition: all 0.15s ease-out;
}

.bottom-slide-enter-from {
  opacity: 0.5;
  transform: translateY(60px);
}

.bottom-slide-leave-to {
  opacity: 0.5;
}

</style>