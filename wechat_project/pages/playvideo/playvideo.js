// pages/playvideo/playvideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    page_title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getvideoList:function(){
    var _this=this;
    var id=_this.data.id;
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/course_play.html',
      data:{
        id:id
      },
      success(res){
        var res=res.data;
        console.log(res);
        _this.setData({
          page_title: res.page_title,
        })
      }
    })
  },
  onLoad: function (options) {
    var _this=this;
    _this.data.id=options.id;
    console.log(_this.data.id)
    if(_this.data.id!=""){
      _this.getvideoList()
    }else{
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '是的！我出错了，请刷新页面~~',
        icon: 'none',
        duration: 1000,
        iconType: 'cancel'
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