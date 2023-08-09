<template>
    <div class="dashboard-navbar-main">
        <div class="inner-content">

            <div class="element-class"><i class="fi fi-ss-mode-portrait"></i></div>
            <div class="element-class"><i class="fi fi-ss-users"></i></div>
            <div class="element-class">
                <div class="wrapper-element">
                    <div class="notify-cycle"></div>
                    <i class="fi fi-sr-envelope"></i>
                </div>
            </div>
            <div class="element-class"><i class="fi fi-bs-stats"></i></div>
            <div class="element-class"><i class="fi fi-ss-settings-sliders"></i></div>

        </div>
    </div>

    <!-- <i class="fi fi-ss-mode-portrait"></i> -->
    <!-- <i class="fi fi-ss-share"></i> -->

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

.dashboard-navbar-main {
    position: fixed;
    left: 0;
    width: 50px;
    height: 100%;
    // padding: 5px;
    border-right: 1px solid #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#2e2f38;

    .inner-content {
        width: 100%;
        height: 100%;
        padding-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .element-class {
            margin-top: 20px;
            color: white;
            width: 100%;
            height: 30px;
            padding-top: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 18px;


            
            .wrapper-element {
                width: auto;
                height: auto;

                .notify-cycle {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: aqua;
                    transform: translateX(15px) translateY(-1px);
                }
            }

            &:hover {
                cursor: pointer;
                background-color: teal;
            }
        }
    }
}

</style>