<template>
  <div class="main">
    <div class="content">

      <div class="wrapper-w">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
      </div>

    </div>
  </div>
</template>

<script>
import store from '@/store/store';

export default {
  name: "StartAppComponent",

  mounted() {
    let userid = localStorage.getItem('user-id');
    if(userid) {
      store.state.isAuth = true;
      store.state.USERID = userid;
    }
    setTimeout(() => {
      this.$router.push('/register')
    }, 4000);
  },

  methods: {
    fun() {
      this.emmiter.emit('togle-btn', this.name)
    }
  }
}
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.wrapper-w {
  padding: 10px;
  border: 1px solid #fff;

  display: flex;
  align-items: center;
  justify-content: center;
}

.main .content{
  width: 100%;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lds-facebook {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80px;
  height: 80px;

  border: 1px solid #fff;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
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

</style>