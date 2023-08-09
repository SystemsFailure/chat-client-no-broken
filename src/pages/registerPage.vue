<template>

<div class="failAuth-message" v-if="failAuth">
    <h5>Failure</h5>
  </div>

<div class="successAuth-message" v-if="successAuth">
  <h5>Success</h5>
</div>

<Transition name="slide-right">
  <div v-show="showMenuSettings" class="settings-menu" id="sett-id-win">
  
    <div class="images-menu-settings">
      <div class="title-setting-back-img">
        <span>background image</span>
      </div>
      <div class="close-line">
        <div class="close-btn" @click="hideSettingsPanel">
          <i class="fi fi-rr-cross-small"></i>
        </div> 
      </div>
  
      <div class="imgs-grid">
        <div class="item-img-grid" v-for="item in list_imgs_background" :key="item.id">
          <div class="Backimgs-id" @click="changeBackgroundImage($event, item.id)"></div>
        </div>
      </div>
    </div> 
    
    <div class="window-read-cookie-settings">
      <div class="title-setting-color-style">
        <span>color style</span>
        <ul>
          <!-- <li v-for="item in list_cookie_file" :key="item.id"></li> -->
        </ul>
      </div>
    </div>
  
  </div>
</Transition>

<div class="main">

  <div class="header-reg-comp">
    <div class="right-text">
      <h5 v-if="!$store.state.AuthOrRegister">Register here <a href="#" @click="reverse_"> Sign in →</a></h5>
      <h5 v-else>Already have an account? <a href="#" @click="reverse_"> Log in →</a></h5>
    </div>

    <div v-if="!showMenuSettings" class="left-text">
      <i class="fi fi-ss-settings" @click="showSettingsPanel"></i>
    </div>
  </div>

  
    <Transition name="slide-up-form">
      <FormRegisterComp v-if="$store.state.AuthOrRegister"
      @failAuthDrop="showFailureMessage" 
      @successAuthDrop="showSuccessMessage"
      ></FormRegisterComp>
      
      <FormAuthComp 
      v-else 
      @failAuthDrop="showFailureMessage" 
      @successAuthDrop="showSuccessMessage">
    </FormAuthComp>

    </Transition>

  </div>

</template>

<script>
import FormRegisterComp from "@/components/FormRegisterComp.vue";
import FormAuthComp from "@/components/FormAuthComp.vue";

export default {
    name: "StartPageComp",
    data() {
        return {
            queryName: "",
            queryEm: "",
            queryPassword: "",
            absolut_data: [],
            list_cookie_file: [],
            list_imgs_background: [
              {id: 0, img_path: 'Tiger.jpeg'},
              {id: 1, img_path: 'Ninja.jpeg'},
              {id: 2, img_path: 'RedSpringSpirit.jpeg'},
              {id: 3, img_path: 'Tumblr.jpeg'},
              {id: 4, img_path: 'Tiger.jpeg'},
            ],

            showMenuSettings: false,

            successAuth: false,
            failAuth: false,
        };
    },


    mounted() {

      if(this.getCookieValueByName('imgId') != '' && document.cookie) {
        document.body.style.backgroundImage = `url(${require('@/assets/' + this.list_imgs_background[this.getCookieValueByName('imgId')].img_path)})`
      }


      document.cookie = 'user=eric'
      let list_cookie = document.cookie
      this.list_cookie_file = list_cookie
      console.log(navigator.platform)
      navigator.geolocation.getCurrentPosition((position) => {
        this.do_position_user(position.coords.latitude, position.coords.longitude), err => {
          console.log(err)
        }
      })
      // console.log(list_cookie)

      let imgs = document.getElementsByClassName('Backimgs-id')

      for (let index = 0; index < imgs.length; index++) {
        const element = imgs[index];
        element.style.backgroundImage = `url(${require('@/assets/' + this.list_imgs_background[index].img_path)})`
        
      }


    },


    methods: {

      showSuccessMessage(result) {
        this.successAuth = result
      },

      showFailureMessage(result) {
          this.failAuth = result
      },

      getCookieValueByName(key) {
        var match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
        return match ? match[2] : "";
      },

      changeBackgroundImage(event, id) {
        switch (id) {
          case 0:
            document.body.style.backgroundImage = `${event.target.style.backgroundImage}`
            this.$store.state.id_backgroundImage = id
            document.cookie = `imgId=${id}`
            break;
          case 1:
            document.body.style.backgroundImage = `${event.target.style.backgroundImage}`
            this.$store.state.id_backgroundImage = id
            document.cookie = `imgId=${id}`
            break;
          case 2:
            document.body.style.backgroundImage = `${event.target.style.backgroundImage}`
            this.$store.state.id_backgroundImage = id
            document.cookie = `imgId=${id}`
            break;
          case 3:
            document.body.style.backgroundImage = `${event.target.style.backgroundImage}`
            this.$store.state.id_backgroundImage = id
            document.cookie = `imgId=${id}`
            break;
          case 4:
            document.body.style.backgroundImage = `${event.target.style.backgroundImage}`
            this.$store.state.id_backgroundImage = id
            document.cookie = `imgId=${id}`
            break;

          default:
            break;
        }
      },

      // changeImage() {
      //   let backDiv = document.getElementById('sett-id-win')
      //   // backDiv.classList.add('class_example')
        // backDiv.style.backgroundImage = `url(${require('@/assets/Clouds.png')})`
      //   console.log('click', backDiv)
      // },

      do_position_user(x, y) {
        console.log(x, y)
      },

      showSettingsPanel() {
        this.showMenuSettings = true
      },

      hideSettingsPanel() {
        this.showMenuSettings = false
      },

      reverse_() {
        this.$store.state.AuthOrRegister = !this.$store.state.AuthOrRegister
      },
    },
    components: { FormRegisterComp, FormAuthComp }
}
</script>

