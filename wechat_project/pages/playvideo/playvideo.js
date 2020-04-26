// pages/playvideo/playvideo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    page_title:"",
    add_time:"",
    click:"",
    thumbnail:'',
    video_list:'',
    selected: true,
    selected1: false,
    video_set:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
 
  getvideoList:function(){
    var _this=this;
    var id=_this.data.id;
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/course_play.html',
      data:{
        id:513,
      },
      success(res){
        var res_01 =res.data.data;
        console.log(res_01);
        var res = res.data.data.videoInfo;
        var add_time = new Date(res.add_time*1000);
        var Y = add_time.getFullYear();
        var M = (add_time.getMonth() + 1 < 10 ? '0' + (add_time.getMonth() + 1) : add_time.getMonth() + 1);
        var D = (add_time.getDate() < 10 ? '0' + add_time.getDate() : add_time.getDate());
        var H = (add_time.getHours() < 10 ? '0' + add_time.getHours() : add_time.getHours());
        var min = (add_time.getMinutes() < 10 ? '0' + add_time.getMinutes() : add_time.getMinutes());
        var S = (add_time.getSeconds() < 10 ? '0' + add_time.getSeconds() : add_time.getSeconds())
        var res_val = Y + "-" + M + "-" + D +" " + H + ":" + min + ":" + S;
        console.log(res);
        _this.setData({
          page_title: res.title,
          add_time: res_val,
          click: res.click,
          thumbnail: res.thumbnail,
          video_set:res_01.videoSet
        })
      }
    })
  },
  play_video:function(){
    var _this=this;
    
  },
  onLoad: function (options) {
    var _this=this;
    _this.play_video
    _this.data.id=options.id;
    console.log(_this.data.id)
    if(_this.data.id!=""){
      _this.getvideoList()
    }else{
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '是的！我出错了，请刷新页面~~',
        icon: 'none',
        duration: 1000
      });
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