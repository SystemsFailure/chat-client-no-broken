<template>
    <div class="up-navbar-comp-main">
        <div class="inner-content">

            <div class="title-nav-up-bar"><span>Dashboard</span></div>

            <div class="functional-continer">
                <div class="img-admin">
                    <img src="@/assets/user_profile.png" alt="" srcset="">
                </div>

                <div class="notificcations-container">
                    <div class="notify-cycle-bomb"></div>
                    <i class="fi fi-bs-bell"></i>
                </div>
            </div>

        </div>
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

.up-navbar-comp-main {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    // padding: 5px;
    border-bottom: 1px solid #333;
    background-color: #2e2f38;

    .inner-content {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .title-nav-up-bar {
            color: white;
            font-family: Lato,sans-serif;
            font-weight: 700;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: .02em;
            margin-left: 10px;
            cursor: default;
        }

        .functional-continer {
            width: 400px;
            height: 50px;
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;

            .notificcations-container {
                position: absolute;
                right: 16%;
                color: white;
                font-size: 20px;
                width: auto;
                height: 50px;
                display: flex;
                align-items: center;
                padding: 5px;

                .notify-cycle-bomb {
                    position: absolute;
                    transform: translateX(10px) translateY(-7px);
                    width: 8px;
                    height: 8px;
                    background-color: aqua;
                    border-radius: 50%;
                }
                
                i {
                    margin-top: 4px;
                }
            }

            .img-admin {
                position: absolute;
                right: 0;
                margin-right: 10px;
                height: 50px;
                display: flex;
                align-items: center;
                padding: 5px;

                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
            }
        }

    }
}

</style>