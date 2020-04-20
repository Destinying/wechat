//index.js
//获取应用实例
const app = getApp()

Page({ 
  /**
   * 页面的初始数据
   */
  data: {
   getallpages:[],
   title_Classification:[],
   title_data:[]
  },
  getallpages() {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/api/course_lists.html',
      success(res) {
        var title_data=res.data.class_list;
        var title_Classification = res.data.tag_list;
        var res_data = res.data.data.data;
        var res_val_arr=[];
        res_data.forEach(function(val,index){
          var updatetime = new Date(val.update_time*1000);
          var Y=updatetime.getFullYear();
          var M = (updatetime.getMonth() + 1 < 10 ? '0' + (updatetime.getMonth() + 1):updatetime.getMonth() + 1);
          var D = (updatetime.getDate() < 10 ? '0' + updatetime.getDate():updatetime.getDate());
          var res_val = Y + "年" + M + "月" + D +"日";
          var res_name;
          val.res_name = res_val;
        })
        _this.setData({
          getallpages: res_data,
          title_data: title_data,
          title_Classification: title_Classification
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getallpages()
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