const app = getApp()
var webhost = app.globalData.webhost;
Page({
  data: {
    region: [''],
    addressId: '',
    name: '',//收货人姓名
    userId: '',
    telephone: '',
    address: '',//详细地址
    defAddress: '',//是否为默认地址 0不是 1是
    isCollect:'',
    address:[],

  },
  // switch1Change: function (e) {
  //   console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  //   //设置 是否默认地址
  //   if (e.detail.value == true) {
  //     this.setData({
  //       defAddress: 1
  //     })
  //   } else {
  //     this.setData({
  //       defAddress: 0
  //     })
  //   }
  //   console.log('this.data.defAddress', this.data.defAddress)
  // },
  goClick:function(e){
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
  editAddress: function () {
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
    if (that.data.address == "") {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none'
      });
      return;
    }

    app.request(
      app.globalData.grouponUrl + '/api/user/mod-address', "", {
        "address": that.data.address,
        "id": that.data.addressId,
        "userId": that.data.userId,
        "province": that.data.region[0],
        "city": that.data.region[1],
        "area": that.data.region[2],
        "telephone": that.data.telephone,
        "name": that.data.name,
        // "address": that.data.defAddress
      },
      function (res) {
        console.log(res.data)
        var data = res.data;
        if (!data.success) {
          wx.showToast({
            title: '编辑地址失败',
            icon: 'none'
          });
          return;
        }
        wx.showToast({
          title: "编辑地址成功!",
          icon: 'none',
        });
        that.getData();
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/user/member/address'
          })
        }, 800)  

      }
    )
  },

  getData: function () {
    let that = this;
    app.request(
      app.globalData.grouponUrl + '/api/user/get-address', "", {
        addressId: that.data.addressId,
        userId: that.data.userId
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
          "address": data.address.address,
            // "addressId": that.data.id,
            // "userId": that.data.userId,
            // "province": data.address.province,
            // "city": data.address.city,
            // "area": data.address.area,
            "region": [data.address.province, data.address.city, data.address.area,],
            "telephone": data.address.telephone,
            "name": data.address.name,
            "defAddress": data.address.defAddress
          })
        var bol = that.data.isCollect;
        if (data.address.defAddress == 1) {
          that.setData({
            bol: true,
          })
        } else {
          that.setData({
            bol: false,
          })
        }
      }
    )
  },
  // 删除地址
  del(e) {
    var that = this;
    console.log(that.data.addressId);
    app.request(
      app.globalData.grouponUrl + '/api/user/del-address', "", {
        addressId: that.data.addressId,
      },
      function (res) {
        var data = res.data;
        console.log(res.data)
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          });
          return;
        }
        that.setData({
          address: res.data.address
        })
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        });
        that.getData();
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/user/member/address'
          })
        },800)  
      }
    )
  },

  onLoad: function (options) {
    var that = this;
    this.setData({
      userId: app.globalData.user.id,
      addressId: options.id
    });
    that.getData();
  },
})