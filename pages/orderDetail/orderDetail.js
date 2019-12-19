// pages/orderDetail/orderDetail.js
import {
  post,
  getImg
} from '../../api/http.js'
import {
  moneyFormat,
  formatTime
} from '../../utils/util.js'
const app = getApp()
const Toast = app.globalData.Toast
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "../../../assets/carrot.png",
    orderDetail: {},
    time: 15 * 60 * 1000,
    timeData: {}
  },
  orderNo: "",
  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },
  async getDetail() {
    let ret = await post("/order/orderDetail.do", {
      orderNo: this.orderNo
    })
    let orderDetail = ret.orderDetail
    if (orderDetail.status == "2") {
      orderDetail.statusDesc = "您的订单已支付，请耐心等待发货！"
    }
    orderDetail.limitTime = orderDetail.orderTime + 15 * 60 * 1000 - new Date().getTime()
    console.log(orderDetail.limitTime)
    orderDetail.statusTxt = this.getStatus(orderDetail.status).statusTxt
    orderDetail.statusIcon = this.getStatus(orderDetail.status).icon
    orderDetail.statusDesc = this.getStatus(orderDetail.status).statusDesc
    orderDetail.orderProductList = orderDetail.orderProductList.map(item => {
      item.productPicUrl = getImg(item.productPicUrl)
      return item
    })
    orderDetail.totalAmount = moneyFormat(orderDetail.totalAmount)
    orderDetail.orderTime = formatTime(orderDetail.orderTime)
    this.setData({
      orderDetail: ret.orderDetail
    })
    console.log(ret)
  },

  getStatus(type) {
    let obj = {}
    switch (type) {
      case "0":
        obj.statusTxt = "待支付"
        obj.icon = "/assets/unpay.png"
        obj.statusDesc = "逾期未支付将会自动关闭订单！"
        break
      case "1":
        //支付中
        obj.statusTxt = "待支付"
        obj.icon = "/assets/unpay.png"
        obj.statusDesc = "逾期未支付将会自动关闭订单！"
        break
      case "2":
        obj.statusTxt = "待发货"
        obj.icon = "/assets/unsend.png"
        obj.statusDesc = "您的订单已支付，请耐心等待发货！"
        break
      case "3":
        obj.statusTxt = "待收货"
        obj.icon = "/assets/unreceive.png"
        obj.statusDesc = "您的订单已发货，请耐心等待派送！"
        break
      case "4":
        obj.statusTxt = "已完成"
        obj.icon = "/assets/u-completed.png"
        obj.statusDesc = "您的订单已完成，感谢使用弘益惠农！"
        break
      case "7":
        obj.statusTxt = "待支付"
        obj.icon = "/assets/unpay.png"
        obj.statusDesc = "逾期未支付将会自动关闭订单！"
        break
    }
    return obj
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.orderNo = options.orderNo
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})