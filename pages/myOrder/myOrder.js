// pages/myOrder/myOrder.js
import { post } from '../../api/http.js'
import { moneyFormat } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  step: "",
  pageNo: 1,
  pageSize: 10,
  async getOrderList(){
    let ret = await post("/order/orderList.do",{
      type: 0,
      page: this.pageNo,
      size: this.pageSize 
    })
    console.log(ret,'tt')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.step = options.step
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
    this.getOrderList()
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