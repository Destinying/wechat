// pages/footprint/footprint.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judgment_toggle:true,
    hide_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  get_footprint(){
    var _this=this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/Wechatapi/get_record_video',
      method:"POST",
      dataType:"json",
      data:{
        token:app.globalData.token
      },
      success(res){
        var res=res.data.data.data
        _this.data.hide_list=res;
        _this.data.hide_list.forEach(function (val, index) {
            val.slide_toggle = 0;
        })
        console.log(res)
        _this.setData({
          res:res
        })
      }
    })
  },
  click_toggle(event){
    var _this=this;
    var currentTarget = event.currentTarget.id
    var hide_list=_this.data.hide_list;
    var slide_toggle1="";
    var slide_toggle2 = "";
    var slide_toggle=""
    hide_list.forEach(function(val,index){
      if (currentTarget==index){
        val.slide_toggle = 1;
      }else{
        val.slide_toggle = 0;
      }
    })
    console.log(hide_list)
    _this.setData({
      
    })
  },
  onLoad: function (options) {
    var _this=this;
    _this.get_footprint()
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