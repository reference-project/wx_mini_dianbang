// pages/user/member/pickUp.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'',
    tabIndex: 1,
    amount: 1,
    selectAll: true,
    list:[],
    items:[],
    obtainCodes:'',
  },
  // 前往商品详情
  goProduct:function(e){
    var that = this;
    var id = e.currentTarget.dataset.productid;
    wx.navigateTo({
      url: '/pages/index/productDetail?id=' + id
    })
  },
  // 商品选中与否
  setCheck: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.list;
    if (list[index].checked) {
      list[index].checked = false;
    } else {
      list[index].checked = true;
    }
    that.setData({
      list: list
    })
    that.select();
    // count();
  },
// 选择
  select() {
    var that = this;
    var list = that.data.list;
    var Ids = 0;
    var lengthList = 0;
    var codes = '';
    for (var i = 0; i < list.length; i++) {
      // debugger;
      if (list[i].state == 35){
        lengthList++
        if (list[i].checked == true) {
          codes += list[i].obtainCode + ",";
          Ids++;
      }
  
      }
      // if(list[i].state == 35){
      //   lengthList++;
      // }
    }
    if (codes != '') {
      that.obtainCodes = codes.substring(0, codes.length - 1);
    }
    console.log(Ids);
    console.log(lengthList)
    if (lengthList == Ids){
      that.setData({
        selectAll: false
      })
    }else{
      that.setData({
        selectAll: true
      })
    }
      
   
  },
// 全选
  selectAlls(e) {
    var that = this;
    var list = that.data.list;
    var lengthList = 0;
    if(list.length <= 0){
      wx.showToast({
        title: "暂无提货商品",
        icon: 'none',
      });
      return;
    }
    if (that.data.selectAll) {
      var codes = '';
      for (var i = 0; i < list.length; i++ ) {
        if(list[i].state==35){
          list[i].checked = true;
          codes += list[i].obtainCode + ",";
        }
      }
      if (codes != ''){
        that.obtainCodes = codes.substring(0, codes.length - 1);
      }
      that.setData({
        list: list,
        selectAll: false
      })
    } else {
      for (var i = 0; i < list.length; i++) {
        if (list[i].state == 35) {
          list[i].checked = false
        } else if (list[i].state == 30) {
          console.log(list[i].checked)
        }
      }
      that.obtainCodes = '';
      that.setData({
        list: list,
        selectAll: true
      })
    }
    console.log()
  },
  /**
   * 获取列表
   */
    getData: function () {
      let that = this;
      app.request(
        app.globalData.grouponUrl + '/api/order/list-pick-up', "", {
          credoId: that.data.credoId,
          obtainCode: that.data.obtainCode,
        },
        function (res) {
          console.log(res.data)
          let data = res.data;
          if (!data.success) {
            wx.showToast({
              title: res.data.info,
              icon: 'none',
            });
            return;
          }
          that.setData({
            list: res.data.list
          })
          // var listIndex = that.data.list.length;
          // res.data.list.forEach(function (value, index, list) {
          //   var key = "list[" + listIndex + "]";
          //   that.setData({
          //     [key]: value,
          //   });
          //   listIndex++;
          // });
        }
      )
  },
  /**
   * 确认提货
   */
  pickUp:function(){
    var that = this;
    // var list = that.data.list;
    if (that.obtainCodes == '') {
      wx.showToast({
        title: "请勾选要提货的商品",
        icon: 'none',
      });
      return;
    }
    console.log(that.data.addressId);
    app.request(
      app.globalData.grouponUrl + '/api/order/pick-up', "", {
        credoId: that.data.credoId,
        obtainCodes: that.obtainCodes,
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
          list: res.data.list
        })
        wx.showToast({
          title: '提货成功',
          icon: 'none'
        });
        that.getData();
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/user/chief/colonelIndex'
          })
        }, 800)
      }
    )

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      credoId: options.credoId,
      obtainCode: options.obtainCode,

    });
    that.getData();
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