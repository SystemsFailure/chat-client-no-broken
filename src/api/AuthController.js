import { auth } from '@/main.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import IError from '@/IError';


const AuthApi =  {
    singup : (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then( userCredential => {
                // Signed in 
                const user = userCredential.user;
                // const user = _.user;
                // localStorage.setItem('user-email', user.email)
                // localStorage.setItem('user-uid', user.uid)
                return user
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                IError(error)
                IError(errorCode)
                IError(errorMessage)
                return null
            });
    },

    signin : async (email, password, user_) => {

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // localStorage.setItem('user-id', user_.id)
                // localStorage.setItem('user-name', user_.data().name)
                console.log(user_)
                const user = userCredential.user;
                return user
            })
            .catch((error) => {
                IError(error)
                IError(error.code)
                IError(error.message)
                return null
            });
    },

    signout : () => {
        signOut(auth).then(() => {
            console.log('user is signout!')
            localStorage.clear()
          }).catch((error) => {
            IError(error)
          });
    }
}


export default AuthApi