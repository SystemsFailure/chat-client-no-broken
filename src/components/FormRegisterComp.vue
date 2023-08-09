<template>
    <div class="content">
      <div class="loaderAndText-container">
        <p>Welcome to Kali-messanger!
          <br>Let’s begin the adventure</p>
    
          <div class="loader-container">
            <Transition name="fade" mode="out-in">
              <div class="lds-facebook" v-if="loader_loading"><div></div><div></div><div></div></div>
            </Transition>
          </div>
      </div>

      <form action="" method="POST">

        <div class="enter-name">
          <h6>Enter your name</h6>
          <div class="inp-content">
            <span>→</span>
            <input type="text" placeholder="name" v-model="queryName" style="color: white">

            <Transition name="slide-up" mode="out-in">
                <div class="successInput" v-if="resultInputEnterName === true">
                  <i class="fi fi-bs-check"></i>
                </div>

                <div class="FailInput" v-else-if="resultInputEnterName === false">
                  <i class="fi fi-bs-cross"></i>
                </div>
            </Transition>

          </div>
        </div>

        <div class="enter-email">
          <h6>Enter your email</h6>
          <div class="inp-content">
            <span>→</span>
            <input type="email" placeholder="email" v-model="queryEm" style="color: white" @focusout="checkEmail">

            <Transition name="slide-up" mode="out-in">
                <div class="successInput" v-if="resultInputEnter === true">
                  <i class="fi fi-bs-check"></i>
                </div>

                <div class="FailInput" v-else-if="resultInputEnter === false">
                  <i class="fi fi-bs-cross"></i>
                </div>
            </Transition>

          </div>
        </div>

        <div class="enter-pass">
          <h6>Create a password</h6>
          <div class="inp-content">
            <span>→</span>
            <input id="id-inp-password" type="password" placeholder="password" style="color: white" v-model="queryPassword" @focusout="checkPassword">

            <Transition name="slide-up" mode="out-in">
                <div class="successInput" v-if="resultInputEnterPassword === true">
                  <i class="fi fi-bs-check"></i>
                </div>

                <div class="FailInput" v-else-if="resultInputEnterPassword === false">
                  <i class="fi fi-bs-cross"></i>
                </div>
            </Transition>

            <div class="view-password"><i @click="showAndHidePassword" v-if="show_password" :style="{'color' : 'white'}" class="fi fi-bs-eye"></i><i @click="showAndHidePassword" v-else class="fi fi-ss-eye-crossed"></i></div>
          </div>
        </div>

        <div class="btn-container">
          <button type="button" @click="send">confirm</button>
        </div>
      </form>
    </div>
</template>

<script>
import AuthApi from "@/api/AuthController";
import { UserApi } from "@/api/UserController";
import {sendEmailMessageAccess} from '@/api/MailController.js'
import { validName } from "@/validators";

