// pages/dianbanggg/myIncome.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: '1',
    list:[],
    listOrder:[],
    withdrawList:[],
    credoId :'',
    page: {
      pageNo: 1,
      pageSize: 10,
      hasNextPage: false,
      loading: false,

    },
  },
  menuClick: function (e) {
    this.setData({
      num: e.target.dataset.num
    })
    if(this.data.num ==1){
      this.getData();
    } else if (this.data.num == 2){
      this.getListWait();
    }else{
      this.getWithdraw();
    }
    
  },
  navClick: function (e) {
    this.setData({
      _state: e.target.dataset.state
    })
  },
  goWithdrawals: function(){
    wx.navigateTo({
      url: '/pages/user/chief/withdrawals'
    })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var num = options.num
    that.setData({
      num: num,
    })
    this.getData();
    this.getListWait();
    this.getWithdraw();
  },
 /**
   * 获取了可提现收益
   */
  getData:function(){
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/list-can-withdraw', "", {
        credoId: that.data.credoId,
        pageSize: that.data.page.pageSize,
        pageNo: that.data.page.pageNo,
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
        that.setData({
          list: res.data.list
        })
        // var listIndex = that.data.withdrawList.length;
        // res.data.list.forEach(function (value, index, list) {
        //   var key = "withdrawList[" + listIndex + "]";
        //   that.setData({
        //     [key]: value,
        //   });
        //   listIndex++;
        // });
      }
    )
  },
  /**
  * 获取了未结算收益
  */
  getListWait: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/list-wait', "", {
        credoId: that.data.credoId,
        pageSize: that.data.page.pageSize,
        pageNo: that.data.page.pageNo,
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
        that.setData({
          listOrder: res.data.list,
        })
        // var waitIndex = that.data.listOrder.length;
        // res.data.list.forEach(function (value, index, list) {
        //   var key = "listOrder[" + listIndex + "]";
        //   that.setData({
        //     [key]: value,
        //   });
        //   waitIndex++;
        // });
      }
    )
  },
  /**
    * 提现记录
    */
  getWithdraw: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/withdraw/list', "", {
        pageSize: that.data.page.pageSize,
        pageNo: that.data.page.pageNo,
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
        that.setData({
          withdrawList: res.data.list,
        })
        // var withdrawIndex = that.data.withdrawList.length;
        // res.data.list.forEach(function (value, index, list) {
        //   var key = "withdrawList[" + withdrawIndex + "]";
        //   that.setData({
        //     [key]: value,
        //   });
        //   withdrawIndex++;
        // });
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