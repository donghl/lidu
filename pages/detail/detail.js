// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
   text:"这是一个页面",
   array: [
     { name: 'Android', value: '1', checked: 'true' },
     { name: 'IOS-C', value: '2' },
     { name: 'ReactNative', value: '3' },
     { name: 'WeChat', value: '4' },
     { name: 'Web', value: '5' },
   ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('----------  detail onLoad --------------------')
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 经度
        var longitude = res.longitude // 纬度
        console.log(latitude);
        console.log(longitude);
      }
    })

    wx.request({
      method:'POST',
      url: 'https://www.donghl.cn/api/v1/login', //
      data: { "username": "aaa", "password": "12345678" },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
  },

  listenerRadioGroup:function(e) {
      console.log(e);
  },

  submit:function(e){
    console.log('-------------------- detail   submit --------------------')
    console.log(e);
    // wx.request({
    //   method: 'POST',
    //   url: 'https://www.donghl.cn/api/v1/login', //
    //   data: { "username": "aaa", "password": "12345678" },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },

  reset: function (e) {
    console.log('-------------------- detail   reset -------------------- ')
  },

  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }
  },
  
})

