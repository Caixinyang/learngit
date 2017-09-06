//index.js

//获取应用实例
var app = getApp()
Page({
  data: {},
  //事件处理函数

  onLoad: function () {
  },
  voteTap: function (e) {
    wx.navigateTo({
      url: '../vote_index/vote_index',
    })
  },
  advertiseTap: function (e) {
    wx.navigateTo({
      url: '../message/message',
    })
  },

})
