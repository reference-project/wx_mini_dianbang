// pages/user/activityDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credoId:'', //团长id
    activityId: '',  //活动id
    activity:[],
    prod:[],
    id:'',
    state:'',
    scene:'',
    level:'2',
  },
  initiatedBuy: function(){
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/activity-credo/add', "", {
        activityId: that.data.activityId,
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
        wx.showToast({
          title: '已发起团购活动',
          icon: 'none',
        });
        wx.navigateTo({
          url: '/pages/user/chief/success?activityId=' + that.data.activityId + "&credoId=" + that.data.credoId
        })
      }

    )
   
  },
  goDetails: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    // var state =that.data.activity.state;
    var activityId = that.data.activityId;
    var level = that.data.level;
    wx.navigateTo({
      url: '/pages/index/productDetail?id=' + id + "&level=" + level+ "&activityId=" + activityId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      credoId: options.credoId,
      activityId: options.id,
      scene: decodeURIComponent(options.scene),
    })
    that.getData();
  },
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/activity/detail', "", {
        credoId: that.data.credoId,
        activityId: that.data.activityId,
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: '活动暂未开始',
            icon: 'none',
          });
          return;
        }
        that.setData({
          activity: res.data.activity
        })
     
      }

    )
  },

})