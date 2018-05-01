//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎光临力度家园小区！',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  

  onLoad: function () {
    console.log('----------  index  onLoad --------------------')
    var Obj = wx.getStorageSync('Obj') || []
    console.log(Obj)
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })

    userInfo.openid=Obj.openid;  
    console.log('----------  index  onLoad 1111111111 userInfo--------------------')
    console.log(userInfo)
      wx.request({
        method: 'POST',
        url: 'https://www.donghl.cn/api/v1/user', //
        data: userInfo,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
        }
      })

    })
  },

  getPhoneNumber: function (e) {
    console.log('----------  index  getPhoneNumber --------------------')
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }, 

  onShow:function(){
  }
})
