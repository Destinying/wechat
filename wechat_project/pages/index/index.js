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
   title_data:[],
   currentTab:0,
   navScrollLeft: 0,
   origin_data:[],
   callwidth:[],
   title_arr:[],
   arr_f:[],
   item_id:'',
   showstate:false,
   value:"",
   switchNav_01:"",
   currentTab_01:""
  },
  getallpages() {
    var _this = this;
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/course_lists.html',
      data: {
        cid: 0,
        tag_id: 0,
      },
      success(res) {
        console.log(res)
        var title_data=res.data.class_list; //分类
        title_data.splice(0,0,{id:0,name:"全部"}) //分类添加全部
        var title_Classification = res.data.tag_list; //标签
        title_Classification.splice(0, 0, { id: 0, name: "全部" })
        title_Classification.splice(16, 1)
       
        var res_data = res.data.data.data; //20个图片加文字
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
          showstate:true,
          title_Classification: title_Classification
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // queryMultipleNodes:function(){
  //   const query = wx.createSelectorQuery();
  //   var _this=this;
  //   query.selectViewport().scrollOffset() 
  //   for (var i = 0; i < 20;i++){
  //     query.select("#scroll_id_" + i).boundingClientRect(); 
  //   }
  //   query.exec((res) => {
  //     _this.title_arr=res;
  //     console.log(_this.title_arr)
  //     _this.setData({
  //       callwidth: res.width
  //     })
  //   })
    
  // },

  onLoad: function (options) {
    this.getallpages();
    // this.queryMultipleNodes();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
       
      },
    })       
  },
  clicktitle(event){
    var _this = this;
    var cur = event.currentTarget.dataset.current;
    console.log(event.currentTarget)
    _this.value = event.currentTarget.id;
    var value = _this.value;
    var switchNav= _this.switchNav_01;
    _this.showstate = false;
    wx.request({
      url: "https://cloud.meshmellow.cn/wechatapi/course_lists.html",
      data: {
        cid: value,
        tag_id: switchNav,
      },
      method: "POST",
      success(res) {
        var dif_title = res.data.data.data;
        _this.setData({
          getallpages: dif_title,
          showstate: true,
          currentTab_01: value
        })
      }
    })

  },
  switchNav(event){
    //每个tab选项宽度占1/5
    var _this=this;
    var cur = event.currentTarget.dataset.current;
    _this.switchNav_01 = event.currentTarget.id;
    var value = _this.value;
    var switchNav = _this.switchNav_01;
    _this.showstate = false;
    // _this.arr_f=_this.title_arr;  //获取所有标签数组中的信息
    // console.log(_this.arr_f)
    var singleNavWidth = (this.data.windowWidth - (this.data.windowWidth * 0.15) - event.currentTarget.offsetLeft);
    
    // console.log(singleNavWidth)
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
    wx.showLoading({
      title: '加载中...',
      showstate: false
    })
    setTimeout(function () {
    wx.request({
        url:"https://cloud.meshmellow.cn/wechatapi/course_lists.html",
        data:{
          cid: value,
          tag_id: switchNav,
        },
        method:"POST",
        success(res){
          var dif_title=res.data.data.data;
          _this.setData({
          getallpages :dif_title,
          showstate:true
          })
        }
      })
    },1000)
  },
  switchTab(event){
    var cur = event.detail.current;
    var cur_id = event.detail.currentItemId
    var _this=this;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth,
      showstate: false
    });
    wx.showLoading({
      title: '加载中...',
    })
      setTimeout(function () {
        wx.request({
          url: "https://cloud.meshmellow.cn/wechatapi/course_lists.html",
          data: {
            cid: 0,
            tag_id: cur_id,
          },
          method: "POST",

          success(res) {

            var dif_title = res.data.data.data;
            _this.setData({
              getallpages: dif_title,
              showstate: true
            })
            wx.hideLoading()
          }
        })
      },1000)
        
     
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.queryMultipleNodes();
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