// shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_img:[],
    imgHeight:[],
    imgwidth:"",
    current:'',
    lesson_list:[],
    imgHeight_01: [],
    live_lesson:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  a_go_lesson:function(event){
    console.log(event)
    var _this=this;
    var res=event.currentTarget.dataset.url
    wx.switchTab({
      url: res,
    })
  },
  getListdata: function () {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/AppletIndex',
      success(res){
        var res=res.data;
        _this.setData({
          swiper_img: res.swiper,
          lesson_list: res.tuijian,
          live_lesson: res.online
        })
      }
    })
  },
  onLoad: function (options) {
    var _this=this;
    _this.getListdata();
  },
  imageLoad:function(e){
   
    var imgwidth = e.detail.width;
    var  imgheight = e.detail.height;
    var  ratio = imgwidth / imgheight;
    var viewHeight = 750 / ratio;
    var imgHeight = this.data.imgHeight;
    //把每一张图片的对应的高度记录到数组里  
    imgHeight = viewHeight;
    this.setData({
      imgHeight: imgHeight
    })
  }, //根据图片宽度动态给高度
  imageLoad_01: function (e) {
    var imgwidth = e.detail.width;
    var imgheight = e.detail.height;
    var ratio = imgwidth / imgheight;
    var viewHeight = 750 / ratio;
    var imgHeight = this.data.imgHeight;
    //把每一张图片的对应的高度记录到数组里  
    imgHeight = viewHeight;
    this.setData({
      imgHeight_01: imgHeight
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