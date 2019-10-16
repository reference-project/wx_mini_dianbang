// pages/user/review.js
const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		apply:'',
		credo:'',
		phone:'',
	},
	// 查看保存二维码
	preview(e) {
		var url = e.currentTarget.dataset.url;
		wx.previewImage({
			urls: [url],
		})
	},
// 返回首页
  goIndex:function(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
	//继续申请
	goModify: function () {
		wx.navigateTo({
      url: '/pages/user/member/editApplication?applyId=' + this.data.apply.id
		})
	},

	getData: function () {
		var that = this;
		app.request(
			app.globalData.grouponUrl + '/api/apply/get', "", {},
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
					apply: res.data.apply,
					credo: res.data.credo,
					phone: res.data.phone,
				})
			}
		)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getData();
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