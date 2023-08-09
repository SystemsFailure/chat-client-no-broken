<template>
    <div class="input-range-class">
        <input type="range" name="" id="">
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

.input-range-class {


    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;
        width: 100%;
        z-index: 11;
    }

    input[type="range"]::-webkit-slider-runnable-track {
        background: rgba($color: #212121, $alpha: .8);
        height: 3px;

    }

    input[type="range"]::-moz-range-track {
        background: #000000;
        height: 3px;
    }

    input[type="range"]::-webkit-slider-thumb {
        // margin-top = (высота дорожки / 2) - (высота ползунка / 2)
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        margin-top: -3px; /* Centers thumb on the track */
        background-color: #111;
        height: 9px;
        width: 9px;    
        border-radius: 50%;


        &:hover {
            background-color: teal;
        }

    }

    input[type="range"]::-moz-range-thumb {
        border: none; /*Removes extra border that FF applies*/
        border-radius: 0; /*Removes default border-radius that FF applies*/
        background-color: #111;
        height: 2rem;
        width: 1rem;
    }  
}

</style>