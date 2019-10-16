const app = getApp();

Page({
	//定义数据
	data: {
		userId: '',
		credo: '',
		user: '',
		tabIndex: 2,
		waitIncome: 0,
		monthIncome: 0,
		num: 0,
    popup:true,

	},
  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /* 显示弹窗 */
  showPopup() {
    this.hidePopup(false);
  },
  // 查看保存二维码
  preview(e) {
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },
	goUserIndex: function () {
		wx.navigateTo({
			url: '/pages/user/member/userIndex'
		})
	},
	goIncome: function () {
		wx.navigateTo({
			url: '/pages/user/chief/myIncome'
		})
	},
	goIncomes: function (e) {
		var num = e.currentTarget.dataset.num;
		wx.navigateTo({
			url: '/pages/user/chief/myIncome?num=' + num
		})
	},
	goOrder: function (e) {
    var credoId = e.currentTarget.dataset.id;
		wx.navigateTo({
      url: '/pages/user/chief/myOrder?credoId=' + credoId
		})
	},
	goChief: function () {
		wx.navigateTo({
			url: '/pages/user/chief/myChief'
		})
	},
	goActivity: function (e) {
    // var credoId = e.currentTarget.dataset.id;
		wx.navigateTo({
      url: '/pages/user/chief/activity?credoId=' + this.data.credo.id
		})
	},
	goRank: function () {
		wx.navigateTo({
			url: '/pages/user/chief/ranking'
		})
	},
  goCode: function (e){
    var credoId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/member/pickUpCode?credoId=' + credoId
    })
  },

	//获取团长信息
	credoCenter: function () {
		var that = this;
		app.request(
			app.globalData.grouponUrl + '/api/credo/center', "", {
				userId: that.data.userId
			},
			function (res) {
				console.log(res.data);
				var data = res.data;
				if (!data.success) {
					wx.showToast({
						title: res.data.info,
						icon: 'none'
					});
					return;
				}
				that.setData({
					credo: res.data.credo,
					waitIncome: res.data.waitIncome,
					monthIncome: res.data.monthIncome,
				})
			}
		)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			userId: app.globalData.user.id,
			user: app.globalData.user,
		});
		//获取用户信息
		this.credoCenter();


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