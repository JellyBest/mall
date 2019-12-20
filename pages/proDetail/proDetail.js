// pages/proDetail/proDetail.js
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
    detail: {},
    address: ""
  },
  productCode: "",
  async getDetail(){
    let ret = await post("category/productDetail.do",{
      productCode: this.productCode
    })
    let product = ret.product
    product.titlePic = getImg(product.titlePic)
    product.bigPicUrl = getImg(product.bigPicUrl)
    product.descPics = getImg(product.descPics)
    this.setData({
      detail: ret.product
    })
    // console.log(ret)
    // let 
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
  goToCar(){
    wx.switchTab({
      url: '/pages/car/car',
    })
  },
  getAddressList() {
    post("address/wxReceiveList.do", {
    }).then(res => {
      let rt = res.receiveList
      if (rt.length == 0) {
        Toast("请先配置收获地址")
        wx.switchTab({
          url: '/pages/user/user',
        })
        return
      }
      let address = rt.filter(item => {
        return item.isDefault == 1
      })
      if (address.length == '0') {
        address = ""
      } else {
        address = address[0]
      }
      console.log(address, 'address')
      this.setData({
        address: address
      })
    }).catch(err => {
      console.error(err)
    })
  },
  goToOrder(){
    if (this.data.address == '') {
      wx.showModal({
        title: '提示',
        content: '请先选择默认地址',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/user/user',
            })
          }
        }
      })
      return
    }

    wx.navigateTo({
      url: '/pages/order/order?receiveCode=' + this.data.address.receiveCode + '&type=' + 2 + '&productCode=' + this.data.detail.productCode
    })
  },
  onClickIcon(){

  },
  onClickButton(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.productCode = options.productCode
    this.getDetail()
    this.getAddressList()
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