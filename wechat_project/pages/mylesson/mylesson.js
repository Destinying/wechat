// pages/mylesson/mylesson.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    live:[],
    purchase:[],
    my_lesson_arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  get_purchase_list(){
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/getMyCourse',
      method:"POST",
      dataType:"json",
      data:{
        token:app.globalData.token,
        coursetype:"purchase"
      },
      success(res){
        _this.data.purchase = res.data.data;
        console.log(_this.data.purchase)
      }
    })
  },
  get_live_list(){
    var _this=this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/getMyCourse',
      method: "POST",
      dataType: "json",
      data: {
        token: app.globalData.token,
        coursetype: "live"
      },
      success(res) {
        _this.data.live=res.data.data;
        _this.data.my_lesson_arr = _this.data.live.concat(_this.data.purchase);
        console.log(_this.data.my_lesson_arr)
        _this.setData({
          my_lesson_arr: _this.data.my_lesson_arr
        })
      }
    })
  },
  onLoad: function (options) {
    var _this=this;
    _this.get_purchase_list()
    _this.get_live_list()
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