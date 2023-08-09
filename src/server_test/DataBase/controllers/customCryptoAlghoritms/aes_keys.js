const CryptoJS =  require('crypto-js')
const crypto = require('crypto')
const db = require('../../index')


function IGenKeys() {
    const privateKey = "000102030405060708090a0b0c0d0e0f"
    return { privateKey: privateKey}
}

function encrypte_(content, publickey) {
    content = CryptoJS.enc.Utf8.parse(content)
    publickey = CryptoJS.enc.Utf8.parse(publickey)

    var encrypted_content_ = CryptoJS.AES.encrypt(content, publickey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding })
    encrypted_content_ = encrypted_content_.ciphertext.toString(CryptoJS.enc.Hex);
    return {encrypted_content_: encrypted_content_, publickey: publickey}
}

function decrypte_(encrypt_content, key) {
    const decrypte = CryptoJS.AES.decrypt({ciphertext: CryptoJS.enc.Hex.parse(encrypt_content)}, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding })
    return decrypte.toString(CryptoJS.enc.Utf8)
}

function generatePaireRsaKeys() {
    const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 1024,
    })
    return {publicKey_rsa: publicKey, privateKey_rsa: privateKey}
}

function enecrypteKey(key, publicKey) {
    const encrypted_key = crypto.publicEncrypt(
        publicKey,
        Buffer.from(key)
    )
    return encrypted_key.toString("base64")
}

function decrypteKey(encryptedData, privateKey) {
    const decrypted_key = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase: '',
        },
        Buffer.from(encryptedData, "base64")
    )
    return decrypted_key.toString('utf-8')
}


const { privateKey } = IGenKeys()
const { publicKey_rsa, privateKey_rsa } = generatePaireRsaKeys()

const {encrypted_content_} = encrypte_('Hello', privateKey)
const privateEncryptedKey = enecrypteKey(privateKey, publicKey_rsa)
const privateDecryptKey = decrypteKey(privateEncryptedKey, privateKey_rsa)
console.log(privateDecryptKey)


const decrypte_cont = decrypte_(encrypted_content_, CryptoJS.enc.Utf8.parse(privateDecryptKey))
console.log(decrypte_cont)