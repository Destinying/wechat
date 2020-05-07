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
  getaccountinfo(){
    var _this=this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/get_baseuser_info',
      dataType:"json",
      method:"POST",
      data: {
        token: app.globalData.token
      },
      success(res){
        var res=res.data.data;
        var res_birthmonth="";
        var res_birthday = "";
        if (res.birthmonth<10){
          res_birthmonth = '0' + res.birthmonth;
        }else{
          res_birthmonth = res.birthmonth;
        };
        if (res.birthday < 10) {
          res_birthday = '0' + res.birthday;
        } else {
          res_birthday = res.birthday;
        };
        var birth = res.birthyear + '-' + res_birthmonth  + '-' + res_birthday
        var mobile = res.mobile;
        var mobile_01=mobile.split("");
        mobile_01.splice(3,4,"****");
        mobile = mobile_01.join("")
        _this.setData({
          realname: res.realname,
          birth: birth,
          graduateschool: res.graduateschool,
          mobile: mobile,
          email: res.email
        })
      }
    })
  },
  onLoad: function (options) {
    var _this = this;
    _this.getpersonInfo()
    _this.getaccountinfo()
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