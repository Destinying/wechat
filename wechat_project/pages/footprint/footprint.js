// pages/footprint/footprint.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judgment_toggle:true,
    hide_list:[],
    slide_toggle:[],
    data_count:""
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
        token:app.globalData.token,
      },
      success(res){
        var res=res.data.data.data
        _this.data.hide_list=res;
        res.forEach(function (val, index) {
          _this.data.slide_toggle.push(false)
        })
        console.log(_this.data.slide_toggle)
        _this.data.data_count=1
        _this.setData({
          res:res,
          slide_toggle: _this.data.slide_toggle,
          data_count:_this.data.data_count
        })
      }
    })
  },
  click_toggle(event){
    var _this=this;
    console.log(event)
    var currentTarget = event.currentTarget.id;
    var hide_list=_this.data.hide_list;
    hide_list.forEach(function(val,index){
      if (currentTarget == index) {
        if (event.currentTarget.dataset.count[index]%2!=0){
          _this.data.slide_toggle[index] = !_this.data.slide_toggle[index]
        }else{
          _this.data.slide_toggle[index] = !_this.data.slide_toggle[index]
        }
      }
    })
    _this.data.data_count += 1
    _this.setData({
      slide_toggle: _this.data.slide_toggle,
      data_count: _this.data.data_count
    })
    console.log(hide_list)
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