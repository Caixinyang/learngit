Page({
    data: {
        optionList: [
            {
                icon: ''
            },
            {
                icon: ''
            }
        ],

        showAddBtn: 1,

        date: "2017-09-01",
        time: "12:01",

        voteType: ['单选', '多选，最多2项', '多选，无限制'],
        voteTypeIndex: 0,

        files: [],

        voteTitle:"",
        voteText:"",

    },
    updateVoteType: function (){
        let _optionList = this.data.optionList;
        let _voteType = this.data.voteType;

        _voteType = [];

        _optionList.map(function (obj, i) {

            if (i === 0){
                _voteType.push('单选');
            }else {
                _voteType.push('多选，最多'+ (i + 1) +'项');
            }

            console.log(i)
            console.log(_voteType)

        })
        _voteType.push('多选，无限制');

        this.setData({voteType: _voteType});
        console.log(111)
    },
    showTopTips: function(){
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
        //发送数据到服务器
        wx.request({
          url: 'http://www.ownersbuild.com:3000/vote/create',
          data: {
            date: this.data.date,//开始日期
            time: this.data.time,//结束时间
            voteType: this.data.voteType[this.data.voteTypeIndex],//类型
            voteTitle: this.data.voteTitle,//标题
            voteText: this.data.voteText,//内容
            files: this.data.files,//??
            optionList: this.data.optionList
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
                    wx.navigateTo({
                      url: '../vote_index/vote_index'
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
    },
    bindVoteTitleChange: function (e) {
      this.setData({
        voteTitle: e.detail.value
      })
    },
    bindVoteTextChange: function (e) {
      this.setData({
        voteText: e.detail.value
      })
    },
    bindVoteTypeChange: function (e){
        this.setData({
            voteTypeIndex: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    recordValue: function (e){
        let _optionList = this.data.optionList;
        let _index = e.target.dataset.index;
        let value = e.detail.value;
        _optionList[_index].value = value;

        this.setData({optionList: _optionList});

    },
    addOption: function (e){
        let _optionList = this.data.optionList;

        _optionList.push({icon: '/images/common/5.png'})
        this.setData({optionList: _optionList});

        // 选项大于15个后移除添加按钮
        if(_optionList.length >= 15) {
            this.setData({showAddBtn: 0});
        }

        // 更新投票选项
        this.updateVoteType();

    },
    delOption: function (e){
        let _index = e.target.dataset.index;
        let _optionList = this.data.optionList;

        _optionList.splice(_index, 1);

        this.setData({optionList: _optionList});

        // 更新投票选项
        this.updateVoteType();

    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            count: 1, // 最多可以选择的图片张数
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    }
});