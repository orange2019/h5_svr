const crypto = require('crypto')

class CryptUtils {

  /**
   * md5加盐加密
   * @param {*} obj 
   * @param {*} key 
   */
  hmacMd5(obj, key) {
    let sortStr = this.objSortToStr(obj)

    let hash = crypto.createHmac('md5', key)
    hash.update(sortStr)
    let signStr = hash.digest('hex')

    return signStr.toUpperCase()
  }

  /**
   * 对象排序成字符串
   * @param {*} obj 
   */
  objSortToStr(obj) {
    let sdic = Object.keys(obj).sort()
    let strArr = []
    for (let k in sdic) {
      if (obj[sdic[k]]) {
        strArr.push(sdic[k] + '=' + obj[sdic[k]])
      }
    }
    return strArr.join('&')
  }

  /**
   * 公钥解签
   * @param {*} obj 
   * @param {*} sign 
   * @param {*} key 
   */
  verify(str , signature , publicKey) {
    var verify = crypto.createVerify('RSA-SHA256')
    verify.update(str)
    return verify.verify(publicKey, signature, 'hex')
  }

  /**
   * 私钥签名
   * @param {*} str 
   * @param {*} privateKey 
   */
  sign(str , privateKey){
    var sign = crypto.createSign('RSA-SHA256')
    sign.update(str)
    var signature = sign.sign(privateKey, 'hex')
    return signature
  }

}

module.exports = new CryptUtils