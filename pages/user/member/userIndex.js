const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// userId:'',
		user: '',
		tabIndex: 2,
		state: 0,
		popup: true,
		flag: false //用户是否申请了团长

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
	//用户是否申请团长
	userCenter: function () {
		var that = this;
		app.request(
			app.globalData.grouponUrl + '/api/credo/user-center', "", {
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
					flag: res.data.flag
				})
			}
		)
	},
	//去团长个人中心
	goUserIndex: function () {
		wx.navigateTo({
			url: '/pages/user/chief/colonelIndex'
		})
	},
	goOrder: function (e) {
		var state = e.currentTarget.dataset.state
		wx.navigateTo({
			url: '/pages/user/member/myOrder?state=' + state,
		})
		this.setData({
			user: app.globalData.user,
		});
	},
	goSale: function () {
		wx.navigateTo({
			url: '/pages/user/member/serviceOrder'
		})
	},
	goCollect: function () {
		wx.navigateTo({
			url: '/pages/user/member/collection'
		})
	},
	goAddress: function () {
		wx.navigateTo({
			url: '/pages/user/member/address'
		})
	},
	goJoin: function () {
		if(this.data.flag == true){//审核中、审核拒绝等
			wx.navigateTo({
				url: '/pages/user/member/review'
			})
		}else{
			wx.navigateTo({
				url: '/pages/user/member/application'
			})
		}
	},
	goService: function () {
		wx.navigateTo({
			url: '/pages/user/member/service'
		})
	},
	goProblem: function () {
		wx.navigateTo({
			url: '/pages/user/member/centerHelp'
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			user: app.globalData.user,
		});
		//查询 - 用户是否了申请团长
		this.userCenter();
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