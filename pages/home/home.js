// pages/home/home.js
import { post } from '../../api/http.js'
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
  getPro(code){
    return new Promise( (resolve,reject) => {
      post("mini/getModuleProList.do", {
        moduleCode: code,
        page:1,
        size:3
      }).then(res => {
        resolve(res.data.data?res.data.data:"")
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
      console.log(res)
      this.data.newPros = res
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
      let data = res.data.data.moduleDtoList
      console.log(data)
      let newPros = data.filter(item => {
        return item.moduleType == "NEW_PRO"
      })
      this.setData({
        newPros: newPros
      })
      let arr = newPros.map(item => {
        return item.moduleCode
      })
      this.getProducts(arr)

    })
  },

  getModuleProList(){
    post("mini/getModuleProList.do",{
      moduleCode: "1573962858735",
      page: 1,
      size: 10
    }).then(res => {
      console.log(res)
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