// pages/user/member/centerHelp.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[],
    typeId:0,
    articles:[],
    title:'',
    id:'',
    name:'',
  },
  goArticles:function(e){
    var name = e.currentTarget.dataset.name;
    this.setData({
      typeId: e.currentTarget.dataset.id,
      title: name,
      articles: [],
    })
    this.getData();
    
  },
  goDetails:function(e){
    var id = e.currentTarget.dataset.id
    var typeId = e.currentTarget.dataset.typeid
    wx.navigateTo({
      url: '/pages/user/member/helpDetails?id=' + id + '&typeId=' + typeId,
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getData();
    that.getTitle();
  },
/**
   * 加载数据
   */
  getData:function(){
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/user/list-help', "", {
        typeId: that.data.typeId
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
        that.setData({
          types: res.data.types,
          articles: res.data.articles,
          // title: res.data.types[0].name,
        })
      }
    )
  },
  /**
   * 获取初始化标题
   */
  getTitle: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/user/list-help', "", {
        typeId: that.data.typeId
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
        that.setData({
          types: res.data.types,
          articles: res.data.articles,
          title: res.data.types[0].name,
        })
      }
    )
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