export default {
  name: "FormRegisterComp",
  data() {
        return {
          resultInputEnter: null,
          resultInputEnterName: null,
          resultInputEnterPassword: null,
          loader_loading: false,
          queryName: "",
          queryEm: "",
          queryPassword: "",
          absolut_data: [],
          show_password: false,
        };
    },

    watch: {
      queryEm: {
        handler(newValue) {
          let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          if(emailPattern.test(newValue)) console.log('Email is valid')
          else console.log("Email is not valid")
        }
      }

    },

  methods: {

    checkEmail() {
        let regex = new RegExp('[a-z0-9]+@[a-z]');
        if(regex.test(this.queryEm)) this.resultInputEnter = true
        if(!regex.test(this.queryEm)) this.resultInputEnter = false
      },

    checkPassword() {
      if(this.queryPassword.length > 4 && this.queryPassword != '') {
        this.resultInputEnterPassword = true
      } else {
        this.resultInputEnterPassword = false
      }
    },

    showAndHidePassword() {
      this.show_password = !this.show_password
      if(this.show_password === true) {
        let queryPassword = document.getElementById('id-inp-password')
        if(queryPassword) {
          queryPassword.type = 'text'
        } else {
          console.log('querypassword is not defined')
        }
      } else {
        let queryPassword = document.getElementById('id-inp-password')
        queryPassword.type = 'password'
      }
    },

    async send() {
      try {
        if(validName(this.queryName)) {
          if (this.resultInputEnter && this.resultInputEnterPassword) {
            this.loader_loading = true
            const data = {
              queryName: this.queryName,
              queryEm: this.queryEm,
              queryPassword: this.queryPassword
            }
            UserApi.addUserToBase(data, localStorage).then(() => {
              setTimeout(() => {
                  this.$emit('successAuthDrop', true)
                  setTimeout(() => {
                    this.$emit('successAuthDrop', false)
                  }, 3000)
                this.loader_loading = false
                }, 3000)
                AuthApi.singup(this.queryEm, this.queryPassword)
                sendEmailMessageAccess()
              }).catch(err => {
                  console.log(err)
                  this.$emit('failAuthDrop', true)
                  setTimeout(() => {
                    this.$emit('failAuthDrop', false)
                  }, 3000)
                  this.loader_loading = false
              }) 
          } else {
              console.log("data is not valid!")
          }
        }
      } catch (error) {
        console.log(error.textError, error.nameFunction)
      }
    },
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


*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.loaderAndText-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .loader-container {
      width: 33%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;


      .lds-facebook {
        display: inline-block;
        position: relative;
        width: 40px;
        height: 40px;

      }
      .lds-facebook div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: #00ffe1;
        box-shadow:0 0 25px #00fff7;
        animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
      }
      .lds-facebook div:nth-child(1) {
        left: 8px;
        animation-delay: -0.24s;
      }
      .lds-facebook div:nth-child(2) {
        left: 32px;
        animation-delay: -0.12s;
      }
      .lds-facebook div:nth-child(3) {
        left: 56px;
        animation-delay: 0;
      }
      @keyframes lds-facebook {
        0% {
          top: 8px;
          height: 64px;
        }
        50%, 100% {
          top: 24px;
          height: 32px;
        }
      }
    }
  }

.content{
  position: fixed;

  margin-top: 15%;

  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 30px 30px;
  width: 500px;
  background: ($color-back);
  border: 1px solid rgba(55, 55, 55, 0.3);
  border-radius: 6px;
}

.content p{
  font-size: 16px;
  color: ($color-text);
  margin-bottom: 10px;
}

.content h6 {
  color: ($color-text-teal);
  margin-top: 5px;
}

.content input{
  padding: 2px;
  margin-top: 8px;
  margin-left: 8px;
  background: none;
  border: none;
  outline:none;
}

.content .enter-pass {
  // background-color:#00ff80;
}

.content .enter-pass .inp-content {
  // background-color: #00cec7;
  display: flex;
  align-items: center;
}


.content .view-password {
  height: 100%;
  // display: flex;
  // align-items: flex-end;

  // background: red;
  padding-top: 4px;
  width: 100%;
}

.content .view-password i {
  color:$color-text;
  font-size: 18px;
  float: right;
}

.btn-container {
  width: 100%;
  display: flex;
  justify-content: end;
}

button {
  background: none;
  border: 1px solid #353535;
  color: ($color-text);
  width: 100px;
  padding: 5px;
  margin-top: 20px;
}

button:hover {
  border: 1px solid #ffffff;
  cursor: pointer;
  color: white;
}

.inp-content {
  display: flex;
  align-items: center;
}

.inp-content span{
  color: white;
  font-size: 17px;
}

p{
  font-size: 16px;
  color: #4e5f7d;
  margin-bottom: 10px;
}

h6 {
  color: #00cec7;
  margin-top: 5px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

// animation fade loader:::after
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.inp-content .successInput i{
  margin-top: 2px;
  color: rgb(0, 255, 106);
  font-size: 12px;
}

.inp-content .FailInput {
  margin-top: 2px;
  color: rgb(255, 0, 0);
  font-size: 10px;
}


</style>