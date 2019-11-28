// pages/order/order.js
import { post } from '../../api/http.js'
const app = getApp()
const Toast = app.globalData.Toast
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "../../../assets/carrot.png",
    userProductDtoList: [],
    address: null
  },
  clickBtn(){
    post("/order/order.do",{
      type: this.type == 1 ? "fromShopCar" :"fromPro",
      receiveCode: this.data.address.receiveCode,
      userCode: wx.getStorageSync("code")
    }).then(res => {
      
    })
  },
  getCarProds() {
    post("shopCar/getShopCarProductList.do", {
      userCode: wx.getStorageSync("code")
    }).then(res => {
      this.setData({ userProductDtoList: res.userProductDtoList })
    }).catch(err => {
      Toast.fail(err.respInfo);
    })
  },
  getAddressList() {
    post("address/wxReceiveList.do", {
    }).then(res => {
      let rt = res.receiveList
      if(rt.length == 0){
        Toast("请先配置收获地址")
        wx.switchTab({
          url: '/pages/user/user',
        })
        return
      }
      let address = rt.filter(item => {
        return item.isDefault == 1
      })[0]
      console.log(address)
      this.setData({
        address: address
      })
    }).catch(err => {
      console.error(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarProds()
    this.getAddressList()
    this.type = options.type
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