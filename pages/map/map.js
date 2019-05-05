// 引入SDK核心类
let QQMapWX = require('./qqmap-wx-jssdk.min.js');

// 实例化API核心类
let qqmapsdk = new QQMapWX({
  key: 'XJQBZ-4SYR3-VO733-376GN-EEYLE-QQFP2'
});
Page({
  data: {
    openNav: true  //是否开启导航
  },

  onLoad: function (options) {
    let _page = this;

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        _page.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 18
        });
      }
    })

    wx.removeStorageSync('latlngstart');
    wx.removeStorageSync('latlngend');
  },
  
  //start
  getStart(e) {
    let _page = this;
    // 关键字补全以及获取经纬度
    qqmapsdk.getSuggestion({
      keyword: '北京工业大学' + e.detail.value,
      success: function (res) {
        let lat = res.data[0].location.lat;
        let lng = res.data[0].location.lng;

        wx.setStorageSync('latlngstart', {
          lat: res.data[0].location.lat,
          lng: res.data[0].location.lng
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });

    // 如果输入地点为空：则不规划路线
    if (e.detail.value == '') {
      _page.setData({
        openNav: true,
        resultDistance: ''
      });
    } else {
      _page.setData({
        openNav: false
      });
    }
  },

  //end
  getEnd(e) {
    let _page = this;
    // 输入地点获取经纬度,我取得是数据的第一条数据.
    qqmapsdk.getSuggestion({
      keyword: '北京工业大学' + e.detail.value,
      success: function (res) {
        let lat = res.data[0].location.lat;
        let lng = res.data[0].location.lng;

        wx.setStorageSync('latlngend', {
          lat: res.data[0].location.lat,
          lng: res.data[0].location.lng
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    // 如果输入地点为空：则不规划路线
    if (e.detail.value == '') {
      _page.setData({
        openNav: true,
        resultDistance: ''
      });
    } else {
      _page.setData({
        openNav: false
      });
    }
  },
  //事件回调函数
  walking: function () {

    let _page = this;

    // 起点经纬度
    let latStart = wx.getStorageSync('latlngstart').lat;
    let lngStart = wx.getStorageSync('latlngstart').lng;

    // 终点经纬度
    let latEnd = wx.getStorageSync('latlngend').lat;
    let lngEnd = wx.getStorageSync('latlngend').lng;

    _page.setData({
      latitude: latStart,
      longitude: lngStart,
      scale: 18,
      markers: [{
        id: 0,
        latitude: latStart,
        longitude: lngStart,
        // 起点图标
        iconPath: '../../images/location.png'
      },
      {
        id: 1,
        latitude: latEnd,
        longitude: lngEnd,
        // 终点图标
        iconPath: '../../images/location.png'
      },
      ]
    });

    /**
     * 获取两点的距离
     */
    qqmapsdk.calculateDistance({
      to: [{
        latitude: latStart,
        longitude: lngStart
      }, {
        latitude: latEnd,
        longitude: lngEnd
      }],
      success: function (res) {
        console.log(res, '两点之间的距离：', res.result.elements[1].distance);
        _page.setData({
          resultDistance: res.result.elements[1].distance + '米'
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });

    //网络请求设置
    let opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      url: `https://apis.map.qq.com/ws/direction/v1/walking/?from=${latStart},${lngStart}&to=${latEnd},${lngEnd}&key=${qqmapsdk.key}`,
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        let ret = res.data
        if (ret.status != 0) return; //服务异常处理
        let coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        let kr = 1000000;
        for (let i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (let i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        //设置polyline属性，将路线显示出来
        _page.setData({
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      }
    };
    wx.request(opt);
  },
  //页面初次渲染完成时触发
  onReady: function () {
    //动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: '校内导航'
    })
  }
})