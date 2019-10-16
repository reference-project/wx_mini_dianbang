//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		tabIndex: 0,
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		popup: true,
		credo: {},
		lastCredoId: '',
		activity: {},
		activity2: {},
		flag: '',
		items: [],
		items2: [],
		ad: '',
    limitTime1:''
	},


	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},

	// 跳转商品详情
	goDetails: function (e) {
		var that = this
		var id = e.currentTarget.dataset.id;
		var activityId = e.currentTarget.dataset.activity;
		wx.navigateTo({
			url: '../index/productDetail?id=' + id + "&activityId=" + activityId
		})
	},

	goSelect: function (e) {
		wx.navigateTo({
			url: '/pages/user/chief/select'
		})
	},

	// 滑动时候判断是否显示按钮
	onPageScroll: function (e) {
		if (e.scrollTop > wx.getStorageSync("windowHeight")) {
			this.setData({
				"popup": false
			});
		} else {
			this.setData({
				"popup": true
			});
		}
		console.log(e);
	},

	onLaunch: function () {
		//获取手机信息
		wx.getSystemInfo({
			success: function (res) {
				wx.setStorageSync("windowHeight", res.windowHeight);
			},
		})

	},

	goScrolltop: function (e) {
		if (wx.pageScrollTo) {
			wx.pageScrollTo({
				scrollTop: 0
			})
		} else {
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
	},

	onLoad: function (options) {
		this.setData({
			lastCredoId: app.globalData.user.lastCredoId,
		});
		this.getCredo();
		this.getActivity();

		// if (app.globalData.userInfo) {
		//   this.setData({
		//     userInfo: app.globalData.userInfo,
		//     hasUserInfo: true
		//   })
		// } else if (this.data.canIUse){
		//   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		//   // 所以此处加入 callback 以防止这种情况
		//   app.userInfoReadyCallback = res => {
		//     this.setData({
		//       userInfo: res.userInfo,
		//       hasUserInfo: true
		//     })
		//   }
		// } else {
		//   // 在没有 open-type=getUserInfo 版本的兼容处理
		//   wx.getUserInfo({
		//     success: res => {
		//       app.globalData.userInfo = res.userInfo
		//       this.setData({
		//         userInfo: res.userInfo,
		//         hasUserInfo: true
		//       })
		//     }
		//   })
		// }
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.setData({
			lastCredoId: app.globalData.user.lastCredoId,
		});
	},
	getCredo: function () {
		var that = this
		app.request(
			app.globalData.grouponUrl + '/api/credo/get', "", {
				id: that.data.lastCredoId
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
				that.setData({
					credo: res.data.credo,
					ad: res.data.ad
				})
			}
		)
	},

	getActivity: function () {
		var that = this
		app.request(
			app.globalData.grouponUrl + '/api/activity/query', "", {
				credoId: that.data.lastCredoId
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

				var msgIndex = that.data.items.length;
				res.data.list.forEach(function (value, index, list) {
					var key = "items[" + msgIndex + "]";
					that.setData({
						[key]: value,
					});
					msgIndex++;
				});

				var limitTime = that.countdown(res.data.activity.limitTime)
				that.setData({
					activity: res.data.activity,
					flag: res.data.flag,
				});

				var msgIndex = that.data.items2.length;
        res.data.list2.forEach(function (value, index, list) {
					var key = "items2[" + msgIndex + "]";
					that.setData({
						[key]: value,
					});
					msgIndex++;
				});

        var limitTime1 = that.countdown2(res.data.activity1.limitTime)
				that.setData({
					activity: res.data.activity,
					activity2: res.data.activity1,
					flag: res.data.flag,
				})
			}
		)
	},

	countdown: function (limitTime) {
		var _this = this;
		setInterval(function () {
			let s = limitTime / 1e3
			let e = parseInt(s / 3600), //总小时数 1
				e2 = parseInt(s % 3600), // 100S
				t = parseInt(e2 / 60), //总分钟数 1
				t2 = parseInt(e2 % 60)//40S
			if (limitTime <= 0) {
				e = 0
				t = 0
				t2 = 0
			} else {
				limitTime -= 1e3
			}
			if (t2 < 10) {
				t2 = '0' + t2;
			}
			let c = (e < 10 ? '0' : '') + e + ":" + (t < 10 ? '0' : '') + t + ":" + t2;
			_this.setData({
				limitTime: c
			})
		}, 1e3);
	},
  countdown2: function (limitTime) {
    var _this = this;
    setInterval(function () {
      let s = limitTime / 1e3
      let e = parseInt(s / 3600), //总小时数 1
        e2 = parseInt(s % 3600), // 100S
        t = parseInt(e2 / 60), //总分钟数 1
        t2 = parseInt(e2 % 60)//40S
      if (limitTime <= 0) {
        e = 0
        t = 0
        t2 = 0
      } else {
        limitTime -= 1e3
      }
      if (t2 < 10) {
        t2 = '0' + t2;
      }
      let c = (e < 10 ? '0' : '') + e + ":" + (t < 10 ? '0' : '') + t + ":" + t2;
      _this.setData({
        limitTime1: c
      })
    }, 1e3);
  },
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}
})
