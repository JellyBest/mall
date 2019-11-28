// pages/home/home.js
import { post } from '../../api/http.js'
import { moneyFormat } from '../../utils/util.js'
console.log(moneyFormat)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    newPros: [],
    
    productList:[
      { 
        productId: "1",
        productSmallPic: "../../assets/banner.png",
        price: '1.0',
        productName: "土豆"
      },
      {
        productId: "2",
        productSmallPic: "../../assets/banner.png",
        price: '1.0',
        productName: "土豆"
      },
      {
        productId: "3",
        productSmallPic: "../../assets/banner.png",
        price: '1.0',
        productName: "土豆"
      }
    ]
  },
  moduleCodeList: [], 
  goToMore(e){
    let index = e.currentTarget.dataset.index
    let moduleCode = this.moduleCodeList[index]
    wx.navigateTo({
      url: '/pages/morePros/morePros?moduleCode=' + moduleCode,
    })
  },
  getPro(code){
    return new Promise( (resolve,reject) => {
      post("mini/getModuleProList.do", {
        moduleCode: code,
        page:1,
        size:3
      }).then(res => {
        resolve(res?res:"")
      }).catch(err => {
        console.error(err)
      })
    } )
  },
  /**
   * 获取商品列表
   */
  getProducts(arr){
    let arrMap = arr.map(item => {
      return this.getPro(item)
    })
    Promise.all(arrMap).then(res => {
      console.log(res,'nennnnn')
      this.data.newPros = res.map(item => {
        if (item.productDtoList.length > 0){
          item.productDtoList = item.productDtoList.map(value => {
            value.price = moneyFormat(value.price)
            return value
          })
        }
        return item
      })
      this.setData({
        newPros: this.data.newPros
      })
    })
  },
  /**
   * 获取板块名称列表
   */
  getList(){
    post("mini/getModuleList.do",{}).then(res => {
      console.log(res,'list')
      let data = res.moduleDtoList
      let arr = data.map(item => {
        return item.moduleCode
      })
      this.moduleCodeList = arr
      this.getProducts(arr)
    })
  },

  getModuleProList(){
    post("mini/getModuleProList.do",{
      moduleCode: "1573962858735",
      page: 1,
      size: 10
    }).then(res => {
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    // this.getModuleProList()
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