//// pages/recharge/recharge.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkout_params: true,
    checkout_params_year: false,
    obj_year: {
      price: "599.00",
      payCode: "nativePay|wxPay",
      packageId: "3",
      buyType: "2",
      token: app.globalData.token
    },
    obj_season: {
      price: "199.00",
      payCode: "nativePay|wxPay",
      packageId: "2",
      buyType: "2",
      token: app.globalData.token
    },
    price: "199.00",
    out_time:"",
    not_out_list:[],
    buy_vip_info:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  get_checkout: function () {
    var _this = this;
    var checkout_params = true;
    var checkout_params_year = false;
    _this.setData({
      checkout_params: checkout_params,
      checkout_params_year: checkout_params_year,
      price: "199.00"
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
  },
  liji_pay() {
    var _this = this;
    var d = "";
    if (_this.data.checkout_params) {
      _this.data.obj_season.token = app.globalData.token;
      d = _this.data.obj_season
    } else {
      _this.data.obj_year.token = app.globalData.token;
      d = _this.data.obj_year
    }
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/subscribe.html',
      data: d,
      method: "POST",
      dataType: "json",
      responseType: 'text',
      success(res) {
        var res = res.data.data.orderSn
        wx.navigateTo({
          url: '../confirmorder/confirmorder?orderid=' + res,
        })
        // 传参至comfirmorder页面，获取订单号
      }
    })
    wx.hideToast();
  },
  get_outdata(){
    var _this=this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/get_record_pay.html',
      dataType:"json",
      method:"POST",
      data:{
        token:app.globalData.token,
        type:2
      },
      success(res){
        console.log(res)
        var res=res.data.data;
        var out_time=""
        // _this.data.buy_vip_info = JSON.parse(res.buy_vip_info);
        var time="";
        res.forEach(function(val,index){
          _this.data.buy_vip_info.push(JSON.parse(val.buy_vip_info));
          for (var val_01 of _this.data.buy_vip_info) {
            res[index].name = val_01.name
          }
          out_time = app.globalData.public_time(val.add_time);
          console.log(out_time)
          res[index].time = out_time;
          if(val.price=="599"){
           var splice_data=out_time.split("")
           console.log(split)
          }
        })
        console.log(res)
        _this.setData({
          not_out_list: res,
        })
      }
    })
  },
  onLoad: function (options) {
    var _this = this;
    var a = app.globalData.token; //获取taken值
    // wx.setNavigationBarColor({
    //   backgroundColor: '#d6000f',
    //   frontColor:'#ffffff'
    // })
    console.log(options)
    _this.setData({
      out_time: options.out_time
    })
    _this.get_outdata()
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