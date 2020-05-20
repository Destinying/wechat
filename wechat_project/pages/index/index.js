//index.js
//获取应用实例
const app = getApp()
var loadMore=function(event){
  var _this=this;
  _this.setData({
    hidden: false
  });
  wx.request({
    header: getApp().globalData.header,
    url: 'https://cloud.meshmellow.cn/wechatapi/course_lists.html',
    data: {
      page: per_page,
      cid: value,
      tag_id: switchNav,
      header: getApp().globalData.header,
    },
    success(res) {
      console.log(res)
      //当前页数返回的数据
      _this.result = _this.data.getallpages;
      console.log(_this.result)
      var resArr = [];
      var resArr_01 = [];
      resArr = res.data.data.data;  //存的现在最新的20个数据
      // console.log(resArr)
      var total = res.data.data.total; //页面数据总数量
      resArr_01 = _this.result.concat(resArr);
      var cont = resArr_01;
      _this.data.per_page = res.data.data.current_page;
      //算出当前页数      
      // console.log(_this.data.per_page)
      // console.log(resArr_01.length);
      // if (cont.length >= total) {
      //   wx.showToast({ //如果全部加载完成了也弹一个框
      //     title: '我也是有底线的~',
      //     icon: 'none',
      //     duration: 1000,
      //   });
      //   return false;
      // } else {
      //   wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      //     title: '加载中5555',
      //     icon: 'loading',
      //   });
      //   // setTimeout(() => {
      _this.setData({
        getallpages: resArr_01
      });
      //   wx.hideLoading();
      //   // }, 1500)
      // }
    }
  })
}
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
   value:0,
   switchNav_01:0,
   currentTab_01:"",
   height:"",
   current_page:1,
   total:0,
   per_page:1,
   cont:'',
   result:[],
   dif_title:[],
    hidden_01:true,
    hidden:false
  },
lower(event){
  console.log(event)
  var _this = this;

  event.index = 1
  var per_page = _this.data.per_page + 1;  //获取当前的页数加1传给后台
  console.log(per_page)
  var value = _this.data.value;
  var switchNav = _this.data.switchNav_01;
  _this.setData({
    hidden:false,
    hidden_01:true
  });
  wx.request({
    header: getApp().globalData.header,
    url: 'https://cloud.meshmellow.cn/wechatapi/course_lists.html',
    data: {
      page: per_page,
      cid: value,
      tag_id: switchNav,
      header: getApp().globalData.header,
    },
    success(res) {
      console.log(res)
      //当前页数返回的数据
      _this.result = _this.data.getallpages;
      console.log(_this.result)
      var resArr = [];
      var resArr_01 = [];
      resArr = res.data.data.data;  //存的现在最新的20个数据
      // console.log(resArr)
      var total = res.data.data.total; //页面数据总数量
      
      resArr_01 = _this.result.concat(resArr);
      var cont = resArr_01;
      _this.data.per_page = res.data.data.current_page;
      //算出当前页数      
      // console.log(_this.data.per_page)
      // console.log(resArr_01.length);
      if (cont.length >= total || res.length < 5) {
        _this.setData({
          hidden:true,
          hidden_01:false
        })
      } else {
        wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
          title: '加载中...',
          icon: 'loading',
        });
       setTimeout(() => {
         _this.setData({
           getallpages: resArr_01
         });
         wx.hideLoading();
        }, 500)
      }
    }
  })
    console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  // topLoad: function (event) {
  //   //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
  //   this.setData({
  //     getallpages: [],
  //     scrollTop: 0
  //   });
  //   loadMore(this);
  //   console.log("lower");
  // },
  getallpages() {
    var _this = this;
    var value = _this.data.value;
    var switchNav = _this.data.switchNav_01;
    wx.request({
      url: 'https://cloud.meshmellow.cn/wechatapi/course_lists.html',
      data: {
        cid: value,
        tag_id: switchNav,
      },
      success(res) {
        // console.log(res)
        if (res.data.data.data.length<5) {
          _this.data.hidden = true;
          _this.data.hidden_01 = false
        }
        var title_data=res.data.class_list; //分类
        title_data.splice(0,0,{id:0,name:"全部课程"}) //分类添加全部
        title_data.splice(3,0, { id: -1, name: "免费课程" })
        var title_Classification = res.data.tag_list; //标签
        title_Classification.splice(0, 0, { id: 0, name: "所有内容" })
        title_Classification.splice(15, 1)
        _this.total = res.data.data.total //获取所有数据
        var res_data = res.data.data.data; //20个图片加文字
        console.log(res_data)
        _this.per_page = res.data.data.per_page //获取当前页面数据数量
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
          resArr_01: res_data,
          getallpages: res_data,
          title_data: title_data,
          showstate:true,
          title_Classification: title_Classification,
          hidden: _this.data.hidden,
          hidden_01: _this.data.hidden_01
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
    // loadMore(this)
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
        console.log(res)
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: 546,
          height:res.windowHeight-60
        })
       
      },
    })       
  },
  clicktitle(event){
    var _this = this;
    var cur = event.currentTarget.dataset.current;
    // console.log(event.currentTarget)
    _this.data.value = event.currentTarget.id;
    var value = _this.data.value;
    var switchNav= _this.data.switchNav_01; 
    // console.log(switchNav)
    // console.log(value)
    _this.showstate = false;
    wx.request({
      url: "https://cloud.meshmellow.cn/wechatapi/course_lists.html",
      data: {
        cid: value,
        tag_id: switchNav,
      },
      method: "POST",
      success(res) {
        _this.dif_title = res.data.data.data;
       
        _this.setData({
          getallpages: _this.dif_title,
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
    _this.data.switchNav_01 = event.currentTarget.id;
    var value = _this.data.value;
    var switchNav = _this.data.switchNav_01;
    // console.log(switchNav)
    // console.log(_this.data.value)
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
          if (res.data.data.data.length <5){
            _this.data.hidden=true;
            _this.data.hidden_01=false
          }
          _this.dif_title=res.data.data.data;
          // console.log(_this.dif_title)
          
          _this.setData({
            getallpages: _this.dif_title,
            showstate:true,
            hidden: _this.data.hidden,
            hidden_01: _this.data.hidden_01
          })
        }
      })
     wx.hideLoading();
   },500)
  },
  switchTab(event){
    
    var cur = event.detail.current;
    var cur_id = event.detail.currentItemId
    var _this=this;
    var singleNavWidth = this.data.windowWidth / 5;
    var value=_this.data.value
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
            cid: value,
            tag_id: cur_id,
          },
          method: "POST",
          success(res) {
            _this.dif_title = res.data.data.data;
            _this.setData({
              getallpages: _this.dif_title,
              showstate: true
            })
            wx.hideLoading()
          }
        })
      },5000)
        
     
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.queryMultipleNodes();
    this.getallpages() 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getallpages() 
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