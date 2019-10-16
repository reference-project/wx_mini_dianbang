const Promise = require('/static/utils/wx-pro').Promise;
var wxToast = require('/static/toast/toast.js');
var gio = require("/static/utils/gio-minp.js");
// version 是你的小程序的版本号
// gio('init', 'ba4b4eea9268ca85', '	wxc2aba3276bc7954a', { version: '1.0', forceLogin: true });

App({
	wxToast,
	onLaunch: function () {
		console.log('App Launch');

		//获取用户openId
		this.getUserOpenId();

	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},

	globalData: {
		hasLogin: false,
		//本地环境
		//grouponUrl: "http://127.0.0.1:8044",

		//测试环境
		//grouponUrl: "http://47.99.240.206:9060",

		//模拟环境
		grouponUrl: "http://sp.dianbang365.com",

		//正式环境
		// grouponUrl: "http://pay.dianbang365.com",

		imgurl: "http://img.test.zhishangsoft.com/dianbang/images",
		user: {},//id: '2',sysToken: '143a0c0de9e6a64b2bc5dbc755c4ea9b'
		dFromPic: '',
		dFromPicUrl: '',
		userUnionIdKey: 'userUnionIdKey',
		userOpenIdKey: 'userOpenIdKey',
    	openId:"",
		sessionKey: '',
		code:'',
		credoId:0,
		wxOpenId:'',
		nickName:'',
		avatarUrl:'',
	},

	//获取用户openId
	getUserOpenId: function () {
		var _this = this;
		wx.login({
			success: function (res) {
				console.log("wxlogin success - get - openId");
        _this.globalData.code = res.code;
				if (res.code) {
					//发起网络请求
					wx.pro.request({
            url: _this.globalData.grouponUrl + '/api/login/wxLogin',
						data: {code: res.code},
					}).then(data => {
						console.log("获取用户openId：" + data);
						gio("identify", data.data.openid, '');
						//赋值
						_this.globalData.sessionKey = data.data.sessionKey;
            			_this.globalData.openId = data.data.openid;
						//将openId存到session中
						wx.setStorageSync(_this.globalData.userOpenIdKey, data.data.openid);
						//未获取到unionId 先去主动授权获取unionId
						if (!data.data.unionid) {
							console.log('未获取到unionId 先去主动授权获取unionId');
							wx.reLaunch({
								url: '/pages/index/login/login'
							});
							return;
						}
						//将unionid存到session中
						wx.setStorageSync(_this.globalData.userUnionIdKey, data.data.unionid);
						//根据openId 获取用户数据
						// _this.getUserApiByOpenId(data.data.unionid);
					}).catch(err => {

          })
        }
      }
    });
  },

	//根据openId 获取用户数据
	getUserApiByOpenId: function (unionId) {
		var _this = this;
		wx.pro.request({
      url: _this.globalData.grouponUrl + '/api/login/get-user',
			method: 'GET',
			data: {
				unionId: unionId,
		        code:_this.globalData.code,
		        credoId: _this.globalData.credoId,
		        openId: _this.globalData.wxOpenId,
		        nickName: _this.globalData.nickName,
		        avatarUrl: _this.globalData.avatarUrl,
			}
		}).then(data => {
			console.log("unionid 登录");
			console.log(data.data.user);
			if (data.data.user) {
				console.log('将用户存入全局变量');
				//将用户存入全局变量
				_this.globalData.user = data.data.user;
				//如果已经选择过团长跳转首页
				if (data.data.user.lastCredoId == 0) {
					wx.navigateTo({
						url: '/pages/user/chief/select'
					})
				} else {
					wx.reLaunch({
						url: '/pages/index/index'
					})
				}
			}
		}).catch(err => {
			// 网络错误、或服务器返回 4XX、5XX

    });
  },

  //请求封装
  request: function (url, contentType, postData, doSuccess, doFail, doComplete) {
    var user = this.globalData.user;
    var token = '';
    var userId = '';
    if (contentType == "") {
      contentType = "application/x-www-form-urlencoded"
    }
    if (user.id) {
      userId = user.id;
    }
    if (user.sysToken) {
      token = user.sysToken;
    }
    wx.request({
      url: url,
      data: postData,
      method: 'GET',
      header: {
        'content-type': contentType,
        'userId': userId,
        'Authorization': token
      },
      success: function (res) {
        if (typeof doSuccess == "function") {
          doSuccess(res);
        }
      },
      fail: function (res) {
        if (typeof doFail == "function") {
          doFail(res);
        }
      },
      complete: function (res) {
        if (typeof doComplete == "function") {
          doComplete(res);
        }
      }
    });
  },
  // 上传图片
  chooseImage: function (doSuccess) {
    let _this = this;
    wx.chooseImage({
      count: 1,
      success: function (res1) {
        let tempFilePaths = res1.tempFilePaths;
        wx.uploadFile({
          url: _this.globalData.serviceUrl + '/ajaxfileupload',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res2) {
            let data = JSON.parse(res2.data)
            if (typeof doSuccess != "function") {
              return;
            }
            if (!data.success) {
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              });
              return;
            }
            doSuccess(data);
          }
        })
      }
    });
  },

});
