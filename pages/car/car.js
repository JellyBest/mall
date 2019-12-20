// pages/car/car.js
import { post, getImg } from '../../api/http.js'
import { moneyFormat } from '../../utils/util.js'
const app = getApp()
const Toast = app.globalData.Toast
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userProductDtoList: [], 
    step:2,
    imageURL: "../../../assets/carrot.png",
    showDefault:false,
    address: ""
  },
  clickBtn(e){
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
      url: '/pages/order/order?receiveCode=' + this.data.address.receiveCode + '&type='+ 1,
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
  deletePro(e){
    let productCode = e.currentTarget.dataset.code
    post("shopCar/removeProFromShopCar.do",{
      userCode: wx.getStorageSync("code"),
      productCode, 
    }).then(res => {
      this.getCarProds()
    }).catch(err => {
      Toast.fail(err.respInfo);
    })
  },
  stepChange(e){
    console.log(e)
    let value = e.detail
    let productCode = e.currentTarget.dataset.procode
    let storeNum = e.currentTarget.dataset.num
    let index = e.currentTarget.dataset.index
    post("shopCar/putProToShopCar.do",{
      userCode: wx.getStorageSync("code"),
      productCode,
      amount: value,
      putType: "fromCar"
    }).then(res => {
      console.log(res)
    }).catch(err => {
      Toast.fail(err.respInfo);
      if(err.respCode == '4567'){
        this.data.userProductDtoList[index].amount = storeNum
        this.setData({ userProductDtoList: this.data.userProductDtoList})
      }
    })
  },
  getCarProds(){
    post("shopCar/getShopCarProductList.do",{
      userCode: wx.getStorageSync("code")
    }).then(res => {
      let data = res.userProductDtoList
      data.map(item => {
        item.titlePic = getImg(item.titlePic)
        item.price = moneyFormat(item.price)
        return item
      })
      if (data.length == 0) {
        this.setData({
          showDefault: true
        })
      } else {
        this.setData({
          showDefault: false
        })
      }
      this.setData({ userProductDtoList: data})
    }).catch(err => {
      Toast.fail(err.respInfo);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getCarProds()
    this.getAddressList()
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