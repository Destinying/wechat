// pages/detail/detail.js
var WxParse=require('../../wxParse/wxParse.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_post:"",
    video_img:"",
    info:"",
    money:"",
    erweima:"",
    menuList:"",
    canshu:"",
    fenlei:"",
    imgHeight:[],
    imgwidth:"",
    video_id:"",
    price:"",
    product_name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getdetailList:function(){
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/king',
      dataType:'GET',
      success(res){
        var res = JSON.parse(res.data);
        _this.data.video_id = res.money.video_id
        _this.data.price = res.money.money;
        _this.data.product_name = res.money.product_name
        console.log(res)
        _this.setData({
          video_post:res.video,
          video_img:res.img,
          info:res.info,
          money:res.money,
          erweima: res.erweima,
          intro:res.intro,
          canshu: res.canshu,
          dibu: res.dibu
        })
      }
    })
  },
  // imageLoad: function (e) {
  //   console.log(e)
  //   var imgwidth = e.detail.width;
  //   var imgheight = e.detail.height;
  //   var ratio = imgwidth / imgheight;
  //   var viewHeight = 750 / ratio;
  //   var imgHeight = this.data.imgHeight;
  //   //把每一张图片的对应的高度记录到数组里  
  //   imgHeight = viewHeight;
  //   this.setData({
  //     imgHeight: imgHeight
  //   })
  // },
  getmenuList:function(){
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/tpl/default/static/live/king.json',
      success(res) {
        var res = res.data.data
        _this.setData({
          menuList:res
        })
      }
    })
  },
  getinukamiList: function () {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/inukami',
      dataType: 'GET',
      success(res) {
        var res = JSON.parse(res.data);
        _this.data.price=res.money.money;
        _this.data.video_id = res.money.video_id;
        _this.data.product_name = res.money.product_name
        _this.setData({
          video_post: res.video,
          video_img: res.img,
          info: res.info,
          money: res.money,
          erweima: res.erweima,
          intro: res.intro,
          canshu: res.canshu,
          dibu: res.dibu
        })
      }
    })
  },
  getinukamimenuList: function () {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/tpl/default/static/live/menu_lesson.json',
      success(res) {
        var res = res.data.data
        _this.setData({
          menuList: res
        })
      }
    })
  },
  liji_pay() {
    var _this = this;
    var d = "";
    let is_login = app.globalData.is_login;
    is_login = app.globalData.is_login;
    if (is_login != 1) {
      wx.showToast({
        title: '请登录之后操作',
        icon: 'none',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            wx.switchTab({
              url: '../mycode/mycode',
            })
          }, 1000)
        }
      })
    } else {
        d = app.globalData.token; 
      wx.request({
        url: 'https://cloud.meshmellow.cn/Wechatapi/subscribe.html',
        data: {
          token:d,
          payCode: "nativePay|wxPay",
          buyType: 4,
          price: _this.data.price,
          video_id:_this.data.video_id,
          coursename: _this.data.product_name
        },
        method: "POST",
        dataType: "json",
        responseType: 'text',
        success(res) {
          console.log(res)
          console.log(res)
          var res = res.data.data.orderSn
          wx.navigateTo({
            url: '../confirmorder/confirmorder?orderid=' + res,
          })
          // 传参至comfirmorder页面，获取订单号
        }
      })
      wx.hideToast();
    }
  },
  getinukami_animationList: function () {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/inukami_animation',
      dataType: 'GET',
      success(res) {
        var res = JSON.parse(res.data);
        _this.data.price = res.money.money;
        _this.data.video_id = res.money.video_id;
        _this.data.product_name = res.money.product_name
        _this.setData({
          video_post: res.video,
          video_img: res.img,
          info: res.info,
          money: res.money,
          erweima: res.erweima,
          intro: res.intro,
          canshu: res.canshu,
          dibu: res.dibu
        })
      }
    })
  },
  getinukami_animationmenuList: function () {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/tpl/default/static/live/inukami_animation.json',
      success(res) {
        var res = res.data.data
        _this.setData({
          menuList: res
        })
      }
    })
  },
  getinukami_designList: function () {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/tpl/default/static/js/inukami_design.json',
      dataType: 'GET',
      success(res) {
         var res = JSON.parse(res.data);
        _this.data.price = res.money.money;
        _this.data.video_id = res.money.video_id;
        _this.data.product_name = res.money.product_name
        console.log(res)
        _this.setData({
          video_post: res.video,
          video_img: res.img,
          info: res.info,
          money: res.money,
          erweima: res.erweima,
          intro: res.intro,
          canshu: res.canshu,
          dibu: res.dibu,
          video_id:res.video_id
        })
      }
    })
  },
  getinukami_designmenuList: function () {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/tpl/default/static/live/inukami_design_01.json',
      success(res) {
        var res = res.data.data
        _this.setData({
          menuList: res
        })
      }
    })
  },
  getcourse:function(){
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/model_logic',
      dataType: 'GET',
      success(res) {
        var res = JSON.parse(res.data);
        _this.data.price = res.money.money;
        _this.data.video_id = res.money.video_id;
        _this.data.product_name = res.money.product_name
        console.log(res)
        _this.setData({
          video_post: res.video,
          video_img: res.img,
          info: res.info,
          money: res.money,
          erweima: res.erweima,
          intro: res.intro,
          canshu: res.canshu,
          dibu: res.dibu
        })
      }
    })
  }, 
  getcourse_01:function(){
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/tpl/default/static/live/model_logic.json',
      success(res) {
        var res = res.data.data
        _this.setData({
          menuList: res
        })
      }
    })
  },
  onLoad: function (options) {
    var _this=this;
    if (options.fenlei=="king"){
      _this.getdetailList();
      _this.getmenuList()
    }else if (options.fenlei == "inukami"){
      _this.getinukamiList();
      _this.getinukamimenuList()
    } else if (options.fenlei == "inukami_animation"){
      _this.getinukami_animationList();
      _this.getinukami_animationmenuList()
    } else if (options.fenlei == "inukami_design"){
      _this.getinukami_designList();
      _this.getinukami_designmenuList()
    } else if (options.fenlei=="course"){ 
      _this.getcourse();
      _this.getcourse_01()
    }
   
    //根据shouye传来的参数不同运行不同的程序
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