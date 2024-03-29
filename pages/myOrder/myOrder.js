// pages/myOrder/myOrder.js
import { post,getImg } from '../../api/http.js'
import { moneyFormat, formatTime } from '../../utils/util.js'
const app = getApp()
const Toast = app.globalData.Toast
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "",
    orderDtoList: [],
    time: 30 * 60 * 60 * 1000
  },
  step: "",
  pageNo: 1,
  pageSize: 10,
  
  changeTab(e){
    this.setData({
      orderDtoList: []
    })
    console.log(e)
    let index = e.detail.detail.index
    this.setData({
      active: index
    })
    let type = this.getType(index)
    this.getOrderList(type)
  },
  //订单详情
  goToDetail(e){
    let orderNo = e.currentTarget.dataset.orderno
    let type = e.currentTarget.dataset.type
    if (type == "service"){
      wx.navigateTo({
        url: '/pages/soldServiceDetail/soldServiceDetail?refundNo=' + orderNo
      })
      return
    }
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?orderNo=' + orderNo
    })
  },
  //申请售后
  goService(e){
    let orderNo = e.currentTarget.dataset.orderno
    let ordertime = e.currentTarget.dataset.ordertime
    wx.navigateTo({
      url: '/pages/soldService/soldService?orderNo=' + orderNo + '&orderTime=' + ordertime
    })
  },
  goCate(){
    wx.switchTab({
      url: '/pages/cate/cate',
    })
  },
  //确认收货
  async receiveGoods(e){
    let orderNo = e.currentTarget.dataset.orderno
    let ret = await post("/order/finishOrder.do",{
      orderNo: orderNo
    })
    if (ret.respCode === "0000") {
      Toast("操作成功")
      this.getOrderList("sendUnReceive")
    }
    console.log(ret)
  },
  async pay(e){
    let orderNo = e.currentTarget.dataset.orderno
    let ret = await post("/order/toOrderPay.do",{
      orderNo: orderNo
    })
    this.payment(ret, orderNo)
    if (ret.respCode === "0000") {
      Toast("操作成功")
      this.getOrderList("unPay")
    }
  },
  async cancelRefund(e) {
    let refundNo = e.currentTarget.dataset.refundno
    let ret = await post("/refund/cancelRefund.do", {
      refundNo: refundNo
    })
    if (ret.respCode === "0000") {
      Toast("已取消")
      this.getOrderList("service")
    }
  },
  //取消订单
  async cancelOrder(e) {
    let orderNo = e.currentTarget.dataset.orderno
    let ret = await post("/order/cancelOrder.do", {
      orderNo: orderNo
    })
    if(ret.respCode === "0000"){
      Toast("已取消")
      this.getOrderList("unPay")
    }
    console.log(ret)
  },
  payment(ret, orderNo){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.requestPayment({
      timeStamp: ret.timeStamp,
      nonceStr: ret.nonceStr,
      package: ret.package,
      signType: ret.signType,
      paySign: ret.paySign,
      success(res) {
        wx.hideLoading()
        console.log(res, 'pau')
        this.setData({
          active: 1
        })
      },
      fail(res) {
        wx.hideLoading()
        post("order/notPayOrder.do",{
          orderNo: orderNo
        })
      }
    })
  },
  
  async getOrderList(type){
    if(type == "service"){
      let ret = await post("/refund/refundList.do", {
        page: this.pageNo,
        size: this.pageSize
      })
      let orderDtoList = ret.refundList.map(item => {
        item.orderTime = formatTime(item.createTime)
        item.refundPic = getImg(item.refundPic)
        item.totalAmount = moneyFormat(item.refundAmount)
        item.statusTxt = this.getStatus(item.status)
        item.refundType = this.getRefund(item.refundType)
        return item
      })
      this.setData({
        orderDtoList
      })
      return
    }
     
    let ret = await post("/order/orderList.do",{
      type: type,
      page: this.pageNo,
      size: this.pageSize 
    })
    let orderDtoList = ret.orderDtoList.map(item => {
      if (type == "unPay") {
        item.endTime = item.orderTime + 15 * 60 * 1000 - new Date().getTime()
        console.log(item.endTime,'endtime')
      }
      item.orderTime = formatTime(item.orderTime)
      item.totalAmount = moneyFormat(item.totalAmount)
      item.totalNum = item.productSimpleList.length
      item.productSimpleList = item.productSimpleList.map(child => {
        child.titlePic = getImg(child.titlePic)
        return child
      }) 
      return item
    })
    this.setData({
      orderDtoList
    })
  },
  getType(index){
    switch(index){
      case 0:
        return "unPay";
      case 1:
        return "unSend";
      case 2: 
        return "sendUnReceive";
      case 3:
        return "receive";
      case 4:
        return "service";
    }
  },
  getActive(type){
    switch (type){
      case "unPay":
        this.data.active = 0
        break
      case "unSend":
        this.data.active = 1
        break
      case "sendUnReceive":
        this.data.active = 2
        break
      case "receive":
        this.data.active = 3
        break
      case "service":
        this.data.active = 4
        break
      default :
        this.data.active = 0
    }
    this.setData({
      active: this.data.active
    })
    console.log(this.data.active)
  },
  getRefund(type){
    switch (type) {
      case "0":
        return "仅退款"
      case "1":
        return "退货退款"
      case "2":
        return "部分退货退款"
    }
  },
  getStatus(type) {
    switch (type) {
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
    this.setData({
      active: this.data.active
    })
    console.log(this.data.active)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.step = options.type

    this.getActive(options.type)
    this.getOrderList(options.type)
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
    // this.getOrderList(this.type)
    this.getActive(this.step)
    this.getOrderList(this.step)
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