// pages/user/user.js
import { post } from '../../api/http.js'
const app = getApp()
const Toast = getApp().globalData.Toast
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    activeNames: ['1']
  },
  goToMyOrder(e){
    let step = e.currentTarget.dataset.step
    wx.navigateTo({
      url: '/pages/myOrder/myOrder?type='+step,
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  newAddress(){
    wx.navigateTo({
      url: '/pages/newAddress/newAddress',
    })
  },
  goToEdit(e){
    let code = e.currentTarget.dataset.code
    console.log(code)
    wx.navigateTo({
      url: '/pages/editAddress/editAddress?code='+ code,
    })
  },
  deleteAddress(e){
    let code = e.currentTarget.dataset.code
    wx.showModal({
      title: '提示',
      content: '确认删除该地址？',
      confirmText: '确定',
      cancelText: '取消',
      success: result => {
        console.log(result)
        if (result.confirm){
          post("address/wxDeletedAddress.do", {
            receiveCode: code
          }).then(res => {
            Toast('删除成功')
            this.getAddressList()
          })
        }
        
      }
    })
    
  },
  getAddressList(){
    post("address/wxReceiveList.do",{
    }).then(res => {
      this.setData({
        addressList: res.receiveList
      })
    }).catch(err => {
      console.error(err)
    })
  },
  initUserInfo(){
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo()
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
    this.initUserInfo()
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