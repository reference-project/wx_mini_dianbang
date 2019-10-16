const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    amount: 1,
    normalList:[],
    // productList: [
    //   {
    //     name: '芙丽芳丝莹珠百合匀净亮肤洁面乳200ml洗面奶',

    //   },
    //   {
    //     name: '芙丽芳丝莹珠百合匀净亮肤洁面乳200ml洗面奶',

    //   }
    // ],
    totalPrice: '',
    delWidth: 45, //删除按钮宽度单位（rpx）
    selectAll: true,
    total:0,
    totalPic:0,
    cartItemIds:0,
    serialNumber:'',
    startX: 0,
    left:0,
  },

  addClick: function (e) {
    if (this.data.iSspecial == 1) {
      return false;
    }
    var number = e.currentTarget.dataset.number+1;
    var id = e.currentTarget.dataset.id;
    var pro = e.currentTarget.dataset.pro;
    // this.computedTotal(number, pro);
    this.update(number, id);
  },

  minusClick: function (e) {
    var number = e.currentTarget.dataset.number-1;
    var id = e.currentTarget.dataset.id;
    if (number < 1) {
      number = 1;
    }
    this.update(number, id);
  },
  // 商品选中与否
  setCheck: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var itemList = that.data.normalList;
    if (itemList[index].checked) {
      itemList[index].checked = false;
    } else {
      itemList[index].checked = true;
    }
    that.setData({
      normalList: itemList
    })
    that.select();
  },

  select() {
    var that = this;
    var list = that.data.normalList;
    var Ids = 0;
    var totalPic = 0;
    var cartItemIds = 0;
    for (var i = 0; i < list.length; i++) {
      if (!list[i].checked) {
        Ids++;
        that.setData({
          cartItemIds: 0
        })
      }else{
        totalPic += list[i].productPriceSale * list[i].quantity;
        cartItemIds = that.data.cartItemIds + "," + list[i].id;
        that.setData({
          cartItemIds: cartItemIds
        })
      }
    }
    that.setData({
      selectAll: Ids > 0 ? true : false,
      totalPic: totalPic,
    })
  },

  selectAlls(e) {
    var that = this;
    var list = that.data.normalList;
    var totalPic = 0;
    var cartItemIds = 0;
    if (that.data.selectAll) {
      for (var i = 0; i < list.length; i++) {
        list[i].checked = true
        totalPic += list[i].productPriceSale * list[i].quantity;
        cartItemIds = that.data.cartItemIds + "," + list[i].id;
        that.setData({
          cartItemIds: cartItemIds
        })
      }
      that.setData({
        normalList: list,
        selectAll: false,
        totalPic: totalPic,
      })
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].checked = false
      }
      that.setData({
        normalList: list,
        selectAll: true,
        totalPic:0,
        cartItemIds : 0,
      })
    }
  },
  //手指刚放到屏幕触发
  touchStart: function (e) {
    //判断是否只有一个触摸点
    this.setData({
      //记录触摸起始位置的X坐标
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    });
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    var that = this
    //记录触摸点位置的X坐标
    var moveX = e.touches[0].clientX;
    //计算手指起始点的X坐标与当前触摸点的X坐标的差值
    var disX = that.data.startX - moveX;
    var index = e.currentTarget.dataset.index;
    var list = that.data.normalList;

    var delWidth = that.data.delWidth;
    if (list[index].left > delWidth) {
      return false;
    }
    var left = 0;
    if (disX == 0) { //如果移动距离小于等于0，文本层位置不变
      return false;
    } else if (disX < 0) {
      list[index].left = list[index].left + disX;
      if (-disX >= delWidth) {
        //控制手指移动距离最大值为删除按钮的宽度
        list[index].left = 0;
      }
    } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
      list[index].left = disX;
      if (disX >= delWidth) {
        //控制手指移动距离最大值为删除按钮的宽度
        list[index].left = delWidth;
      }
    }
    //更新列表的状态
    that.setData({
      normalList: list
    });
  },
  touchE: function (e) {
    var that = this
    //手指移动结束后触摸点位置的X坐标
    var endX = e.changedTouches[0].clientX;
    //触摸开始与结束，手指移动的距离
    var disX = that.data.startX - endX;
    var delWidth = that.data.delWidth;
    var index = e.currentTarget.dataset.index;
    var list = that.data.normalList;
    if (disX == 0) {
      return false;
    }
    //如果距离小于删除按钮的1/2，不显示删除按钮
    if (disX > (delWidth / 2)) {
      for (var i = 0; i < list.length; i++) {
        list[i].left = 0;
      }
      list[index].left = delWidth;
    } else {
      list[index].left = 0;
    }
    // var left = disX > (delWidth / 2) ? delWidth : 0;
    //获取手指触摸的是哪一项

    //更新列表的状态
    that.setData({
      normalList: list
    });
  },
  back(dis) {
    if (dis > 20) {
      that.setData({
        dis: dis - 5
      })
      topFun(that.data.dis);
    }
    if (dis < -20) {
      that.setData({
        dis: dis + 5
      })
      topFun(that.data.dis);
    }
    if (dis < 20 && dis > -20) {
      that.setData({
        dis: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getData();
  
  },
  //获取商品详情
  getData: function () {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/cart/list', "", {
        cartType: 0,
        os: 0,
      },
      function (res) {
        console.log(res.data)
        var data = res.data;
        if (!data.success) {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          });
          return;
        }
        var list = res.data.normalList;
        for (var i = 0; i < list.length; i++) {
            list[i].left = 0;
        }
        that.setData({
          normalList: list,
        })
      }
    )
  },

  update: function (number, id) {
    var that = this
    app.request(
      app.globalData.grouponUrl + '/api/cart/update', "", {
        quantity: number,
        id: id,
        cartType: 0
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
        that.getData();
      }
    )
  },
//删除购物车
  delet: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    app.request(
      app.globalData.grouponUrl + '/api/cart/delete', "", {
        id: id,
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
          title: '删除成功',
          icon: 'none'
        });
        that.getData();
      }
    )
  },
//去结算
  payClick: function (e) {
    var that = this
    if (that.data.cartItemIds == 0){
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      });
      return;
    }
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    that.setData({
      serialNumber: timestamp
    }) 
    app.request(
      app.globalData.grouponUrl + '/api/cart/confirm-order', "", {
        cartItemIds: that.data.cartItemIds,
        serialNumber: timestamp,
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
        wx.navigateTo({
          url: '../user/member/confirmOrder?serialNumber=' + that.data.serialNumber
        })
      }
    )
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