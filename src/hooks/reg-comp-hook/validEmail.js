import {ref} from "vue";
import axios from "axios";

export default function validEmail(){
    const queryEmail = ref('')
    let result_email_checking = ref(true)
    const checkEmail = async (email, url) => {
        await axios.post(url + 'users/register/validData/checkEmail', {
            email: email
        }).then(res => {
            if (!res.data) console.log('data sand from server is empty')
            try {
                if(res.data.result === true){
                    console.log(res.data.result + 'user is exist')
                    result_email_checking.value = true
                } else {
                    console.log('result successful! this your email is valid! ' + res.data.result)
                    result_email_checking.value = false
                }
            } catch (e) {
                console.log(e)
            }
        }).catch(err => {
            console.log('error: to checkEmail of function \n error: ' + err)
        })
    }

    return {
        queryEmail, checkEmail, result_email_checking
    }
}