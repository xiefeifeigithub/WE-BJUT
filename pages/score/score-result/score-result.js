const app = getApp()
Page({
  data: {
    result:null
  },

  onLoad: function (options) {
    if (options.result) {
      let result_obj = JSON.parse(options.result);
      this.setData({
        result: result_obj,
      });
      if (!result_obj || !result_obj.number_of_lesson) {
        this.showNoScoreToast();
      }
      wx.nextTick(() => {
        this.updateShowScore();
      })
    }
  },

  updateShowScore() {
    let score = null;
    if (!this.data.result) {
      // do noting
    }
    else if (parseFloat(this.data.result.average_score_all) > parseFloat(this.data.result.average_score_term)) {
      score = parseFloat(this.data.result.average_score_all)
    }
    else {
      score = parseFloat(this.data.result.average_score_term)
    }
    if (score) {
      score = score.toFixed(0);
    }
    this.setData({
      showedScore: score
    })
  },

  showNoScoreToast: function () {
    wx.showToast({
      title: '暂时没有出分...',
      icon: 'none',
      duration: 2000
    })
  },
})