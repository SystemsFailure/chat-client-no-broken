<template>

<div class="failAuth-message" v-if="failAuth">
    <h5>Failure</h5>
</div>


</template>
<script>
export default {
    
}
</script>
<style lang="" scoped>
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
</style>