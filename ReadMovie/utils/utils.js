function convertToStarsArray(stars)
{
  var num = stars.toString().substring(0,1);
  var array = [];
  for(var i = 1; i <= 5; i++)
  {
    if(i<=num)
    {
      array.push(1);
    }
    else{
      array.push(0);
    }
  }
  return array;
}

function converToCastString(casts){
  var castsjoin = "";
  for(var idx in casts)
  {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length-2);
}

function converToCastInfos(casts){
  var castsArray = [];
  for(var idx in casts)
  {
    var cast = {
      img: casts[idx].avatars?casts[idx].avatars.large:"",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

function http(url, callback){
  wx.request({
    url: url,
    method: "GET",
    header: {
      "Content-Type": "application/xml"
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (res) {
      console.log("调用失败");
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  converToCastInfos: converToCastInfos,
  converToCastString: converToCastString
}