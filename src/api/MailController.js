import { sendEmailVerification } from "firebase/auth"
import { auth } from "@/main"
import IError from "@/IError";

export const sendEmailMessageAccess = () => {
    const user = auth.currentUser;
    if(user != null) {
        sendEmailVerification(auth.currentUser).then(() => {
                console.log('email was to sended!')
        });
    } else {
        IError('user is not auth!')
    }
}

export const sendEmailMessageAccessAndRedirectToBack = () => {

}