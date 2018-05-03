var postsData = require("../../../data/posts-data.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.postId = postId;
    var postData = postsData.postList[postId];
    this.setData({postData:postData});

    var postsCollected = wx.getStorageSync("posts_collected");
    if(postsCollected)
    {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      });
    }
    else
    {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId)
    {
      this.setData({
        isPlayingMusic : true
      })
    }
    this.setMusicMonitor();
  },

  setMusicMonitor:function(){
    var that = this;

    wx.onBackgroundAudioPlay(
      function () {
        that.setData({
          isPlayingMusic: true
        })
        app.globalData.g_isPlayingMusic = true;
        app.globalData.g_currentMusicPostId = that.data.postId;
      }
    );

    wx.onBackgroundAudioPause(
      function () {
        that.setData({
          isPlayingMusic: false
        })
        app.globalData.g_isPlayingMusic = false;
        app.globalData.g_currentMusicPostId = null;
      }
    );
  },

  onMusicTap: function () {
    var currentPostId = this.data.postId;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postsData.postList[currentPostId].music.url,
        title: postsData.postList[currentPostId].music.title,
        coverImgUrl: postsData.postList[currentPostId].music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      });
    }
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

  onCollectionTap: function(event){
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.postId];
    postCollected = !postCollected;
    postsCollected[this.data.postId] = postCollected;
    this.showMod(postsCollected, postCollected);
  },

  onShareTap: function(event) {
    var itemList = [
      "分享到微信",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor:"#405f80",
      success:function(res){
        wx.showModal({
          title: '用户'+itemList[res.tapIndex],
          content: '现在无法实现分享功能',
        })
      }
    })
  },

  showMod: function (postsCollected, postCollected){
    var that = this;
    wx.showModal({
      title: postCollected ? '收藏' : '取消收藏',
      content: postCollected ? '收藏该文章':'取消收藏该文章',
      showCancel: "true",
      cancelColor: "#333",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected);
          that.setData({
            collected: postCollected
          });
        }
      }
    });
  },

  showToa: function (postsCollected, postCollected){
    wx.setStorageSync("posts_collected", postsCollected);
    this.setData({
      collected: postCollected
    });

    wx.showToast({
      title: postCollected?"收藏成功":"取消成功",
      duration: 1000,
      icon: "success"
    })
  }
})