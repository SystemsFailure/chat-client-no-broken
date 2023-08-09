<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {

    }
  },

  components: {
  },
}
</script>

<style>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


body {
  background-image: url(./assets/kit.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  overflow-y: hidden;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;

}

::-webkit-scrollbar-track {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0) inset;
  background-color: #111;
  position: absolute;

}

::-webkit-scrollbar-thumb {
  background-color: hsl(0, 0%, 21%);
  background-image: -webkit-gradient(linear, 0 0, 0 100%,
  color-stop(.5, transparent), to(transparent));
  border-radius: 15%;
  position: absolute;

}
::-webkit-scrollbar-thumb:hover {
  background-color: hsl(0, 0%, 20%);
  transition: .3s;
}
</style>
