import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/main";
import IError from "@/IError";

// const user_id = localStorage.getItem('user-id') ? localStorage.getItem('user-id') : false

const storageAPImage = {
    // storageAbsoluteRef: ref(storage),

    uploadBlobImageFile: async (file, user_id) => {
      if(!user_id) {
        IError('localStorage -> item = user-id === null')
        return
      }
      const storageRef = ref(storage, '/users-photos/users-photo-id - ' + user_id)
      await uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!')
          console.log(snapshot)
        }).catch( error => {
          IError(error)
        })
    },

    downloadBlobImageFile: async(user_id) => {
      let url_ = null
      const starsRef = ref(storage, '/users-photos/users-photo-id - ' + user_id);
      await getDownloadURL(starsRef)
        .then((url) => {
          url_ = url
        })
        .catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              IError(error.code)
              break;
            case 'storage/unauthorized':
              IError(error.code)
              break;
            case 'storage/canceled':
              IError(error.code)
              break;
            case 'storage/unknown':
              IError(error.code)
              break;
          }
        });
        return url_
    }
}

export {storageAPImage}