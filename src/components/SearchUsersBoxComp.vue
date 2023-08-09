<template>

    <div class="search-users">
        <input type="text" placeholder="searching..." class="inp-search" id="search_e" v-bind:value="modelValue" @input="(event) => {this.$emit('update:modelValue', event.target.value)}">
        <div class="clearInp" @click="() => {this.$emit('clearTextFunction')}"><img src="@/assets/svgassets/icons8-удалить.svg" alt=""></div>
    </div>

</template>

<script>

export default {
    props: {
        modelValue: [String, Number]
    },

    methods: {

    }
}

</script>

<style scoped lang="scss">
$color-back: rgba(0, 0, 0, 0.4);
$color-back-blue: rgba(12, 22, 44, 0.7);
$color-text: #4e5f7d;
.search-users {
    width: 25%;
    height: 60px;
    align-items: center;
    justify-content: center;
    display: flex;
    background: rgba(6, 6, 6, 1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-bottom: 1px solid rgba(30, 30, 30, 0.6);
    position: fixed;
    z-index: 1;

    .clearInp {
        width: 10%;
        height: 40px;
        padding: 10px;
        border: none;
        background: rgba(7, 7, 7, 1);
        color: $color-text;
        font-size: 12px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;

        img {
            width: 14px;
            height: 14px;
        }

        &:hover {
            cursor: pointer;
        }
    }


    .inp-search {
        width: 90%;
        height: 40px;
        padding: 10px;
        border: none;
        background: rgba(7, 7, 7, 1);
        color: $color-text;
        outline: none;

        font-family: Lato,sans-serif;
        font-weight: bold;
        font-size: 12px;
        // text-transform: uppercase;
        letter-spacing: .02em;

    }
}
</style>