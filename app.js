//app.js
App({
  onLaunch: function() {
    console.log("初始化成功!")
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)


    wx.login({
      success: function (loginCode) {
        var appid = ''; //填写微信小程序appid  
        var secret = ''; //填写微信小程序secret  

        //调用request请求api转换登录凭证  
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success: function (res) {
        //     console.log(res.data) //获取openid  
        //   }
        // })  

        wx.getUserInfo({
          success: function (res) {
            var simpleUser = res.userInfo;
            console.log(res);
            console.log(simpleUser.nickName);
          }
        });
      }
    });

    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求  
    //       console.log('1111111111111')
    //       console.log(res)
    //     } else {
    //       console.log('222222222222')
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });  

  },
  onShow: function(){
    console.log("onShow!")
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },


  globalData: {
    userInfo: null
  }
})
