<template>
    <div>

        <div class="item-audio">
                    <div class="data-audio">
                        <div class="image-cont"><img src="@/assets/user_profile.png" alt="" srcset=""></div>
                        <div class="wrapper-cont-nm">
                            <div class="name-audio">Lyrics more</div>
                            <div class="wrapper-cont-com">
                                <div class="avtor-name">Thumbs</div>
                                -
                                <div class="playlist-name">More Ultimate</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="progress-audio"><input type="range" id="volume-slider" max="100" value="0"></div>

                    <div class="controller-cont">

                        <div class="play-btn"><button><i class="fi fi-ss-play"></i></button></div>
                        <div class="volume-btn"><button><i class="fi fi-ss-volume"></i></button></div>
                        <div class="value-time-container">
                            <div class="current-time">00:54</div>
                            /
                            <div class="total-time">03:46</div>
                        </div>

                        <div class="tools-audio">
                            <div class="speed-btn"><button>1x</button></div>
                            <div class="settings-btn"><button><i class="fi fi-ss-settings"></i></button></div>
                        </div>

                    </div>
        </div>

    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    .item-audio {
                width: 100%;
                height: auto;
                padding: 8px;
                color: #fff;
                background-color:rgba($color: #000000, $alpha: 1.0);
                margin-top: 10px;
                border-radius: 7px;

                .data-audio {
                    display: flex;
                    align-items: center;

                    .wrapper-cont-nm {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-left: 10px;

                        .wrapper-cont-com {
                            display:flex;
                            align-items: center;
                            .avtor-name {
                                margin-right: 10px;
                            }

                            .playlist-name {
                                margin-left: 10px;
                            }
                        }
                        .name-audio {
                            font-weight: bold;
                            font-size: 16px;
    
                        }
                    }
                    
                    .image-cont {
                        padding: 5px;
                        height: 100%;
                        width: auto;
    
                        img {
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                        }
                    }
                }


                .controller-cont {
                    width: 100%;
                    height: 50px;
                    background-color:rgba($color: #000000, $alpha: 1.0);
                    display: flex;
                    align-items: center;
                    // justify-content: center;

                    .tools-audio {
                        margin-left: auto;
                        display: flex;
                        align-items: center;
                        .speed-btn {
                            margin-right: 10px;

                            button {
                                background-color: #ffffff;
                                border: 1px solid #333;
                                padding: 2px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 30px;
                                height: 30px;
                            }
                        }

                        .settings-btn {

                            button {
                                background-color: #ffffff;
                                border: 1px solid #333;
                                padding: 2px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 30px;
                                height: 30px;

                                i {
                                    margin-top: 4px;
                                }
                            }
                        }
                    }

                    .play-btn {
                        
                        button {
                            background-color: #ffffff;
                            border: 1px solid #333;
                            padding: 2px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 30px;
                            height: 30px;

                            i {
                                margin-top: 4px;
                            }

                        }
                    }

                    .volume-btn {
                        margin-left: 5px;
                        
                        button {
                            background-color: #ffffff;
                            border: 1px solid #333;
                            padding: 2px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 30px;
                            height: 30px;
    
                            i {
                                margin-top: 4px;
                            }
    
                        }
                    }

                    .value-time-container {
                        display: flex;
                        align-items: center;
                        text-transform: uppercase;
                        font-size: 14px;
                        font-weight: 700;
                        margin-left: 20px;
                        .current-time {

                        }

                        .total-time {

                        }

                    }

                }

                .progress-audio {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // padding: 5px;

                    input[type="range"] {
                        -webkit-appearance: none;
                        appearance: none;
                        background: transparent;
                        cursor: pointer;
                        width: 100%;

                    }

                    input[type="range"]::-webkit-slider-runnable-track {
                        background: #000000;
                        height: 3.5px;
                    }

                    input[type="range"]::-moz-range-track {
                        background: #000000;
                        height: 3.5px;
                    }

                    input[type="range"]::-webkit-slider-thumb {
                        // margin-top = (высота дорожки / 2) - (высота ползунка / 2)
                        -webkit-appearance: none; /* Override default look */
                        appearance: none;
                        margin-top: -3.5px; /* Centers thumb on the track */
                        background-color: #111;
                        height: 10px;
                        width: 10px;    
                        border-radius: 50%;
                    }

                    input[type="range"]::-moz-range-thumb {
                        border: none; /*Removes extra border that FF applies*/
                        border-radius: 0; /*Removes default border-radius that FF applies*/
                        background-color: #111;
                        height: 2rem;
                        width: 1rem;
                    }

                    input[type="range"]:focus {
                        outline: none;
                    }

                    /***** Chrome, Safari, Opera, and Edge Chromium *****/
                    input[type="range"]:focus::-webkit-slider-thumb {
                        border: 1px solid #053a5f;
                        outline: 3px solid #053a5f;
                        .item-audio {
                            width: 100%;
                            height: auto;
                            padding: 8px;
                            color: black;
                            background-color:#ffffff;
                            margin-top: 10px;
                            border-radius: 7px;

                .data-audio {
                    display: flex;
                    align-items: center;

                    .wrapper-cont-nm {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-left: 10px;

                        .wrapper-cont-com {
                            display:flex;
                            align-items: center;
                            .avtor-name {
                                margin-right: 10px;
                            }

                            .playlist-name {
                                margin-left: 10px;
                            }
                        }
                        .name-audio {
                            font-weight: bold;
                            font-size: 16px;
    
                        }
                    }
                    
                    .image-cont {
                        padding: 5px;
                        height: 100%;
                        width: auto;
    
                        img {
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                        }
                    }
                }


                .controller-cont {
                    width: 100%;
                    height: 50px;
                    background-color: #ffffff;
                    display: flex;
                    align-items: center;
                    // justify-content: center;

                    .tools-audio {
                        margin-left: auto;
                        display: flex;
                        align-items: center;
                        .speed-btn {
                            margin-right: 10px;

                            button {
                                background-color: #ffffff;
                                border: 1px solid #333;
                                padding: 2px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 30px;
                                height: 30px;
                            }
                        }

                        .settings-btn {

                            button {
                                background-color: #ffffff;
                                border: 1px solid #333;
                                padding: 2px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 30px;
                                height: 30px;

                                i {
                                    margin-top: 4px;
                                }
                            }
                        }
                    }

                    .play-btn {
                        
                        button {
                            background-color: #ffffff;
                            border: 1px solid #333;
                            padding: 2px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 30px;
                            height: 30px;

                            i {
                                margin-top: 4px;
                            }

                        }
                    }

                    .volume-btn {
                        margin-left: 5px;
                        
                        button {
                            background-color: #ffffff;
                            border: 1px solid #333;
                            padding: 2px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 30px;
                            height: 30px;
    
                            i {
                                margin-top: 4px;
                            }
    
                        }
                    }

                    .value-time-container {
                        display: flex;
                        align-items: center;
                        text-transform: uppercase;
                        font-size: 14px;
                        font-weight: 700;
                        margin-left: 20px;
                        .current-time {

                        }

                        .total-time {

                        }

                    }

                }

                .progress-audio {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // padding: 5px;

                    input[type="range"] {
                        -webkit-appearance: none;
                        appearance: none;
                        background: transparent;
                        cursor: pointer;
                        width: 100%;

                    }

                    input[type="range"]::-webkit-slider-runnable-track {
                        background: #000000;
                        height: 3.5px;
                    }

                    input[type="range"]::-moz-range-track {
                        background: #000000;
                        height: 3.5px;
                    }

                    input[type="range"]::-webkit-slider-thumb {
                        // margin-top = (высота дорожки / 2) - (высота ползунка / 2)
                        -webkit-appearance: none; /* Override default look */
                        appearance: none;
                        margin-top: -3.5px; /* Centers thumb on the track */
                        background-color: #111;
                        height: 10px;
                        width: 10px;    
                        border-radius: 50%;
                    }

                    input[type="range"]::-moz-range-thumb {
                        border: none; /*Removes extra border that FF applies*/
                        border-radius: 0; /*Removes default border-radius that FF applies*/
                        background-color: #111;
                        height: 2rem;
                        width: 1rem;
                    }

                    input[type="range"]:focus {
                        outline: none;
                    }

                    /***** Chrome, Safari, Opera, and Edge Chromium *****/
                    input[type="range"]:focus::-webkit-slider-thumb {
                        border: 1px solid #053a5f;
                        outline: 3px solid #053a5f;
                        outline-offset: 0.125rem;
                    }

                    /******** Firefox ********/
                    input[type="range"]:focus::-moz-range-thumb {
                        border: 1px solid #053a5f;
                        outline: 3px solid #053a5f;
                        outline-offset: 0.125rem;     
                    }
                }



            }outline-offset: 0.125rem;
                    }

                    /******** Firefox ********/
                    input[type="range"]:focus::-moz-range-thumb {
                        border: 1px solid #053a5f;
                        outline: 3px solid #053a5f;
                        outline-offset: 0.125rem;     
                    }
                }



            }
</style>