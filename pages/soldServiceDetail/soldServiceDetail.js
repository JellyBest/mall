// pages/soldServiceDetail/soldServiceDetail.js
import { post, uploadImg } from '../../api/http.js'
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
    refund.status = this.getStatus(refund.status)
    this.setData({
      refund: refund
    })
  },
  getStatus(type){
    switch(type){
      case "0": 
        return "未审核"
      case "1":
        return "审核成功"
      case "2":
        return "审核失败"
      case "3":
        return "退款成功"
      case "4":
        return "退款失败"
      case "5":
        return "已取消"
      case "6":
        return "线下处理完成"
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