let app = getApp();
Component({
  data: {
    userMessage: 0,
    interestCardItemId: '',
  },
  properties: {
    tabIndex: {
      type: Number,
    }
  },
  methods: {
    goIndex: function () {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    },
    goCar: function () {
      wx.redirectTo({
        url: '/pages/mall/car'
      })
    },
    goMyIndex: function () {
      wx.redirectTo({
        url: '/pages/user/member/userIndex'
      })
    },


  }
})