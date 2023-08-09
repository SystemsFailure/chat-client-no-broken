<template>

  <div class="content">
    <div class="loaderAndText-container">
      <p>Welcome to back!
        <br>Let’s begin the adventure</p>

      <div class="loader-container">
        <Transition name="fade" mode="out-in">
          <div class="lds-facebook" v-if="loader_loading"><div></div><div></div><div></div></div>
        </Transition>
      </div>
    </div>
      <form action="" method="POST">
          <div class="enter-email">
            <h6>Enter your email</h6>
            <div class="inp-content">
              <span>→</span>
              <input type="email" placeholder="email" v-model="queryEmail" style="color: white" @focusout="checkEmail">

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
            <h6>Enter a password</h6>
            <div class="inp-content">
              <span>→</span>
              <input type="password" placeholder="password" style="color: white" v-model="queryPassword" @focusout="checkPassword">

              <Transition name="slide-up" mode="out-in">
                <div class="successInput" v-if="resultInputEnterPassword === true">
                  <i class="fi fi-bs-check"></i>
                </div>
  
                <div class="FailInput" v-else-if="resultInputEnterPassword === false">
                  <i class="fi fi-bs-cross"></i>
                </div>
              </Transition>
            </div>
          </div>
    
          <div class="btn-container">
            <button type="button" @click="sendingAuth">confirm</button>
          </div>
      </form>
  </div>
  </template>
  
  <script>
import { collection, getDocs, query, where} from "firebase/firestore"; 
import {db} from '@/main.js'
import AuthApi from "@/api/AuthController";

  export default {
    name: "FormLoginComp",
    data() {
      return {
        resultInputEnter: null,
        resultInputEnterPassword: null,
        queryEmail: '',
        queryPassword: '',

        loader_loading: false,
  
      }
    },
  
    methods: {
      async sendingAuth() {
        this.loader_loading = true

        const q = query(collection(db, "users"), where("email", "==", this.queryEmail))
        const users = await getDocs(q)
        let user = null

        if(this.resultInputEnter && this.resultInputEnterPassword) {
          if(users.empty) {
            alert('so user is not defined')
            this.loader_loading = false
            return
          }
          users.forEach((doc) => {
            if(doc) {
              if(doc.data().email === this.queryEmail) {
                user = doc
              } else {
                console.log('user is not defined')
              }
            } else {
              console.log('user not found')
            }
          })

          if(!user) alert('so user is not defined!')

          if(user.data().email == this.queryEmail && user.data().password == this.queryPassword) {
            localStorage.setItem("user-name", user.data().name)
            localStorage.setItem("user-id", user.id)
            AuthApi.signin(this.queryEmail, this.queryPassword, user)
            this.$store.state.isAuth = true
            this.$router.push('/messanger')
          } else {
            this.$emit('failAuthDrop', true)
            setTimeout(() => {
              this.$emit('failAuthDrop', false)
          }, 3000);
            alert('So user is not exit, check entered data...')
          }
          } else {
          this.$emit('failAuthDrop', true)
          setTimeout(() => {
            this.$emit('failAuthDrop', false)
          }, 3000);
          }

          this.loader_loading = false
      },

      checkEmail() {
        let regex = new RegExp('[a-z0-9]+@[a-z]');
        if(regex.test(this.queryEmail)) this.resultInputEnter = true
        if(!regex.test(this.queryEmail)) this.resultInputEnter = false
      },

      checkPassword() {
        if(this.queryPassword.length > 4 && this.queryPassword != '') {
          this.resultInputEnterPassword = true
        } else {
          this.resultInputEnterPassword = false
        }
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


*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
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

  .loaderAndText-container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .loader-container {
      width: 33%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;


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
}

.content p{
  font-size: 16px;
  color: ($color-text);
  margin-bottom: 10px;
}

.content h6 {
  color: #00cec7;
  margin-top: 5px;
}

.main .content input{
  padding: 2px;
  margin-top: 5px;
  margin-left: 8px;
  background: none;
  border: none;
  outline: none;
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
}

button:hover {
  border: 1px solid #ffffff;
  cursor: pointer;
  color: white;
}

.enter-email {
  // display: flex;
}

.inp-content {
  display: flex;
  align-items: center;
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

  </style>