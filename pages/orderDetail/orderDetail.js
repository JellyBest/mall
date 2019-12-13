// pages/orderDetail/orderDetail.js
import { post, getImg } from '../../api/http.js'
import { moneyFormat } from '../../utils/util.js'
const app = getApp()
const Toast = app.globalData.Toast
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "../../../assets/carrot.png",
    orderDetail: {}
  },
  orderNo: "",
  async getDetail(){
    let ret = await post("/order/orderDetail.do",{
      orderNo: this.orderNo
    })
    let orderDetail = ret.orderDetail
    orderDetail.status = this.getStatus(orderDetail.status)
    orderDetail.orderProductList = orderDetail.orderProductList.map(item => {
      item.productPicUrl = getImg(item.productPicUrl)
      return item
    })
    orderDetail.totalAmount = moneyFormat(orderDetail.totalAmount)
    this.setData({
      orderDetail: ret.orderDetail
    })
    console.log(ret)
  },
  getStatus(type){
    switch(type){
      case "0":
        return "待支付"
      case "1":
        return "支付中"
      case "2":
        return "支付成功未发货"
      case "3":
        return "支付成功已发货"
      case "4":
        return "买家已收货"
      case "7":
        return "支付失败"
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.orderNo = options.orderNo
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