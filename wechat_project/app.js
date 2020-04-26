//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      'Cookie': ''
    },
    public_time: function (res_add_time) {
      var add_time = new Date(res_add_time * 1000);
      var Y = add_time.getFullYear();
      var M = (add_time.getMonth() + 1 < 10 ? '0' + (add_time.getMonth() + 1) : add_time.getMonth() + 1);
      var D = (add_time.getDate() < 10 ? '0' + add_time.getDate() : add_time.getDate());
      var H = (add_time.getHours() < 10 ? '0' + add_time.getHours() : add_time.getHours());
      var min = (add_time.getMinutes() < 10 ? '0' + add_time.getMinutes() : add_time.getMinutes());
      var S = (add_time.getSeconds() < 10 ? '0' + add_time.getSeconds() : add_time.getSeconds())
      var res_val = Y + "-" + M + "-" + D + " " + H + ":" + min + ":" + S;
      return res_val
    },
  }
})