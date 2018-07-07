export class SynthesisShare {
  constructor(w, h) {
    let canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
  }

  synthesisImage(elements) {
    this.clear()
    console.log(elements);
    if (Array.isArray(elements)) {
      for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        this.drawElement(e)
      }
    } else {
      this.drawElement(elements)
    }
    return this.canvas.toDataURL('image/png')
  }

  drawElement(e) {

    this.ctx.drawImage(e.image, e.x, e.y, e.w, e.h)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export class SynthesisElement {
  constructor() {
    this.url = ''
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0
    this.image = null
  }

  async init(url, x, y, w, h) {
    console.log('init===>',url);
    this.url = url
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.image = await this.loadImage(url)
  }

  loadImage(url) {
    console.log(url);
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute('crossOrigin', '*');
      if (!url) {
        reject('err')
      }
      img.src = url
      img.onload = () => {
        resolve(img)
      }
    })
  }
}



