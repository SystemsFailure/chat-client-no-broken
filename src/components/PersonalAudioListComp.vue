<template>
    <div class="main-window-pr-audio-comp">
        <div class="inner-container">My Music</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
.main-window-pr-audio-comp {
    position: absolute;
    width: 96%;
    height: 100%;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner-container {
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .3);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>