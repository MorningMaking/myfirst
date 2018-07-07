import ImageCompressor from 'image-compressor.js'


export const idiotCrop = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (theFile) {
      let img = new Image();
      img.src = theFile.target.result;
      if (!theFile.target.result) {
        reject('fail')
      }
      img.onload = function () {
        let canvas = document.createElement("canvas")
        canvas.width = 1125
        canvas.height = 1102
        let ctx = canvas.getContext("2d")
        let w = this.width

        let h = this.height
        let rw = 1125
        let rh = 1102

        let dw = rw / w //canvas与图片的宽高比
        let dh = rh / h
        // 裁剪图片中间部分
        if (w > rw && h > rh || w < rw && h < rh) {
          if (dw > dh) {
            ctx.drawImage(img, 0, (h - rh / dw) / 2, w, rh / dw, 0, 0, rw, rh)
          } else {
            ctx.drawImage(img, (w - rw / dh) / 2, 0, rw / dh, h, 0, 0, rw, rh)
          }
        } else {
          // 拉伸图片
          if (w < rw) {
            ctx.drawImage(img, 0, (h - rh / dw) / 2, w, rh / dw, 0, 0, rw, rh)
          } else {
            ctx.drawImage(img, (w - rw / dh) / 2, 0, rw / dh, h, 0, 0, rw, rh)
          }
        }
        resolve(dataURLToBlob(canvas.toDataURL('image/png')))
      }
    }
  })

}


const calculationImageWH = (w, h) => {
  let MAX_HEIGHT = 750
  // if (h > MAX_HEIGHT && h >= w) {
  //   // 宽度等比例缩放 *=
  //   w *= MAX_HEIGHT / h;
  //   h = MAX_HEIGHT;
  // }

  if (w > MAX_HEIGHT && w > h) {
    // 宽度等比例缩放 *=
    h *= MAX_HEIGHT / w;
    w = MAX_HEIGHT;
  }

  return {w, h}
}

const compress = (file, maxWidth, maxHeight, resolve, reject) => {
  new ImageCompressor(file, {
    quality: .4,
    maxHeight,
    maxWidth,
    success(result) {
      resolve(result)
    },
    error(e) {
      reject(e)

    },
  });
}

export const loacalCompress = (file) => {
  return new Promise((resolve, reject) => {
    let ready = new FileReader()
    ready.onload = (e) => {
      let re = e.target.result
      let img = new Image()
      img.src = re
      let width = img.width;
      let height = img.height;
      let size = calculationImageWH(width, height)

      compress(file, size.w, size.h, result => {
        resolve(result)
      }, error => {
        reject(error)
      })

    }
    ready.readAsDataURL(file);
  })

}

// DataURL转Blob对象
function dataURLToBlob(dataurl) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = window.atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

//获取CDN图片地址
export const ObtainImageUrl = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = "blob"
    xhr.onload = function () {
      if (this.status == 200) {
        let blob = this.response
        resolve(window.URL.createObjectURL(blob))
      }
    }
    xhr.send()
  })
}
