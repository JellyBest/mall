// pages/soldService/soldService.js
import { post, uploadImg } from '../../api/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: "1",
    order:{
      orderTime: "",
      orderNo: ""
    },
    fileList: []
    
  },
  async afterRead(event){
    const { file } = event.detail;
    let ret = await uploadImg("upload/uploadFile.do",file)
    console.log(ret,'upload')
    this.data.fileList = this.data.fileList.concat(ret)
    this.setData({
      fileList: this.data.fileList
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    
  },
  onChange(e){
    let value = e.detail
    this.setData({
      radio: value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      order: {
        orderTime: options.orderTime,
        orderNo: options.orderNo
      }
    })
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