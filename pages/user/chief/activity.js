// pages/user/activity.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: {
      pageNo: 1,
      pageSize: 10,
      hasNextPage: false,
      loading: false,
      
    },
    state: 0,
    list: [],
    credoId: '', //团长id
    id:'',
  },
  goDetails:function(e){
    // var credoId = e.currentTarget.dataset.credoid
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/chief/activityDetail?credoId=' + this.data.credoId + "&id=" + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      credoId: options.credoId,
    });
    this.getData();
    
  },
  /**
   * 获取数据
   */
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/activity/list', "", {
        credoId: that.data.credoId,
        // id: that.data.id,
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
          return;
        }
        //赋值分页参数
        that.setData({
          'page.hasNextPage': data.hasNextPage,
          'page.loading': false,
        });
        var listIndex = that.data.list.length;
        res.data.list.forEach(function (value, index, list) {
          var key = "list[" + listIndex + "]";
          that.setData({
            [key]: value,
          });
          listIndex++;
        });
      }
    )
  },
  /**
   * 通知提货
   */
  notification(e){
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/send-obtain', "", {
        credoId: e.currentTarget.dataset.credoid,
        activityId: e.currentTarget.dataset.id
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: "通知失败",
            icon: 'none',
          });
          return;
        }
        wx.showToast({
          title: "通知提货成功!",
          icon: 'none',
        });
        that.getData();
      }
    )
  },
  /**
 *  加载下一页
 */
  loadMore: function () {
    let that = this;
    if (!that.data.page.hasNextPage || that.data.page.loading) {
      return false;
    }
    this.data.page.loading = true;
    let pageNo = this.data.page.pageNo + 1;
    that.setData({
      'page.pageNo': pageNo
    })
    that.getData();
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    let that = this;
    that.loadMore();
  },
})