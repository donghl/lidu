//app.js
App({
  onLaunch: function() {
    console.log("初始化成功!")
    console.log("-----------------app  onLaunch -----------------");

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.Init();
  },

  onShow: function(){
    console.log("onShow!")
  },

  Init:function(e){
    console.log('----------------- app Init ----------------- ')
    var that = this; 

    wx.login({
      success: function (res) {
        var appid = 'wxf3a5ff254b032068'; //填写微信小程序appid  
        var secret = 'c6df8a093125033437ceb82e7d5ddc34'; //填写微信小程序secret  
        console.log(res.code);

        if (res.code) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              // var simpleUser = res.userInfo;
              // console.log(res);
              // console.log(simpleUser.nickName);

              wx.request({
                method: 'GET',
                url: 'https://www.donghl.cn/api/v1/wx',
                data: { code, appid, secret },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data) //获取openid  
                  wx.setStorageSync('Obj', res.data.data)
                }
              })
            }
          });
        }
      }
    });
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
