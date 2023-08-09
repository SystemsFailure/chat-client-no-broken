import Jimp from "jimp"

class CompressorImage {

    resizeImage(fileURL) {
        Jimp.read(fileURL).then(image => {
            let img = image.resize(300, 300)
            return img
        }).catch(err => {
            console.log(err)
        })
    }
}

export default CompressorImage