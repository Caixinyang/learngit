var app = getApp();
Page({
  data:{
    title: '',
    text: '',
    author: null,
    time: null,
    touxiang:null,
    access_token:null,
    array:[],
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
    var thatpage=this;
    console.log("evaSubmit");
    this.setData({
      title: e.detail.value.title,
      text: e.detail.value.text,
      //author: "蔡信扬",
     // time: "2017-08-30"

    });
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
    //发送通告
    //拿到fId
    var fId = e.detail.formId;
    var array=[];
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + this.data.access_token;
    //发送通告到每一个已经通过的人身上！！！
    var d = {
      touser:"",
      template_id: 'HA4yFrb2Hi3n6NGbzh-gMdb8-mrD29s3pSHbmN8JMiU',//这个是1、申请的模板消息id，  
      page: '/pages/message/message',
      form_id: fId,
      data: {//测试完发现竟然value或者data都能成功收到模板消息发送成功通知，是bug还是故意？？【鄙视、鄙视、鄙视...】 下面的keyword*是你1、设置的模板消息的关键词变量  

        "keyword1": {
          "value": e.detail.value.title, 
        
        },
        "keyword2": {
          "value": this.data.author, 
        
        },
        "keyword3": {
          "value": this.data.time, 
         
        },
        color: '#ccc',
        emphasis_keyword: 'keyword1.DATA'
      }
    };
    wx.request({
      url: 'http://www.ownersbuild.com:3000/openid',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      //拿到需要发送的openid
      success: function (res) {
       for (let i = 0; i<res.data.length;i++){
         d.touser=res.data[i];
      wx.request({
         url: l,
         data: d,
         method: 'POST',
         success: function (res) {
         console.log("push msg");
         console.log(res);
         },
         fail: function (err) {
        // fail  
         console.log("push err")
         console.log(err);
                }
             })
         };
      }
    });
    
  },
  onLoad:function (options){
    // 页面初始化 options为页面跳转所带来的参数
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
  
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    this.setData({
      time: date.toDateString()
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        author: userInfo.nickName,
        touxiang: userInfo.avatarUrl
      })
    })
    //拿到access_token
    var appid = "wxc646ed8048062646";
    var secret = "d0b4d738eed9ce201d68432d2661d439";
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
      method: 'GET',
      success: function (res) {
        that.setData({
          access_token: res.data.access_token
        })
      }
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