// pages/dianbanggg/myOrder.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		page: {
			pageNo: 1,
			pageSize: 6,
			hasNextPage: false,
			loading: false,
		},
		currentTab: 0,
		state: 0,
		list: [],
		listOrder: [],
    openId:'',
	},
	navClick: function (e) {
		this.setData({
			state: e.target.dataset.state,
			list: []
		})
		this.getData();

	},
	goDetails: function (e) {
		var id = e.currentTarget.dataset.id
    var state = e.currentTarget.dataset.state
    var credoId = e.currentTarget.dataset.credoid
		wx.navigateTo({
      url: '/pages/user/member/orderDetail?state=' + state + "&id=" + id + "&credoId=" + credoId,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    var that = this
    var state = options.state
    that.setData({
      state: state,
      openId: app.globalData.openId,
    })
    that.getData();
	},
	/**
	 * 获取数据
	 */
	getData: function () {
    let that = this;
		app.request(
			app.globalData.grouponUrl + '/api/order/list', "", {
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
        state: that.data.state,
        id: that.data.id
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
        that.setData({
          list: res.data.list,
        })
        // var listIndex = that.data.list.length;
				// res.data.list.forEach(function (value, index, list) {
				// 	var key = "list[" + listIndex + "]";
        //   that.setData({
				// 		[key]: value,
				// 	});
				// 	listIndex++;
				// });
			}
		)
	},
  /**
   * 刷新页面
   */
  refreshData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/list', "", {
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
        state: that.data.state,
        id: that.data.id
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
        // that.setData({
        //   list: res.data.list,
        // })
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
    that.refreshData();
	},
  //取消订单
  cancel: function (e) {
    let that = this;
    var id = e.currentTarget.dataset.id
    app.request(
      app.globalData.grouponUrl + '/api/order/cancel', "", {
        orderId: id,
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: '订单取消失败',
            icon: 'none',
          });
          return;
        }
        wx.showToast({
          title: '订单已取消',
          icon: 'none',
        });
        that.getData();
      }
    )
  },

  payment:function(e){
    let that = this;
    var id = e.currentTarget.dataset.id
    var pay = e.currentTarget.dataset.pay
    if (pay > 0 ){
      that.WxPay(id);
    }else{
      that.pay(id);
    }
  },

  //提交订单
  pay: function (id) {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/order/pay', "", {
        orderInfoId: id,
        isWeixinPay: 0,
      },
      function (res) {
        console.log(res.data)
        var data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          });
          return;
        }
        wx.redirectTo({
          url: "/pages/index/index"
        })
      }
    )
  },
  WxPay: function (id) {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/weixin/pay', "", {
        orderId: id,
        openId: that.data.openId
      },
      function (res) {
        console.log(res.data)
        var data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          });
          return;
        }
        console.log("为了加快临时" + data.timestamp)
        wx.requestPayment({
          timeStamp: data.timestamp,
          nonceStr: data.nonceStr,
          package: data.packageStr,
          signType: 'MD5',
          paySign: data.paySign,
          success(res) {
            wx.showToast({
              title: '支付成功',
              icon: 'none'
            });
            wx.redirectTo({
              url: "/pages/index/index"
            })
          },
          fail(res) {
          }
        })
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