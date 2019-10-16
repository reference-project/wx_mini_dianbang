// pages/user/address.js
const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userId: '',
		list:[],
    id:'',
    addressId:'',
	},
  edit:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/user/member/editAddress?id=' + id
    })
  },
	//获取 - 收件地址列表
	getAddresses: function () {
		var that = this;
		app.request(
			app.globalData.grouponUrl + '/api/user/get-addresses', "", {
				userId: that.data.userId
			},
			function (res) {
				console.log("获取地址集合"+res.data);
				var data = res.data;
				if (!data.success) {
					wx.showToast({
						title: res.data.info,
						icon: 'none'
					});
					return;
				}

				var length = that.data.list.length;
				res.data.list.forEach(function (value, index, list) {
					var key = "list[" + length + "]";
					that.setData({
						[key]: value,
					});
					length++;
				});
			}
		)
	},


	add: function () {
		wx.navigateTo({
			url: '/pages/user/member/addAddress'
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    if (options.serialNumber != undefined){
      this.setData({
        serialNumber: options.serialNumber
      });
    }
		this.setData({
			userId: app.globalData.user.id,
		});
		//获取用户信息
		this.getAddresses();
	},
  goOrder:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/user/member/confirmOrder?addressId=' + id + "&serialNumber=" + this.data.serialNumber
    })
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

})