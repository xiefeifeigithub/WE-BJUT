//暴露出成绩查询，分别在不同页面获取不同学期的成绩并存入缓存：减少服务器压力
var app = getApp()

// yearArray: ['2018-2019', '2017-2018', '2016-2017', '2015-2016', '2014-2015'],

//根据传入的 year 和 semester 设置成绩缓存
function queryScoreBy_Year_Semester(year, semester) {
  console.log("向服务器获取" + year + "年第" + semester + "学期的成绩")
  var account = wx.getStorageSync(app.data.keyUserName)
  var pwd = wx.getStorageSync(app.data.keyPwd)
  var year = year
  var semester = semester
  var year_semester = year + '_' + semester

  //判断用户是否登录过,如果没有登录则不进行查询
  const user = wx.getStorageSync(app.data.keyUserName)
  if (user != '') {
    wx.request({
      url: 'https://www.bjut1960.cn/score',
      method: 'POST',
      data: {
        xh: account,
        mm: pwd,
        xn: year,
        xq: semester,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.statusCode == 200) {
          wx.setStorage({
            key: year_semester,
            data: JSON.stringify(res.data),
          })
          //下一步该暴露该接口，修改pages/score.js页面逻辑，在获得用户所选学期时判断是否有该学期的成绩缓存
        }
      }
    })
  } 
  else{
    console.log("未登录")
  }
}

//暴露接口
module.exports = {
  queryScoreBy_Year_Semester: queryScoreBy_Year_Semester,
}
