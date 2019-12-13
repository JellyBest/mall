// pages/home/home.js
import { post, getImg } from '../../api/http.js'
import { moneyFormat } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipeItems: [],
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
  goToDetail(e){
    let productCode = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '/pages/proDetail/proDetail?productCode=' + productCode,
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
      let swipe = []
      this.data.newPros = res.map(item => {
        if (item.productDtoList.length > 0){
          item.productDtoList = item.productDtoList.map(value => {
            
            value.titlePic = getImg(value.titlePic);
            value.price = moneyFormat(value.price)
            if (item.moduleType == 'LBPIC') {
              value.bigPicUrl = getImg(value.bigPicUrl)
              swipe.push(value)
            }
            return value
          })
        }
        return item
      })
      console.log(swipe,'swipeee')
      this.setData({
        newPros: this.data.newPros,
        swipeItems: swipe
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