<template>
    
    <div class="main-class-mini-list-favorite-user" id="btn-pop-up-down">
        <div class="btn-expand-to-express-mini-menu" id="btn-expand-to-express-id-element">

            <div v-if="reverse_btn" class="nav-btn-expand" @click="ExpandLeftMiniMenu($event)"><i class="fi fi-bs-angle-double-left"></i></div>
            <div v-else class="nav-btn-expand" @click="ExpressRightMiniMenu_($event)"><i class="fi fi-bs-angle-double-right"></i></div>

            <div v-if="!reverse_btn_" class="nav-btn-express" @click="ExpressDownMiniMenu($event)"><i class="fi fi-bs-angle-small-down"></i></div>
            <div v-else class="nav-btn-express" @click="ExpandUpMiniMenu_($event)"><i class="fi fi-bs-angle-small-up"></i></div>
            
        </div>
        <div class="inner-container-of-contant" v-for="element in lst" :key="element.id" @click="showMiniChatWindow(element)">
            <img :src="element.img_url" alt="" srcset="">
            <div class="title-box-text" style="display: none; color: white; margin-left: 10px;">
                <div class="title-text">{{ element.name }}</div>
            </div>
        </div>
    </div>
    
</template>
<script>
import { UserApi } from '@/api/UserController'
export default {
    data() {
        return {
            USERID: localStorage.getItem('user-id'),
            reverse_btn: true,
            reverse_btn_: true,
            lst: []
        }
    },

    watch: {
        lst: {
            handler(newValue) {
                let zero = 0
                if([newValue].length != zero) {
                    setTimeout(() => {
                        let listItems = document.getElementsByClassName('inner-container-of-contant')
                        for (let index = 1; index < listItems.length; index++) {
                            let element = listItems[index]
                            // console.log('PR - 01 - ', element, element.style.display)
                            element.style.padding = '5px'
                            element.style.display = 'none'
                            // console.log('PR - 02 - ', element, element.style.display)
                        }
                    }, zero);
                }
            },
            deep: true
        }
    },

    mounted() {
        UserApi.getAllChats(this.USERID).then(data => {
            this.lst = data
            document.getElementsByClassName('btn-expand-to-express-mini-menu')[0].style.height = '40px'
            let mainElement = document.getElementById('btn-pop-up-down')
            mainElement.style.height = '50px'
            mainElement.style.padding = '0px'
            mainElement.style.borderTopRightRadius = '0'
            mainElement.style.borderTopLeftRadius = '0'
        }).catch(err => {
            console.log(err)
        })
    },

    methods: {
        showMiniChatWindow(user) {
            this.$emit('MiniChatBindMiniUsersListFunction', user, true)
        },


        ExpandLeftMiniMenu() {
            let container = document.getElementById('btn-pop-up-down')
            container.style.width = '200px'
            container.style.borderTopLeftRadius = '0'         
            container.style.borderBottomLeftRadius = '0'
            // container.style.padding = '20px'

            document.getElementById('btn-expand-to-express-id-element').style.right = '0'

            this.reverse_btn = !this.reverse_btn
            let listItems = document.getElementsByClassName('inner-container-of-contant')
            for (let index = 0; index < listItems.length; index++) {
                const element = listItems[index]
                element.style.width = '100%'
                element.style.height = '100%'
                element.style.padding = '8px'
                element.style.paddingLeft = '5px'
                element.style.borderRadius = '0'
                element.style.justifyContent = 'flex-start'
                element.style.marginTop = '0'
            }

            let list_title = document.getElementsByClassName('title-box-text')
            for (let index = 0; index < list_title.length; index++) {
                const element = list_title[index]
                element.style.display = 'flex'
            }
        },

        ExpandUpMiniMenu_() {
            if(this.lst.length <= 1 ) {
                return
            } else {
                let mainElement = document.getElementById('btn-pop-up-down')
                mainElement.style.height = 'auto'
                mainElement.style.padding = '0px'
                mainElement.style.borderTopRightRadius = '0'
                mainElement.style.borderTopLeftRadius = '0'   
                this.reverse_btn_ = !this.reverse_btn_
    
                let listItems = document.getElementsByClassName('inner-container-of-contant')
                for (let index = 1; index < listItems.length; index++) {
                    const element = listItems[index]
                    element.style.display = 'flex'
                    element.style.width = '100%'
                    element.style.justifyContent = 'none'
                }
            }
        },

        ExpressDownMiniMenu() {
            document.getElementsByClassName('btn-expand-to-express-mini-menu')[0].style.height = '40px'
            let mainElement = document.getElementById('btn-pop-up-down')

            mainElement.style.height = '50px'
            mainElement.style.padding = '0px'
            mainElement.style.borderTopRightRadius = '0'
            mainElement.style.borderTopLeftRadius = '0'

            
            let listItems = document.getElementsByClassName('inner-container-of-contant')

            for (let index = 1; index < listItems.length; index++) {
                const element = listItems[index]
                element.style.display = 'none'
                // element.style.marginTop = 'none'
            }
            this.reverse_btn_ = !this.reverse_btn_
        },
        ExpressRightMiniMenu_() {
            let container = document.getElementById('btn-pop-up-down')
            container.style.width = '50px'
            container.style.borderBottomLeftRadius = '24px'
            container.style.borderBottomRightRadius = '24px'
            this.reverse_btn = !this.reverse_btn

            let listItems = document.getElementsByClassName('inner-container-of-contant')
            for (let index = 0; index < listItems.length; index++) {
                const element = listItems[index]
                element.style.padding = '5px'
                element.style.borderRadius = '50%'
                element.style.justifyContent = 'center'
                element.style.marginTop = '5px'

            }
            let list_title = document.getElementsByClassName('title-box-text')
            for (let index = 0; index < list_title.length; index++) {
                const element = list_title[index]
                element.style.display = 'none'

            }

        }
    },
    
}
</script>
<style lang="scss" scoped>

.fade--mimi-menu-up-enter-active, .fade--mimi-menu-up-leave-active {
  transition: opacity .3s;
}
.fade--mimi-menu-up-enter, .fade--mimi-menu-up-leave-to {
  opacity: 0;
}


.main-class-mini-list-favorite-user {
    width: 50px;
    height: 50px;
    position: absolute;   
    right: 0;
    bottom: 0;
    margin-right: 20px;
    margin-bottom: 60px; 
    background-color: rgba($color: #0e0d0d, $alpha: .3);
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    border-bottom-right-radius: 24px;
    border-bottom-left-radius: 24px;
    padding: 20px;
    z-index: 11;
    opacity: 0;
    &:hover {
        opacity: 1;
        transition: .4s;
    }

    .btn-expand-to-express-mini-menu {
        width: 50px;
        height: 40px;
        background-color: rgba($color: #000000, $alpha: 1);
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        transform: translateY(-40px);


        .nav-btn-expand {
            width: 100%;
            height: 50%;
            color: wheat;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;

        }

        .nav-btn-express {
            width: 100%;
            height: 50%;
            color: wheat;
            border-top: 1px solid #333;
            display: flex;
            justify-content: center;
            align-items: center;

        }


    }


}

.inner-container-of-contant {
    border-radius: 50%;
    background: none;
    margin-top: 5px;

    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;

    &:hover {
        border: 1px solid rgb(0, 255, 225);
    }

    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
}
</style>