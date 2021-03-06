// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('---------- form --------------------')
    var Obj = wx.getStorageSync('Obj') || []
    console.log(Obj);
    this.setData({
      openid:Obj.openid
    })
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
  
  },
  chooseImage:function(){
    var that = this;

    that.setData({
      progress: 0
    })

    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)

        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        console.log(that.data.openid);

        var uploadImgCount = 0;  
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {  
          const uploadTask = wx.uploadFile({
            url: 'https://www.donghl.cn/upload-single', //仅为示例，非真实的接口地址 
            filePath: tempFilePaths[i],
            name: 'myfile',
            formData: {
              'openid': that.data.openid
            },
            header: {
              "Content-Type": "multipart/form-data"
            },  
            success: function (res) {
              uploadImgCount++;
              var data = res.data
              //do something
              console.log(data)
              console.log(res.statusCode)
              if (res.statusCode != 200){
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) { 
                  }
                })
              }
            }
          })

          uploadTask.onProgressUpdate((res) => {
            console.log('上传进度', res.progress),
              that.setData({
                progress: res.progress
              })
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
          })

        }
      }
    })
  },


  getOpenIdTap:function(){
    console.log('getOpenIdTap');
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
              var simpleUser = res.userInfo;
              console.log(res);
              console.log(simpleUser.nickName);

              wx.request({
                method: 'GET',
                url: 'https://www.donghl.cn/api/v1/wx',
                data: { code, appid, secret},
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data) //获取openid  
                  that.setData({
                    openid: res.data.data.openid,
                    session_key: res.data.data.session_key
                  })
                }
              })
            }
          });
        }
      }
    });
  },
})