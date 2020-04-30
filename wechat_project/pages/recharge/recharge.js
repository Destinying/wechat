// pages/recharge/recharge.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkout_params:true,
    checkout_params_year:false,
    obj_year:{
      price:"599.00",
      payCode:"nativePay|wxPay",
      packageId:"3",
      buyType:"2"
    },
    obj_season:{
      price: "199.00",
      payCode: "nativePay|wxPay",
      packageId: "2",
      buyType: "2"
    },
    price:"199.00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  get_checkout:function(){
    var _this=this;
    var  checkout_params=true;
    var checkout_params_year=false;
    _this.setData({
      checkout_params: checkout_params,
      checkout_params_year: checkout_params_year,
      price:"199.00"
    })
  },
  get_checkout_year: function () {
    var _this = this;
    var checkout_params = false;
    var checkout_params_year = true;
    _this.setData({
      checkout_params: checkout_params,
      checkout_params_year: checkout_params_year,
      price: "599.00"
    })
    console.log(_this.data.obj_year)
  },
  liji_pay:function(){
    var _this = this;
    var d="";
    if (_this.data.checkout_params){
      _this.data.obj_season.token = app.globalData.token;
      d = _this.data.obj_season
    }else{
      _this.data.obj_year.token = app.globalData.token;
      d = _this.data.obj_year
    }
    app.sendRequest({
      url: 'Wechatapi/subscribe.html',
      data:d,
      success(res){
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    var _this=this;
   var a= app.globalData.token;
   console.log(a)
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