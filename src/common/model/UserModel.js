import {userInfo} from "@/common/api/user";

class UserModel {
  constructor() {
    this.token = ''
    this.nickname = ""
    this.headImage = ""
    this.sex = 0
    this.country = ""
    this.province = ""
    this.city = ""
    this.appId=""
    this.channelCode=""
  }

  init(token) {
    if (token) {
      window.localStorage.setItem('userToken', token)
    } else {
      token = window.localStorage.getItem('userToken')
      if (!token) {
        window.location.href = 'http://dis.ccnfgame.com/knifemanagerapi/v1/public/wx/entry'
        return
      }
    }
    this.setToken(token)


    userInfo().then(res => {
      this.nickname = res.data.nickname
      this.headImage = res.data.headImage
      this.sex = res.data.sex
      this.country = res.data.country
      this.province = res.data.province
      this.city = res.data.city,
      this.appId=res.data.appId,
      this.channelCode=res.data.channelCode
    })
  }

  setToken(token) {
    this.token = token
  }

  getToken() {
    this.token = window.localStorage.getItem('userToken')
    return this.token
  }
}

const FOO_KEY = Symbol.for('UserModel');

if (!window[FOO_KEY]) {
  window[FOO_KEY] = new UserModel();
}

export default window[FOO_KEY]
