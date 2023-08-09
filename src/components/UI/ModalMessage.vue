<template>

<div class="successAuth-message" v-if="successAuth">
  <h5>Success</h5>
</div>

</template>
<script>
export default {
    
}
</script>
<style lang="" scoped>

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
</style>