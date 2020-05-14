// pages/record_pay/record_pay.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:[],
    uesrinfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  record_pay:function(){
    var _this=this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/get_record_pay',
      dataType:"json",
      data:{
        token:app.globalData.token,
      },
      method:"POST",
      success(res){
        var res=res.data.data;
        console.log(app.globalData.userInfo.level_name)
        var uesrinfo = app.globalData.userInfo.level_name;
        console.log(res);
        _this.setData({
          res:res,
          uesrinfo: uesrinfo
        })
      }
    })
  },
  onLoad: function (options) {
    var _this=this;
    _this.record_pay()
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