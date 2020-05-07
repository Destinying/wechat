// pages/confirmorder/confirmorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio_check:true,
    orderid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  get_order_list(){
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/confirmOrder.html',
      method:"POST",
      data:{
        orderSn: _this.data.orderid
      },
      success(res){
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
    var _this=this;
    console.log(options)
    _this.data.orderid = options.orderid
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