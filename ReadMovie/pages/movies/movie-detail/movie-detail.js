// pages/movies/movie-detail/movie-detail.js
var app = getApp();
var util = require("../../../utils/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.http(url, this.processDoubanData);
  },

  processDoubanData:function(data1){
    var data = {};
    data = data1;
    if(!data)
    {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }

    if(data.directors[0] != null)
    {
      if (data.directors[0].avatars != null)
      {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }

    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.comments_count,
      year: data.year,
      generes: data.genres.join("、 "),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.converToCastString(data.casts),
      castsInfo: util.converToCastInfos(data.casts),
      summary: data.summary,
      comments_count: data.comments_count,
      collect_count: data.collect_count
    }
    
    this.setData({
      movie: movie
    });
  },

  viewMoviePostImg: function(e){
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      current: src
    })
  }
})