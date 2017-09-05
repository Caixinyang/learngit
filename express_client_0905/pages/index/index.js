//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '猛戳头像',
    userInfo: {},
    encryptedData: "",
  },
  //事件处理函数
  bindViewTap: function () {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
      }

    })
    //判断是否注册过！
    var that=this;
    //console.log(count);
    var value = wx.getStorageSync('count');
    if(value!="ok")//没有注册过
    {
    wx.navigateTo({
      url: '../register/register'
    })
    }
    else{//注册过了，看有没有权限进去看公告，通过请求服务器查看手机号对应的权限进行判断
      //首先从缓存里面读到手机号码
      wx.getStorage({
        key: 'phone',
        success: function(res) {
          wx.request({
            url: 'http://www.ownersbuild.com:3000/check', //仅为示例，并非真实的接口地址
            data: {
              phone:res.data
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if(res.data.status=="1")
              {
                wx.showModal({
                  title: '审核状态',
                  content: '请耐心等待管理员进行审核',
                })
              }
              else if (res.data.status == "2")
              {
                wx.navigateTo({
                  url: '../message/message'
                })
              }
              else if (res.data.status == "-1"){
                wx.showModal({
                  title: '审核状态',
                  content: '发生未知错误，请重试',
                })
              }
              else{
                wx.showModal({
                  title: '审核状态',
                  content: '已拉黑',
                })
              }
            }
          })
        },
      })
      
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, encryptedData) {
      //更新数据
      that.setData({
        userInfo: userInfo,

      })
      that.setData({
        encryptedData: encryptedData

      })
      var manage = "蔡信掦🐑"
      if (userInfo.nickName == "蔡信掦🐑") {
        wx.navigateTo({
          url: '../manage/manage'
        })
      }
      
      console.log(userInfo.nickName == "蔡信掦🐑")
    })
  }
})
