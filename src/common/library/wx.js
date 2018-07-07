const checkJsApi = () => {

  return new Promise((resolve, reject) => {
    window.wx.checkJsApi({
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        for (let key in res.checkResult) {
          if (!res.checkResult[key]) {
            reject("当前客服端不支持微信分享")
          }
        }
        console.log('checkJsApiOK');
        resolve('ok')
      },
      fail: function (res) {
        console.log('checkJsApifail');
        reject(res)
      }
    })
  })
}

/* 微信分享 */
export default function wxShare(wxConfig, shareData, success, error) {
  // console.log('wxConfig===>',wxConfig)
  return new Promise((resolve, reject) => {
    checkJsApi().then(res => {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxConfig.AppId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: wxConfig.Timestamp, // 必填，生成签名的时间戳
        nonceStr: wxConfig.NonceStr, // 必填，生成签名的随机串
        signature: wxConfig.Signature,// 必填，签名，见附录1
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      /*
   * 应用详情页
   * 应用名称，应用描述，应用icon,应用链接
   * */
      window.wx.ready(function () {
        resolve({
          status: 'ok',
          code: 200
        })
        /*分享到朋友圈*/
        wx.onMenuShareTimeline({
          title: shareData.title, // 分享标题
          link: shareData.link, // 分享链接，该链接域名必须与当前企业的可信域名一致
          imgUrl: shareData.imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享成功')
            if(success && typeof success === 'function'){
              success()
            }
            
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('用户取消分享')
            if(error && typeof error === 'function'){
              error()
            }
            
          }
        });

        /*分享给朋友*/
        window.wx.onMenuShareAppMessage({
          title: shareData.title, // 分享标题
          desc: shareData.desc, // 分享描述
          link: shareData.link, // 分享链接，该链接域名必须与当前企业的可信域名一致
          imgUrl: shareData.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享成功')
            if(success && typeof success === 'function'){
              success()
            }
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('用户取消分享')
            if(error && typeof error === 'function'){
              error()
            }
          }
        });
      })
      window.wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        reject(res)
      });
    }).catch((err) => {
      reject(err)
    })
  })
}
