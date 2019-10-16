// pages/user/ranking.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList:[],
    page: {
      pageNo: 1,
      pageSize: 8,
      hasNextPage: false,
      loading: false,
    },
    credo:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  /**
	 * 获取数据
	 */
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/credo/list-rank', "", {
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
        // credo: that.data.credo
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
          'page.loading': false
        });
        var listIndex = that.data.rankList.length;
        res.data.list.forEach(function (value, index, list) {
          var key = "rankList[" + listIndex + "]";
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