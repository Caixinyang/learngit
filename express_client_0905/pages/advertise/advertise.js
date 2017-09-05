
var app = getApp();

Page({
  data:{
    title: '',
    text: '',
    author: null,
    time: null,
    touxiang:null
  },
  //事件
  textBlur: function (e) {
    console.log("textBlur");
    if (e.detail && e.detail.value.length > 0) {
      if (e.detail.value.length < 12 || e.detail.value.length > 500) {
        //app.func.showToast('内容为12-500个字符','loading',1200);
      } else {
        this.setData({
          text: e.detail.value
        });
      }
    } else {
      this.setData({
        text: ''
      });
    }

  },
  //
  titleBlur: function (e) {
    console.log("titleBlur");
    if (e.detail && e.detail.value.length > 0) {
      if (e.detail.value.length < 12 || e.detail.value.length > 500) {
        //app.func.showToast('内容为12-500个字符','loading',1200);
      } else {
        this.setData({
          title: e.detail.value
        });
      }
    } else {
      this.setData({
        title: ''
      });
    }

  },
  //提交事件
  evaSubmit: function (e) {
    console.log("evaSubmit");
    //console.log(e.detail.value);
    this.setData({
      title: e.detail.value.title,
      text: e.detail.value.text,
      //author: "蔡信扬",
     // time: "2017-08-30"

    });
    console.log(this.data);
  var that = this

    wx.request({
      url: 'http://www.ownersbuild.com:3000/', //仅为示例，并非真实的接口地址
      data: {
        author:this.data.author,
        time: this.data.time,
        title: e.detail.value.title,
        text: e.detail.value.text,
        touxiang: this.data.touxiang
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (JSON.stringify(res.data).match('success')) {
          // 显示模态弹窗  
          wx.showModal({
            title: '发布状态',
            content: '发布成功，请点击确定查看吧',
            success: function (res) {
              if (res.confirm) {
                // 点击确定后跳转登录页面并关闭当前页面  
                wx.redirectTo({
                  url: '../message/message'
                })
              }
            }
          })
        }
        else {
          // 显示消息提示框  
          wx.showToast({
            title: "发布失败",
            icon: 'error',
            duration: 2000
          })
        }
      }


    }) 


  //提交(自定义的get方法)
  //app.func.req('http://localhost:1111/ffeva/complaint?content=''+this.data.evaContent),get,function(res){
            //console.log(res);
    //if (res.result === '1') {
      //跳转到首页
    //  app.func.showToast('提交成功', 'loading', 1200);
    //} else {
    //  app.func.showToast('提交失败', 'loading', 1200);
   // }
  //});
  //}
  },
  onLoad:function (options){
    // 页面初始化 options为页面跳转所带来的参数
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);  
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log(date.toDateString());  
    this.setData({
      time: date.toDateString()
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        author: userInfo.nickName,
        touxiang: userInfo.avatarUrl
      })
    })

    },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})