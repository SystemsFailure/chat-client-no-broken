<template>
    <div class="main-class-comp-custom">
        <!-- <div class="inner-container"></div> -->
        <h5 class="inner-container">{{  modalText }}</h5>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },

    props: {
        modalText: {},
        modalTextfromNotifyComp: {},
    }
}
</script>
<style lang="scss" scoped>

.main-class-comp-custom {
    width: 300px;
    height: auto;
    padding: 10px;
    border-left: 1px solid rgb(9, 255, 0);
    background-color: rgba($color: #000000, $alpha: .8);
    z-index: 15;
    position: fixed;
    right: 0;
    margin-top: 2%;
    .inner-container {
        color:white;
        font-family: Lato,sans-serif;
        font-weight: 700;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: .02em;
    }
}

</style>