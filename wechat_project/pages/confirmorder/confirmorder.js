// pages/confirmorder/confirmorder.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio_check:true,
    orderid:"",
    buy_vip_info:"",
    price:"",
    count:0,
    pay_comfirm:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  get_order_list(){
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/confirmOrder.html',
      method:"POST",
      dataType:"json",
      data:{
        orderSn: _this.data.orderid,
        token: app.globalData.token
      },
      success(res){
        var res=res.data.data;
        _this.setData({
          buy_vip_info: res.buy_vip_info,
          price: res.price
        })
      }
    })
  },
  judgment_check(){
    var _this=this;
    var count = _this.data.count;
    count++
    if(count%2==0){
      _this.setData({
        radio_check:true,
        count: count
      })
    }else{
      _this.setData({
        radio_check:false,
        count: count
      })
    }
  },
  pay_comfirm:function(){
    var _this=this;
    _this.data.pay_comfirm=false
    _this.setData({
      pay_comfirm: _this.data.pay_comfirm
    })
  },
  liji_pay(){
    var _this=this;
    if (_this.data.radio_check==true){
      wx.request({
        method: "POST",
        data: {
          token: app.globalData.token,
          orderSn: _this.data.orderid
        },
        url: 'https://cloud.meshmellow.cn/wechatapi/pay.html',
        success(res) {
          var res = res.data.data.data
          wx.requestPayment({
            appId: res.appId,
            nonceStr: res.nonceStr,
            package: res.package,
            paySign: res.paySign,
            signType: res.signType,
            timeStamp: res.timeStamp,
            success(res) {
            }
          })
        }
      })
    }else{
      wx.showToast({
        title: '请同意协议后才能购买！',
        icon: 'none',
        duration: 1000
      })
    }
  },
  onLoad: function (options) {
    var _this=this;
    _this.data.orderid = options.orderid;
    console.log(_this.data.orderid)
    if(_this.data.orderid!=null){
      _this.get_order_list()
    }
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