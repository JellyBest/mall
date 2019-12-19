// pages/soldServiceDetail/soldServiceDetail.js
import { post, getImg } from '../../api/http.js'
import {
  moneyFormat,
  formatTime
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refund: {}
  },
  refundNo: "",
  async getDetail(){
    let ret = await post("refund/refundDetail.do",{
      refundNo: this.refundNo
    })
    let refund = ret.refund
    refund.refundType = this.getType(refund.refundType)
    refund.createTime = formatTime(refund.createTime)
    refund.refundPic = getImg(refund.refundPic)
    refund.refundAmount = moneyFormat(refund.refundAmount)
    refund.statusTxt = this.getStatus(refund.status).statusTxt
    refund.statusDesc = this.getStatus(refund.status).statusDesc
    this.setData({
      refund: refund
    })
  },
  getType(type){
    switch(type){
      case '0':
        return "仅退款"
      case '1':
        return "退货退款"
      case '2':
        return "部分退货退款"
    }
  },
  getStatus(type){
    switch(type){
      case "0": 
        return{
          statusTxt: "未审核",
          statusDesc: "您已成功发起售后申请，请耐心等待商家处理！"
        }
      case "1":
        return {
          statusTxt: "已审核",
          statusDesc: "您的售后申请商家已审核，请等待商家退款处理！"
        }
      case "2":
        return {
          statusTxt: "审核失败",
          statusDesc: "您的售后申请商家已拒绝！"
        }
      case "3":
        return {
          statusTxt: "已退款",
          statusDesc: "您的售后申请商家已退款，感谢使用！"
        }
      case "4":
        return {
          statusTxt: "退款失败",
          statusDesc: "您的售后申请商家退款异常，请联系商家处理！"
        }
      case "5":
        return {
          statusTxt: "已取消",
          statusDesc: "您已取消了售后申请，感谢使用！"
        }
      case "6":
        return {
          statusTxt: "线下处理",
          statusDesc: "您的售后申请商家已转线下处理，请联系商家！"
        }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refundNo = options.refundNo
    this.getDetail()
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

  }
})