import {ref} from "vue";
import axios from "axios";

export  default function sendDataToServer() {
    const data_ = ref([])
    const result_write = ref(false)
    const sendData = async (url, data) => {
        await axios.post(url + 'users/register/addUser', {
            data: data
        }).then(response => {
            if (!response.data) {
                result_write.value = false
                console.log('Response without data')
            }
            if(response.data.result === true) {
                try {
                    const user_data = {
                        name: response.data.name,
                        email: response.data.email
                    }
                    data_.value.push(user_data)
                    result_write.value = true
                } catch (e) {
                    console.log(e + 'this exception from function by sendDataToServer()')
                }
            } else {
                console.log(response.data.message)
                result_write.value = false
            }
        }).catch(error => {
            console.log(error)
        })
    }
    return {
        data_,
        result_write,
        sendData
    }
}