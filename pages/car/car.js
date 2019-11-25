// pages/car/car.js
import { post } from '../../api/http.js'
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
      amount: value
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
      this.setData({ userProductDtoList: res.userProductDtoList})
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