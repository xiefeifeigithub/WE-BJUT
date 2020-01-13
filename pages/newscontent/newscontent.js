// pages/newscontent/newscontent.js

var WxParse = require('../../wxParse/wxParse.js')
Page({
// var article = '<div>我是HTML代码</div>';
// /**
// * WxParse.wxParse(bindName , type, data, target,imagePadding)
// * 1.bindName绑定的数据名(必填)
// * 2.type可以为html或者md(必填)
// * 3.data为传入的具体数据(必填)
// * 4.target为Page对象,一般为this(必填)
// * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
// */
// var that = this;
// WxParse.wxParse('article', 'html', article, that, 5);

onLoad: function () {
  wx.showLoading({
    title: '加载中...',
  })
    var that = this;

    var article = `
<div class="content"> <!-- 通知公告内容正文 --> <div class="container" style="min-height: 480px;"> <div class="span12"> <div class="ybc"> <div class="an-til2 clearfix"> <h4>科技动态</h4> <div class="mbx hidden-print" id="change">调整宽度排版</div> </div> <div class="news-content"> <div class="news-ct"> <h2>应用数理学院统计学学科系列学术报告 </h2> <p> 首次发布时间：2020-01-03 15:54:01 | 最新发布时间：2020-01-03 15:54:01 | 发布部门：应用数理学院 | 阅读人数：319 </p> </div> <div class="news-cr uecontent"> <p style="text-align:center"><strong><span style="font-size:19px;font-family:'微软雅黑','sans-serif';color:#333333;background:white">应用数理学院统计学学科系列学术报告</span></strong></p><p style=";text-autospace:none"><strong><span style="font-size:19px;font-family:宋体;color:#333333">报告题目：</span></strong><strong><span style="font-size:19px;font-family:'CMR12','serif'">Confidence bounds for model selection</span></strong></p><p style="line-height:150%;text-autospace:none"><strong><span style="font-size:19px;line-height:150%;font-family:宋体;color:#333333">摘</span></strong><strong><span style="font-size:19px;line-height:150%;color:#333333">&nbsp;&nbsp;&nbsp; </span></strong><strong><span style="font-size:19px;line-height:150%;font-family: 宋体;color:#333333">要：</span></strong><span style="font-size:15px;line-height:150%">In this article, we introduce the concept of model confidence bounds (MCB) for variable selection in the context of nested models. Similarly to the endpoints in the familiar confidence interval for parameter estimation, the MCB identifies two nested models&nbsp;(upper and lower confidence bound models) containing the true model at a given level of confidence. Instead of trusting a single selected model obtained from a given model selection method, the MCB proposes a group of nested models as candidates and the MCB's&nbsp;width and composition enable the practitioner to assess the overall model selection uncertainty. A new graphical tool—the model uncertainty curve (MUC)—is introduced to visualize the variability of model selection and to compare different model selection procedures.&nbsp;The MCB methodology is implemented by a fast bootstrap algorithm that is shown to yield the correct asymptotic coverage under rather general conditions. Our Monte Carlo simulations and real data examples confirm the validity and illustrate the advantages of&nbsp;the proposed method.</span></p><p style="line-height:150%;text-autospace:none"><span style="font-size:15px;line-height:150%;font-family:'CMR10','serif'">&nbsp;</span></p><p><strong><span style="font-size:16px;font-family:宋体;color:#333333">主讲人简介：</span></strong></p><p style="text-align:left;line-height:150%"><span style=";color:black">Yichen Qin is an associate professor in the Department of Operations, Business Analytics, and Information Systems in the Lindner College of Business at the University of Cincinnati. His research interests include computational statistics, robust statistics,&nbsp;model selection, and so on. He coordinates the Ph.D. program in Business Analytics at UC and teaches courses in Business Analytics, Data Analysis Methods, and Forecasting. He earned his Ph.D. degree in Applied Mathematics and Statistics from the Johns Hopkins&nbsp;University.</span></p><p><strong><span style="font-size:19px;font-family:宋体;color:#333333">报告时间</span></strong><span style="font-size:19px;font-family:宋体;color:#333333">：</span><span style="font-size:19px;font-family:宋体;color:#333333">2020</span><span style="font-size:19px;font-family:宋体;color:#333333">年1月3日14</span><span style="font-size:19px;font-family:宋体;color:#333333">：00---15</span><span style="font-size:19px;font-family:宋体;color:#333333">：</span><span style="font-size:19px;font-family:宋体;color:#333333">00</span></p><p><strong><span style="font-size:19px;font-family:宋体;color:#333333">报告地点：理科楼M842会议室</span></strong></p><p style="text-indent:37px;line-height:125%"><strong><span style="font-size:19px;line-height:125%;font-family:宋体;color:#333333">欢迎您参加！</span></strong></p><p style="line-height:125%"><strong><span style="font-size: 16px;line-height:125%;font-family:宋体;color:#333333">联系人：荣耀华</span></strong></p><p style="text-indent:62px;line-height:125%"><a href="mailto:yanwang@bjut.edu.cn"><span style="color:black"><span style="color:black">rongyaohua</span></span><span style="font-size:16px;line-height:125%;color:black"><span style="color:black">@bjut.edu.cn</span></span></a></p><p><span style=";color:#333333">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-family:宋体;color:#333333">应用数理学院</span></p><p><span style=";color:#333333">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020-1-2</span></p><p><br></p> <p>&nbsp;&nbsp;</p> <p>&nbsp;&nbsp;</p> </div> <div align="center" class="hidden-print"> <button type="button" class="btn btn-warning" onclick="window.print()">打印</button> <button type="button" class="btn" onclick="parent.window.close();">关闭</button> </div> </div> </div> </div> </div> <script type="text/javascript">window.onload=function(){var a=document.getElementById("change");funClick=function(c,b){c.onclick=function(){var e=c.parentNode.parentNode.parentNode.parentNode.parentNode.className;var d=e.indexOf(b);if(d<0){e=e+" "+b}else{e=e.replace(b,"")}c.parentNode.parentNode.parentNode.parentNode.parentNode.className=e}};funClick(change,"newWidth")};$(document).ready(function(){uParse(".uecontent",{liiconpath:"/infoDiffusionV2-portlet/ueditor1.4.3/themes/ueditor-list/"})});</script> <!-- 通知公告内容正文结束 --> </div>

`;
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    WxParse.wxParse('article', 'html', article, that, 20);
    
    // 更改数据、获取新数据完成
    wx.hideLoading();
  }
})