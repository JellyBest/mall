// pages/searchResult/searchResult.js
import { post, getImg } from '../../api/http.js'
const app = getApp()
const Toast = app.globalData.Toast
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 2,
    imageURL: "../../../assets/carrot.png",
    searchParam: {
      productName: "",
      page: 1,
      size: 20
    },
    productDtoList: []
  },
  addToCar(e) {
    let code = e.currentTarget.dataset.code
    post("shopCar/putProToShopCar.do", {
      userCode: wx.getStorageSync("code"),
      productCode: code,
      amount: 1,
      putType: "fromPro"
    }).then(res => {
      Toast("添加成功")
    }).catch(err => {
      console.error(err)
    })
  },
  searchPro() {
    post("mini/getSearchProList.do", this.data.searchParam).then(res => {
      let productDtoList = res.productDtoList
      productDtoList.map(item => {
        item.titlePic = getImg(item.titlePic)
        return item
      })
      this.setData({
        productDtoList: productDtoList
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.searchParam.productName = options.name
    this.setData({
      searchParam: this.data.searchParam
    })
    this.searchPro()
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