<style scoped lang="scss">
$color-back: rgba(0, 0, 0, 0.7);
$color-text: #4e5f7d;

.failAuth-message {
  width: 300px;
  height: auto;
  padding: 10px;
  border-left: 1px solid rgb(255, 0, 0);
  background-color: $color-back;
  z-index: 2;
  position: fixed;
  right: 0;
  margin-top: 2%;

  h5 {
    color:white;
  }
}

.successAuth-message {
  width: 300px;
  height: auto;
  padding: 10px;
  border-left: 1px solid rgb(0, 225, 255);
  background-color: $color-back;
  z-index: 2;
  position: fixed;
  right: 0;
  margin-top: 2%;

  h5 {
    color:white;
  }
}



*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}


.main {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

// .class_example {
//   background-image: url(../assets/Clouds.png);
// }

.settings-menu {
    width: 240px;
    height: 100%;
    position: fixed;

    background: rgba(10, 10, 10, 0.65);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-right: 1px solid rgba(255, 255, 255, 0.3);

    z-index: 1;

    overflow:scroll;
    overflow-x: hidden;


    .window-read-cookie-settings {
      width: 100%;
      height: 20%;
      // background: #00bbff;

      .title-setting-color-style {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        // border-top: 1px solid #4e5f7d;
        // border-bottom: 1px solid #4e5f7d;


        span {
          color:white;
          font-size:14px;
        }
      }
    }


    .images-menu-settings {
      width: 100%;
      height: 100;
      // background: #00bbff;
      // overflow: auto;


      .imgs-grid {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px;

        .item-img-grid {
          width: 200px;
          height: 80px;
          border: 1px solid gray;
          margin-top: 5px;
          padding: 1px;

          .Backimgs-id {
            background-repeat: no-repeat;
            background-position: center center;
            background-attachment: fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            width: 100%;
            height: 100%;
            background: #356184;
          }
        }
      }


      .title-setting-back-img {
        display: flex;
        justify-content: center;
        margin-top: 20px;

        // border-top: 1px solid #4e5f7d;
        // border-bottom: 1px solid #4e5f7d

      }

      span {
        color:white;
        font-size: 14px;
      }

      .close-line {
        width: 100%;
        height: auto;
        padding: 8px;

        .close-btn {
          float: right;

          i {
            color: white;
            display: flex;

            z-index: 9999;
          }

          i:hover {
            // color:black;
            // cursor: pointer;
            opacity: .6;
          }

          i::before {

            display: flex;
            align-items: center;
            justify-content: center;

            position: absolute;
            transform: translateX(-22px) translateY(-24px);
            
            width: 20px;
            height: 20px;
            border-radius: 50%;
            // background-color: #4e5f7d;

            z-index: 9999;
          }
        }
      }
    }
  }

.footer-reg-comp {
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-reg-comp p {
  color: #356184;
  font-size: 16px !important;
  margin-top: 60px;
}

.footer-reg-comp a {
  color: #00bbff;
}

.header-reg-comp{
  width: 100%;
  height: 30vh;

  // background:blueviolet;

}

.right-text{
  float: right;
  margin-right: 10px;
  margin-top: 5px;
}

.right-text h5 {
  font-size: 17px;
  color: #356184;
}

.right-text a{
  color: #00bbff;
}

.left-text {
  // background: red;
  width: 20%;
  padding: 10px;
}

.left-text i {
  font-size: 24px;
  color:white;
}

.left-text i:hover{
  cursor: pointer;
  color:$color-text;
  transition: 0.3s;
}



.slide-up-form-enter-active,
.slide-up-form-leave-active {
  transition: all 0.45s ease-out;
}

.slide-up-form-enter-from {
  opacity: 0.5;
  transform: translateY(610px);
}

.slide-up-form-leave-to {
  opacity: 0.5;
  transform: translateY(-610px);
}


.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>