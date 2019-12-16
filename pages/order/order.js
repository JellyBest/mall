// pages/order/order.js
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
    userProductDtoList: [],
    address: null
  },
  clickBtn(){
    if(this.data.address == ''){
      wx.showModal({
        title: '提示',
        content: '请先选择默认地址',
        success(res){
          if(res.confirm){
            wx.switchTab({
              url: '/pages/user/user',
            })
          }
        }
      })
      return 
    }
    post("/order/order.do",{
      type: this.type == 1 ? "fromShopCar" :"fromPro",
      receiveCode: this.data.address.receiveCode,
      userCode: wx.getStorageSync("code")
    }).then(res => {
      let orderNo = res.orderNo
      this.pay(orderNo)
    })
  },
  async pay(orderNo){
    let ret = await post("/order/toOrderPay.do",{
      // userCode: wx.getStorageSync("code")
      orderNo: orderNo
    })
    console.log(ret)
    // { }
    wx.requestPayment({
      timeStamp: ret.timeStamp ,
      nonceStr: ret.nonceStr,
      package: ret.package,
      signType: ret.signType,
      paySign: ret.paySign,
      success(res){
        console.log(res,'pau')
        wx.redirectTo({
          url: '/pages/myOrder/myOrder?type=' +'sendUnReceive',
        })
      },
      fail(res){
        post("order/notPayOrder.do", {
          orderNo: orderNo
        }).then(
          ()=>{
            wx.redirectTo({
              url: '/pages/myOrder/myOrder?type=' + 'unPay',
            })
          }
        )
        
      }
    })
  },
  getCarProds() {
    post("shopCar/getShopCarProductList.do", {
      userCode: wx.getStorageSync("code")
    }).then(res => {
      let data = res.userProductDtoList
      data.map(item => {
        item.titlePic = getImg(item.titlePic)
        item.price = moneyFormat(item.price)
        item.postPrice = moneyFormat(item.postPrice)
        return item
      })
      this.setData({ userProductDtoList: data })
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
      })
      if(address.length == '0'){
        address = ""
      }else{
        address = address[0]
      }
      console.log(address,'address')
      this.setData({
        address: address
      })
    }).catch(err => {
      console.error(err)
    })
  },
  manageAds(){
    wx.switchTab({
      url: '/pages/user/user',
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