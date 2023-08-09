<template>
    <div class="main-class-dialog-create-music">
        <div class="inner-co">
            <div class="title">
                <span>create music</span>
                <div class="close" @click="() => {this.$emit('closeCreateMusicWinodwFunction', false)}"><i class="fi fi-bs-cross"></i></div>
            </div>
            
            <input type="text" placeholder="name music" v-model="name">
            <input type="text" placeholder="name artist" v-model="artist">
            <div class="check-box-container">
                <input type="checkbox" name="" id="check-id-box-id" v-model="selected">
                <span>names are default?</span>
            </div>

            <span class="line-box-file" id="file-text-id-2">{{ file_ ? file_.name : 'file not choice'}}</span>
            <label for="myfile_phAvatar_" class="label_">Upload file</label>
            <input type="file" class="my_" id="myfile_phAvatar_" name="myfile_phAvatar_" accept="audio/mpeg, audio/mp3" multiple @change="uploadFile">

            <span class="line-box-file" id="file-image-text">{{ file_img ? file_img : undefined}}</span>
            <label for="file_image_for_song" style="margin-top: 10px;" class="label_">Upload image for song</label>
            <input type="file" class="my_" id="file_image_for_song" name="file_image_for_song" accept="image/jpeg, image/png" multiple @change="uploadFileImage">
            <!-- <div class="check-box-container">
                <input type="checkbox" name="" id="check-id-box-id" v-model="selected">
                <span>not use image</span>
            </div> -->

            <button class="btn-send" @click="sendFile" style="color: white;"><span>upload</span></button>

            <div class="loader" v-if="loader">
                <div class="lds-facebook"><div></div><div></div><div></div></div>
            </div>
        </div>

    </div>
</template>
<script>
import {MusicApi} from '@/api/MusicController'
import { validName } from '@/validators'
export default {
    data() {
        return {
            loader: false,
            name: '',
            artist: '',
            selected: '',
            file_: null,
            file_img: null,
            userId: localStorage.getItem('user-id')
        }
    },

    mounted() {

    },

    methods: {
        uploadFileImage(event) {
            const file = event.target.files[0]
            if(event.target.file[0]) {
                this.file_img = event.target.file[0]
            }
            if(file.type.split('/')[0] != 'image') {
                console.log('so type data not support')
                this.file_img = 'so type data not support'
                return
            }
            if(this.file_img)
            {
                document.getElementById('file-image-text').style.color = '#00ffe1'
                console.log('image file been upload successful')
            }
        },

        uploadFile(event) {
            let file = event.target.files[0]
            if(!file) {
                if(file.type.split('/')[0] != 'audio') {
                    console.log('error')
                    this.file_ = 'so type data not support'
                    return
                }
                console.log('file is null')
                return
            }
            if (this.selected === false)
            {
                if(validName(this.name, typeof file) && validName(this.artist, typeof file))
                {
                    console.log(file)
                    this.file_ = file
                }
            } else {
                this.name = file.name
                this.artist = 'unknown'
                document.getElementById('file-text-id-2').style.color = '#00ffe1'
                if(validName(this.name, typeof file) && validName(this.artist, typeof file))
                {
                    console.log(file)
                    this.file_ = file
                }
            }
        },

        async sendFile() {
            if(this.file_)
            {
                const data = {
                    userId: this.userId,
                    file: this.file_,
                    name: this.name,
                }
                let btn = document.getElementsByClassName('btn-send')[0]
                btn.setAttribute('disabled', true)
                this.loader = true
                await MusicApi.sendFile(data).then(url => {
                    console.log(url.file_url)
                    MusicApi.sendFileDocument({
                        userId: this.userId,
                        size: this.file_.size,
                        type: this.file_.type,
                        url: url.file_url,
                        name: this.name,
                        artist: this.artist,
                        playlistId: null,
                    }).then(() => {
                        this.loader = false
                        btn.setAttribute('disabled', false)
                        console.log('document been writed')
                    })
                })
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.main-class-dialog-create-music {
    position: absolute;
    width: 300px;
    height: 450px;
    padding: 15px;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #000000, $alpha: .8);
    border: 1px solid #333;
    z-index: 15;
    color: white;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;

    .inner-co {
        width: 100%;
        height: 100%;
        position:relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;


        .line-box-file {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
            color:red;
            font-size: 13px;
            text-transform: lowercase;
            
        }

        .loader {
            // position: relative;
            // bottom: 0;
            // width: 100%;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            .lds-facebook div {
                display: inline-block;
                position: absolute;
                left: 8px;
                width: 16px;
                background: #00ffe1;
                box-shadow:0 0 25px #00fff7;
                animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
            }
            .lds-facebook div:nth-child(1) {
                left: 8px;
                animation-delay: -0.24s;
            }
            .lds-facebook div:nth-child(2) {
                left: 32px;
                animation-delay: -0.12s;
            }
            .lds-facebook div:nth-child(3) {
                left: 56px;
                animation-delay: 0;
            }
            @keyframes lds-facebook {
                0% {
                top: 8px;
                height: 64px;
                }
                50%, 100% {
                top: 24px;
                height: 32px;
                }
            }
        }


        .btn-send {
            width: 50%;
            background-color: rgba($color: #000000, $alpha: .8);
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            border: 1px solid #333;
            margin-top: 50px;


            &:hover {
                cursor: pointer;
                background: #00cec780;
            }

        }


        .check-box-container {
            width: 100%;
            display: flex;
            margin-top: 25px;

            #check-id-box-id {
                padding: 4px;
                color: white;
                background: none;
                float: left;
            }

            span {
                margin-left: 10px;
            }
        }

        input[type='text'] {
            margin-top: 15px;
            padding: 10px;
            background-color: rgba($color: #000000, $alpha: .8);            
            outline: none;
            border: none;
            border: 1px solid #333;
            color: white;
            // margin-top: 15px;
            width: 100%;
    
        }
    
        .title {
            position: absolute;
            top: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .close {
                margin-left: auto;
                margin-right: 5px;
                color: white;
                font-size: 11px;

                &:hover {
                    cursor: pointer;
                    opacity: .6;
                }
            }
        }

        .my_ {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        .label_ {
            // margin-top: 20px;
            width: 100%;
            height: 30px;
            background-color: none;
            border: 1px solid #333;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 4px;
            font-family: Lato,sans-serif;
            font-weight: 700;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: .02em;
            color: white;
        }

        .label_:hover {
            color: white;
            background: #00cec780;
        }
    }
}
</style>