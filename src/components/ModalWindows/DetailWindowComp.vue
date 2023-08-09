<template>
    <div class="main-class-detail-window-comp">
        <div class="inner-container">
            <div class="inline-line">
                <!-- <span>Detail info</span>
                <span class="uuid-span" style="margin-left: 20px;">ID : UC39PXZKT8HABLOT7SLC</span>
                <span class="online-offline" style="margin-left: 20px;"><div class="cycle"></div> online</span> -->
                <div class="close-btn" @click="() => {this.$emit('closeDetailWindowFunction', false)}"><img src="@/assets/svgassets/icons8-удалить.svg" alt=""></div>
            </div>

            <div class="two-container">
                <!-- <div class="r0-w1-class">
                    <span class="date-register">date register - <span>1/16/2023, 1:45:22 AM</span></span>
                </div> -->
                <div class="photo-and-info">
                    <div class="photo-block">
                        <img src="@/assets/user_profile.png" alt="">
                    </div>
                    <div class="info-container">
                        <div class="r0-w1-class">
                            <i class="fi fi-bs-link"></i>
                            <span class="status">working</span>
                        </div>
                        <div class="r0-w1-class">
                            <i class="fi fi-bs-flag"></i>
                            <span class="country">United States</span>
                        </div>
                        <div class="r0-w1-class">
                            <i class="fi fi-bs-building"></i>
                            <span class="city">Chicago</span>
                        </div>
                    </div>
                </div>

                <div class="bio-info-box">
                    <div class="name-box"><span>Anna Leonhard</span></div>
                    <div class="proffession-box"><span>ML Developer</span></div>

                    <div class="r0-w1-class-bio">
                        <span class="bio">Logic can take you from point A to point B, and imagination can take you anywhere.</span>
                    </div>
                </div>

                <div class="useful-info">
                    <div class="followers-box-id">
                        <span style="color: rgb(0, 251, 255);">0</span>
                        <span class="followers-id">followers</span>
                    </div>
                    <div class="following-box-id">
                        <span style="color: rgb(0, 251, 255);">12</span>
                        <span class="following-id">following</span>
                    </div>
                    <div class="following-box-id">
                        <span style="color: rgb(0, 251, 255);">25</span>
                        <span class="following-id">contacts</span>
                    </div>
                    <div class="following-box-id">
                        <span style="color: rgb(0, 251, 255);">405</span>
                        <span class="following-id">musics</span>
                    </div>
                    <div class="following-box-id">
                        <span style="color: rgb(0, 251, 255);">53</span>
                        <span class="following-id">posts</span>
                    </div>
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
    
.main-class-detail-window-comp {
    position: absolute;
    width: 400px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    // border: 1px solid #333;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    color: white;

    .inner-container {
        width:100%;
        height: 100%;

        .two-container {
            padding: 10px;
            
            .useful-info {
                width: 100%;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: center;
                padding: 15px;

                .followers-box-id {
                    font-size: 12px;
                    text-transform: lowercase;
                    margin-right: 5px;
                    .followers-id {
                        margin-left: 5px;

                    }

                    &:hover {
                        cursor: pointer;
                        opacity: .6;
                        transition: .3s;
                    }
                }
                
                .following-box-id {
                    margin-left: 10px;
                    font-size: 12px;
                    text-transform: lowercase;
                    margin-right: 5px;
                    .following-id {
                        margin-left: 5px;

                    }

                    &:hover {
                        cursor: pointer;
                        opacity: .6;
                        transition: .3s;
                    }
                }
            }

            .bio-info-box {
                width: 100%;
                padding: 30px;
                display: flex;
                flex-direction: column;
                // align-items: center;
                justify-content: center;  

                .proffession-box {
                    font-size: 12px;
                }
                .r0-w1-class-bio {
                    word-wrap: break-word;
                    width: 100%;
                    margin-top: 10px;
                    // margin-left: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;            

                }

                .r0-w1-class-r {

                }
            }
            
            .photo-and-info {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
                img {
                    width: 180px;
                    height: 180px;
                }

                .info-container {
                    margin-left: 20px;
                    .r0-w1-class {
                        width: 100%;
                        margin-top: 5px;
                        display: block;
        
                        span {
                            margin-left: 8px;
                            font-family: Lato,sans-serif;
                            font-weight: 500;
                            font-size: 15px;
                        }
        
                        i {
                            margin-right: 5px;
                        }
                    }
                }

            }

        }

        .inline-line {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            border-bottom: 1px solid #333;
            padding: 6px;
            font-family: Lato,sans-serif;
            font-weight: 500;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: .02em;

            .online-offline {
                display: flex;
                align-items: center;
                .cycle {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: rgb(0, 234, 234);
                    margin-right: 5px;
                }
            }
            .close-btn {
                margin-left: auto;
                margin-right: 10px;
                margin-top: 4px;
                font-size: 11px;

                img {
                    width: 14px;
                    height: 14px;
                }
    
                &:hover {
                    cursor: pointer;
                    opacity: 0.8;
                    transition: .3s;
                }
            }
        }
    }
}
    
</style>