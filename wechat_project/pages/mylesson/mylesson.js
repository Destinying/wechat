// pages/mylesson/mylesson.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    live:[],
    purchase:[],
    my_lesson_purchase:[],
    my_lesson_live:[]
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
        _this.setData({
          my_lesson_purchase: _this.data.purchase,
          model_img_01: "../../image/null_pic_01.png"
        })
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
        _this.data.live = res.data.data;
        console.log(_this.data.live)
        _this.setData({
          my_lesson_live: _this.data.live
        })
      }
    })
  },
  onLoad: function (options) {
    var _this=this;
    // _this.get_purchase_list();
    // _this.get_live_list()
    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中...',
      icon: 'loading',
    });
    setTimeout(() => {
      _this.get_purchase_list();
      _this.get_live_list()
      wx.hideLoading();
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.setNavigationBarColor({
    //   backgroundColor: '#b90611',
    //   frontColor:"#ffffff"
    // })
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