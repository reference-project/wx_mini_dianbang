const app = getApp()
var webhost = app.globalData.webhost;
var getAddress;

Page({
	data: {
		region: ['请选择地址'],
		// addressId: '',
		name:'',//收货人姓名
		userId: '',
		telephone: '',
		address: '',//详细地址
		defAddress: 1,//是否为默认地址 0不是 1是
    isCollect:true,

	},
	// switch1Change: function (e) {
	// 	console.log('switch1 发生 change 事件，携带值为', e.detail.value)
	// 	//设置 是否默认地址
	// 	if(e.detail.value == true){
	// 		this.setData({
	// 			defAddress: 1
	// 		})
	// 	}else{
	// 		this.setData({
	// 			defAddress: 0
	// 		})
	// 	}
	// 	console.log('this.data.defAddress', this.data.defAddress)
	// },
  goClick: function (e) {
    var that = this;
    var bol = that.data.isCollect; // 获取状态
    that.setData({
      isCollect: !bol // 改变状态
    })
    if (bol == true) {
      this.setData({
        defAddress: 0
      })
    } else {
      this.setData({
        defAddress: 1
      })
    }
    console.log('this.data.defAddress', this.data.defAddress)
    console.log(bol);
  },

	setName: function (e) {
		this.setData({
			name: e.detail.value
		})
	},

	setPhone: function (e) {
		this.setData({
			telephone: e.detail.value
		})
	},

	setAddress: function (e) {
		this.setData({
			address: e.detail.value
		})
	},

	bindRegionChange: function (e) {
		console.log(e)
		this.setData({
			region: e.detail.value
		})
	},

	//添加 - 地址
	addAddress: function () {
		var that = this;
    if (that.data.name == "") {
      wx.showToast({
        title: '请填写收货人姓名',
        icon: 'none'
      });
      return;
    }
    if (that.data.telephone == "") {
      wx.showToast({
        title: '请填写收货人手机号',
        icon: 'none'
      });
      return;
    }
    if (that.data.region == '请选择地址') {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      });
      return;
    }
    // if (that.data.region[2] == "") {
    //   wx.showToast({
    //     title: '请选择地址',
    //     icon: 'none'
    //   });
    //   return;
    // }
    if (that.data.address == "") {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none'
      });
      return;
    }

		app.request(
			app.globalData.grouponUrl + '/api/user/add-address', "", {
				"address": that.data.address,
				// "addressId": that.data.id,
				"userId": that.data.userId,
				"province": that.data.region[0],
				"city": that.data.region[1],
				"area": that.data.region[2],
				"telephone": that.data.telephone,
				"name": that.data.name,
				"defAddress": that.data.defAddress
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

				wx.showToast({
					title: "添加地址成功！",
					icon: 'none',
				});

				wx.navigateTo({
					url: "/pages/user/member/address"
				})

			}
		)
	},

	onLoad: function (options) {
		var that = this;
		this.setData({
			userId: app.globalData.user.id,
		});

		//省市区 - 插件
		getAddress = () => {
			wx.request({
				url: webhost + "address/get/" + that.data.id,
				data: {},
				header: {
					token: app.globalData.Token
				},
				method: 'GET',
				success: function (res) {
					switch (+res.data.code) {
						case 0:
							if (res.data.data) {
								that.setData({
									address: res.data.data.address,
									region: [res.data.data.province, res.data.data.city, res.data.data.area],
									name: res.data.data.name,
									telephone: res.data.data.telephone,
								})
							}
							break;
						case 401:

							break;
						case 500:
							wx.showModal({
								title: '服务器好像出现问题了',
								content: res.data.msg,
								showCancel: false,
								confirmColor: '#4aa7fa'
							})
					}
				}
			})
		}

		if (options.id) {
			that.setData({
				id: options.id
			})
			wx.setNavigationBarTitle({
				title: '编辑地址'
			})
			getAddress();
		}

	},

	onShow: function () {

	}
})