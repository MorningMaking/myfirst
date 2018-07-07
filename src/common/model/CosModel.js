import {cosConfig} from "@/common/api/cos";
import {cdnConfig} from "@/common/config";
import {idiotCrop} from "@/common/library/imageUtil.js"
import COS from 'cos-js-sdk-v5'

class CosModel {
  constructor() {
    this.cos = ''
    this.init()
  }

  init() {
    this.cos = this.getNewCos()
  }


  async uploadFile(file) {
    //处理图片
    let imageBlob = await idiotCrop(file)
   // console.log(imageBlob);
    
    return new Promise((resolve, reject) => {
      this.cos.sliceUploadFile({
        Bucket: cdnConfig.Bucket,
        Region: cdnConfig.Region,
        Key: `gamecenter/images/thumbnail-${name}-${new Date().getTime()}-${Math.ceil(Math.random() * 100000)}${file.name}`,
        Body: imageBlob,
      }, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location)
        }
      })
    })
  }

  getNewCos() {
    return new COS({
      getAuthorization: function (options, callback) {
        cosConfig().then((res) => {
          const tempKeys = res.data.tempKeys
          let Authorization = {
            TmpSecretId: tempKeys.credentials && tempKeys.credentials.tmpSecretId,
            TmpSecretKey: tempKeys.credentials && tempKeys.credentials.tmpSecretKey,
            XCosSecurityToken: tempKeys.credentials && tempKeys.credentials.sessionToken,
            ExpiredTime: tempKeys.expiredTime,
          }
          callback(Authorization)
        })
      }
    })
  }

}

const FOO_KEY = Symbol.for('CosModel');

if (!window[FOO_KEY]) {
  window[FOO_KEY] = new CosModel();
}

export default window[FOO_KEY]
