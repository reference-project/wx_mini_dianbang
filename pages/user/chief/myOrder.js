// pages/dianbanggg/myOrder.js
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
		currentTab: 0,
		state: 0,
		list: [],
		listOrder: [],
		credoId:'',
    directNumber:'',
    

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
      url: '/pages/user/chief/orderDetail?id=' + id + "&state=" + state + "&credoId=" + credoId,
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

		that.getData();
	},
	/**
	 * 获取数据
	 */
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/list-order', "", {
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
        state: that.data.state,
        credoId: that.data.credoId

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
				// 	that.setData({
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
      app.globalData.grouponUrl + '/api/order/list-order', "", {
        pageNo: that.data.page.pageNo,
        pageSize: that.data.page.pageSize,
        state: that.data.state,
        credoId: that.data.credoId

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
 * 确认收货
 */
  Confirm: function (e) {
    var orderId = e.currentTarget.dataset.id
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/order/confirm', "", {
        orderId: orderId
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: "确认收货失败",
            icon: 'none',
          });
          return;
        }
        wx.showToast({
          title: "确认收货成功!",
          icon: 'none',
        });
        that.getData();
        // setTimeout(function () {
        //   wx.navigateTo({
        //     url: '/pages/user/chief/myOrder'
        //   })
        // }, 800)
      }
    )
  },
   /**
	 *  提醒发货
	 */
  remind: function(e){
    let that = this;
    var orderId = e.currentTarget.dataset.id
    app.request(
      app.globalData.grouponUrl + '/api/order/send-message', "", {
        orderId: orderId
      },
      function (res) {
        console.log(res.data)
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: "提醒发货失败",
            icon: 'none',
          });
          return;
        }
        wx.showToast({
          title: "提醒发货成功!",
          icon: 'none',
        });
        that.getData();
        // setTimeout(function () {
        //   wx.navigateTo({
        //     url: '/pages/user/chief/myOrder'
        //   })
        // }, 800)
      }
    )
  },
	/**
	 *  加载下一页
	 */
	loadMore: function () {
		let _this = this;
		if (!_this.data.page.hasNextPage || _this.data.page.loading) {
			return false;
		}
		this.data.page.loading = true;
		let pageNo = this.data.page.pageNo + 1;
		_this.setData({
			'page.pageNo': pageNo
		})
    _this.refreshData();
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		let that = this;
		that.loadMore();
	},
})