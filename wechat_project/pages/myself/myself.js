// pages/myself/myself.js
const app=new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:"",
    out_time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getpersonInfo(){
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/get_member',
      method:"POST",
      data:{
         token: app.globalData.token
      },
      success(res){
        console.log(res)
        var _this=this;
        var res=res.data.data;
        var nickname = res.nickname
        var out_time = app.globalData.public_time(res.out_time);
        console.log(typeof(out_time))
        console.log(typeof(nickname))
        _this.setData({
          nickname: nickname,
          out_time: out_time
        })
      }
    })
  },
  onLoad: function (options) {
    var _this = this;
    _this.getpersonInfo()
    wx.setNavigationBarTitle({
      title: "个人信息",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})