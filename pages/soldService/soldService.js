// pages/soldService/soldService.js
import {
  post,
  uploadImg
} from '../../api/http.js'
import {
  Validate
} from '../../utils/validate.js'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp()
const Toast = app.globalData.Toast
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: "1",
    order: {
      orderTime: "",
      orderNo: ""
    },
    fileList: [],
    refundReason: "",
    refundAmount: "",
  },
  /**
   * formVerify 验证表单
   * @param {*Object} e 
   */
  formVerify(params) {
    console.log(params)
    let config = {
      refundReason: [{
        required: true,
        message: '请填写售后原因'
      }],
      refundType: [{
        required: true,
        message: '请选择售后方式'
      }],
      refundPic: [{
        required: true,
        message: '请上传一张图片'
      }]
    }
    if (params.refundType == 2) {
      config.refundAmount = [{
        required: true,
        message: '请输入退款金额'
      }]
    }
    let Vali = new Validate(config, params);
    let res = Vali.init();
    console.log(res, 'check')
    if (!res.check) {
      Dialog.alert({
        title: '提示',
        message: res.firstFalse
      }).then(() => {
        // on close
      });
      return false;
    }
    return true;
  },
  inputText(e) {
    let value = e.detail.value
    this.setData({
      refundReason: value
    })
  },
  amountInput(e) {
    let value = e.detail.value
    this.setData({
      refundAmount: value
    })
  },
  async afterRead(event) {
    const {
      file
    } = event.detail;
    let ret = await uploadImg("upload/uploadFile.do", file)
    console.log(ret, 'upload')
    this.data.fileList = this.data.fileList.concat(ret)
    this.setData({
      fileList: this.data.fileList
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

  },
  onChange(e) {
    let value = e.detail
    this.setData({
      radio: value
    })
  },
  async submitForm() {
    let params = {
      orderNo: this.data.order.orderNo,
      refundType: this.data.radio - 0,
      refundReason: this.data.refundReason,
      refundPic: this.data.fileList.length > 0 ? this.data.fileList[0].uuid : "",
    }
    if (params.refundType == 2) {
      params.refundAmount = this.data.refundAmount
    }
    let verify = this.formVerify(params)
    if (!verify) {
      return false
    }
    let ret = await post("/refund/toRefund.do", params)
    console.log(ret)
    if (ret.respCode === "0000"){
      Toast("添加成功")
      wx.navigateBack({
        delta: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})