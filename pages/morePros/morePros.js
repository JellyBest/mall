import { post } from '../../api/http.js'
import { moneyFormat } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 2,
    imageURL: "../../../assets/carrot.png",
    productDtoList: [],
    showBtm: true,
  },
  pages: 1,
  pageSize: 5,
  pageNo: 1,
  moduleCode: "",
  async getPro() {
    let ret = await post("mini/getModuleProList.do",{
      moduleCode: this.moduleCode,
      page: this.pageNo,
      size: this.pageSize
    })
    wx.setNavigationBarTitle({
      title: ret.moduleName
    })
    this.pages = Math.ceil(ret.total/this.pageSize)
    console.log(this.pages)
    ret.productDtoList = ret.productDtoList.map(item => {
      item.price = moneyFormat(item.price)
      item.oldPrice = moneyFormat(item.oldPrice)
      return item
    })
    this.data.productDtoList = this.data.productDtoList.concat(ret.productDtoList)
    this.setData({
      productDtoList: this.data.productDtoList
    })
    console.log(ret)
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.moduleCode = options.moduleCode
    this.getPro()
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
    console.log('bottom')
    if(this.pageNo < this.pages){
      this.pageNo++
      this.setData({
        showBtm: false,
        btmData: "加载中..."
      })
      this.getPro()
    }else{
      this.setData({
        showBtm: false,
        btmData: "没有更多内容了"
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})