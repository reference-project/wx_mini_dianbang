// pages/user/collection.js
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
    list: [],
    level: 2,
  },
  goDetails: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    var level = that.data.level;
    wx.navigateTo({
      url: '/pages/index/productDetail?id=' + id + "&level=" + level
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getData();
  },
  getData: function () {
    // debugger;
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/product/list-collect', "", {
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
      },
      function (res) {
        // console.log(res.data)
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
          'page.loading': false
        });
        that.setData({
          list: res.data.list,
        })
        // var listIndex = that.data.list.length;
        // res.data.list.forEach(function (value, index, list) {
        //   var key = "list[" + listIndex + "]";
        //   that.setData({
        //     [key]: value,
        //   });
        //   listIndex++;
        // });
      }
    )
  },
  loadData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/product/list-collect', "", {
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
      },
      function (res) {
        // console.log(res.data)
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
          'page.loading': false
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
    that.loadData();
  },
  // 删除收藏
  del(e) {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/product/del-collect', "", {
        id: e.currentTarget.dataset.id,
      },
      function (res) {
        var data = res.data;
        console.log(res.data)
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          });
          return;
        }
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        });
        that.getData();
      }
    )
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    let that = this;
    that.loadMore();
  },

})