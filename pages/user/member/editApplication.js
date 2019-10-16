const app = getApp()
var webhost = app.globalData.webhost;
var getAddress;

Page({
  data: {
    region: '',
    receiver: '',
    mobile: '',
    address: '',
    addressId: '',
    referrer: '',
    number: '',
    signature: '',
    mode: ['自提', '送货上门', '两者均可'],
    province: '',
    city: '',
    area: '',
    street: ''
  },

  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  setReceiver: function (e) {
    this.setData({
      receiver: e.detail.value
    })
  },
  setSignature: function (e) {
    this.setData({
      signature: e.detail.value
    })
  },
  setNumber: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  setReferrer: function (e) {
    this.setData({
      referrer: e.detail.value
    })
  },
  setPhone: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  setAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindModeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      region: options.address,
      province: options.province,
      city: options.city,
      area: options.area,
      street: options.street,
      id: options.applyId,
    })
    that.getData();

  },
  // 确认重新编辑
  edit: function () {
    var that = this;
    if (that.data.referrer == "") {
      wx.showToast({
        title: '请填写推荐人ID/手机号',
        icon: 'none'
      });
      return;
    }
    if (that.data.receiver == "") {
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      });
      return;
    }
    if (that.data.mobile == "") {
      wx.showToast({
        title: '请填写您的手机号',
        icon: 'none'
      });
      return;
    }
    if (that.data.number == "") {
      wx.showToast({
        title: '请填写您的身份证号',
        icon: 'none'
      });
      return;
    }
    if (that.data.province == undefined) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      });
      return;
    }
    if (that.data.address == "") {
      wx.showToast({
        title: '请填写小区名称',
        icon: 'none'
      });
      return;
    }
    if (that.data.index == undefined) {
      wx.showToast({
        title: '请选择提货方式',
        icon: 'none'
      });
      return;
    }
    if (that.data.signature == '') {
      wx.showToast({
        title: '请填写个性签名',
        icon: 'none'
      });
      return;
    }
    app.request(
      app.globalData.grouponUrl + '/api/apply/modify', "", {
        id: that.data.id,
        recommendId: that.data.referrer,
        name: that.data.receiver,
        phone: that.data.mobile,
        idCard: that.data.number,
        province: that.data.province,
        city: that.data.city,
        area: that.data.area,
        address: that.data.street,
        blockName: that.data.address,
        sign: that.data.signature,
        type: that.data.index,
      },
      function (res) {
        console.log(res.data)
        var data = res.data;
        if (!data.success) {
          wx.showToast({
            title: '编辑失败',
            icon: 'none'
          });
          return;
        }
        wx.showToast({
          title: "编辑成功!",
          icon: 'none',
        });
        that.getData();
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/user/member/userIndex'
          })
        }, 500)

      }
    )
  },
  // 重新编辑 获取数据
  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/apply/get', "", {
        id: that.data.id,
      },
      function (res) {
        console.log(res.data);
        let data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
          return;
        }

        that.setData({
          "address": data.apply.blockName,
          // "addressId": that.data.id,
          // "userId": that.data.userId,
          "province": data.apply.province,
          "city": data.apply.city,
          "area": data.apply.area,
          "street": data.apply.address,
          "region": [data.apply.province, data.apply.city, data.apply.area, data.apply.address],
          "number": data.apply.idCard,
          "receiver": data.apply.name,
          "mobile": data.apply.phone,
          "signature": data.apply.sign,
          "referrer": data.apply.recommendId,
          "index": data.apply.type


        })
      }
    )
  },
  goBMap: function () {
    wx.navigateTo({
      url: '/pages/bMap/bMap'
    })
  },
  onShow: function () {

  }
})