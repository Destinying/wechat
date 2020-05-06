// pages/myself/myself.js
const app=new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:"",
    out_time:"",
    isVip:"",
    sex:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getpersonInfo(){
    var _this=this
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/get_member',
      method:"POST",
      data:{
         token: app.globalData.token
      },
      success(res){
        console.log(res)
        var res=res.data.data;
        var nickname = res.nickname
        var out_time = app.globalData.public_time(res.out_time);
        var isVip="";
        if (res.isVip){
          isVip="VIP会员"
        }else{
          isVip = "非VIP会员"
        }
        var sex="";
        if (res.sex=="0"){
          sex="未知"
        }else if(res.sex=="1"){
          sex="男"
        }else{
          sex="女"
        }
        _this.setData({
          nickname: nickname,
          out_time: out_time,
          isVip: isVip,
          sex: sex
        })
      }
    })
  },
  onLoad: function (options) {
    var _this = this;
    _this.getpersonInfo()
    _this.get_base_info()
    wx.setNavigationBarTitle({
      title: "个人信息",
    })
  },
  get_base_info(){
    var _this=this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/get_baseuser_info',
      data: {
        token: app.globalData.token
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
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