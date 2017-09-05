//index.js

//获取应用实例
var app = getApp()
Page({
  data: {},
  //事件处理函数
 
  onLoad: function () { 
  },
  checkTap: function(e) {
   wx.navigateTo({
     url: '../announcement/announcement',
   })
  },
  advertiseTap: function(e) {
  wx.navigateTo({
    url: '../advertise/advertise',
  })
  },
  messageTap: function(e) {
   wx.navigateTo({
     url: '../message/message',
   })
  },
  modifyTap: function (e) {
    wx.navigateTo({
      url: '../changemessage/changemessage',
    })
  }
 
})
