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
    bool:false,
    recom_list:'',
    enable:true,
    controls: true,
    gesture: true,
    deviceTotal: 0,    //投诉建议总数
    devicePages: 0,     //投诉建议总页数
    deviceIndex: 1,      //投诉建议当前页
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
        // id: id,
        id:id,
      },
      success(res){
        var res_01 =res.data.data;
        console.log(res_01)
        var videoSet="";
        if (res_01.videoSet == "" || res_01.videoSet == undefined || res_01.videoSet == null){
          res_01.videoSet="现在还没有课程！！";
          _this.bool=false;
        }else{
          res_01.videoSet;
          _this.bool=true;
        }
        var res = res.data.data.videoInfo;
        var add_time = new Date(res.add_time*1000);
        var Y = add_time.getFullYear();
        var M = (add_time.getMonth() + 1 < 10 ? '0' + (add_time.getMonth() + 1) : add_time.getMonth() + 1);
        var D = (add_time.getDate() < 10 ? '0' + add_time.getDate() : add_time.getDate());
        var H = (add_time.getHours() < 10 ? '0' + add_time.getHours() : add_time.getHours());
        var min = (add_time.getMinutes() < 10 ? '0' + add_time.getMinutes() : add_time.getMinutes());
        var S = (add_time.getSeconds() < 10 ? '0' + add_time.getSeconds() : add_time.getSeconds())
        var res_val = Y + "-" + M + "-" + D +" " + H + ":" + min + ":" + S;
        var video_list = res.url
        _this.setData({
          page_title: res.title,
          add_time: res_val,
          click: res.click,
          thumbnail: res.thumbnail, 
          video_set:res_01.videoSet,
          recom_list: res_01.recom_list,
          bool: _this.bool,
          video_list: video_list,
          id:id
        })
      }
    })
  },
  play_video:function(e){
    var _this = this;
    var id = _this.data.id
    var video_list = _this.data.video_list
    video_list="1";
    wx.request({
      url:"https://cloud.meshmellow.cn/wechatapi/payVideo.html",
      data:{
        id:id
      },
      success(res){
        if(res.data.data.rs==1){

        } else if (res.data.data.rs == 5){
          wx.showToast({
            title: '独立付费课程,需要付费购买',
            duration: 2000, 
            icon: "none"
          })
          _this.setData({
            video_list: video_list,
            thumbnail: video_list,
            enable:false,
            gesture: false
          })
          // var videoCtxPrev = wx.createVideoContext('myVideo' + _this.data.id);
          // console.log(videoCtxPrev)
          // videoCtxPrev.pause();
        }else{
          wx.showToast({
            title: '请订阅后再观看课程',
            duration: 2000,
            icon:"none"
          })
          _this.setData({
            video_list: video_list,
            thumbnail: video_list,
            enable: false,
            gesture:false
          })
        }
      }
    })
    
  },
  click_getid:function(event){
    var _this = this;
   _this.data.id=event.currentTarget.id
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/payVideo.html',
      data: {
        id: _this.data.id
      },
      success(res) {
        console.log(res.data.data)
        _this.video_list=res.data.data.videoInfo.url;
        _this.thumbnail = res.data.data.videoInfo.thumbnail;
        _this.page_title = res.data.data.videoInfo.title;
        _this.click = res.data.data.videoInfo.click;
        _this.add_time = app.globalData.public_time(res.data.data.videoInfo.add_time)
        _this.setData({
          video_list:_this.video_list,
          thumbnail: _this.thumbnail,
          page_title: _this.page_title,
          click: _this.click,
          add_time: _this.add_time
        })
      },
    })
  },
  click_getid_tuijian:function(event){
    var _this=this;
    _this.data.id = event.currentTarget.id;
    // console.log(event)
    // console.log(_this.data.recom_list)
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/payVideo.html',
      data: {
        id: _this.data.id
      },
      success(res) {
        console.log(res.data.data)
        _this.video_list = res.data.data.videoInfo.url;
        _this.thumbnail = res.data.data.videoInfo.thumbnail;
        _this.page_title = res.data.data.videoInfo.title;
        _this.click = res.data.data.videoInfo.click;
        _this.add_time = app.globalData.public_time(res.data.data.videoInfo.add_time)
        _this.setData({
          video_list: _this.video_list,
          thumbnail: _this.thumbnail,
          page_title: _this.page_title,
          click: _this.click,
          add_time: _this.add_time
        })
      },
    })
  },
  onLoad: function (options) {
    var _this=this;
    _this.play_video
    _this.data.id=options.id;
    // console.log(_this.data.id)
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