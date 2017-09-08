//app.js
App({
  data: {
    deviceInfo: {},
    comment_time: null,
    comment_titie: null,
    openid:null,
  },
  onLaunch: function() {
    //test
    this.data.deviceInfo = wx.getSystemInfoSync();
    console.log(this.data.deviceInfo);
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //拿到open-id
    var that = this;
    wx.login({
      success: function (res) {//1、登录成功会回调一个code
        //打印一下code
        //console.log(res.code);
        var js_code = res.code;
        if (res.code) {
          //2、发起网络请求，把code传过去给服务器！
          wx.request({
            url: 'http://www.ownersbuild.com:3000/login',
            data: {
              code: res.code
            },
            method: 'POST'
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
        //3、code用换session_key
        console.log(js_code);
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session'
          + '?appid=wxc646ed8048062646'
          + '&secret=d0b4d738eed9ce201d68432d2661d439'
          + '&js_code='
          + js_code +
          '&grant_type=authorization_code',
          method: 'POST',
          success: function (res) {
            console.log("开始获取session_key");
            console.log(res);
            //缓存！！
            wx.setStorage({
              key: "openid",
              data: res.data.openid
            });
            var openid=res.data.openid;
          that.globalData.openid=openid;
            //发送openid
            wx.getUserInfo({
              withCredentials: true,
              success: function (res) {
                if (res.encryptedData) {
                  wx.request({
                    url: 'http://www.ownersbuild.com:3000/login',
                    data: {
                      openid: openid
                    },
                    method: 'POST'
                  })
                }
                else {
                  console.log('获取密文失败！' + res.errMsg)
                }

              }
            });
          }
        })
      }
    });
    //调用登录接口，发送密文
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        if (res.encryptedData) {
          wx.request({
            url: 'http://www.ownersbuild.com:3000/login',
            data: {
              encryptedData: res.encryptedData
            },
            method: 'POST'
          })
        }
        else {
          console.log('获取密文失败！' + res.errMsg)
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
    userInfo: null,
    comment_time: null,
    comment_titie: null,
    openid:null
  }
})
