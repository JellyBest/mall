// pages/cate/cate.js
const Toast = getApp().globalData.Toast
import { post, getImg } from '../../api/http.js'
import { moneyFormat } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "../../../assets/carrot.png",
    showDefault: false,
    active: "",
    cateList: [],
    proList: []
  },
  changeTab(e){
    let code = e.currentTarget.dataset.code
    this.setData({
      active: code
    })
    this.getCatePro(code)
  },
  //加入购物车
  addToCar(e){
    let code = e.currentTarget.dataset.code
    post("shopCar/putProToShopCar.do",{
      userCode: wx.getStorageSync("code"),
      productCode: code,
      amount: 1,
      putType: "fromPro"
    }).then(res => {
        Toast("添加成功")
    }).catch(err=>{
      console.error(err)
    })
  },
  // 获取分类下商品
  getCatePro(code){
    post("category/getCategoryProList.do",{
      categoryCode: code,
      page: 1,
      size: 20,
      orderByPrice: 1
    }).then(res => {
      let data = res.productDtoList
      data = data.map(item => {
        item.titlePic = getImg(item.titlePic)
        item.oldPrice = moneyFormat(item.oldPrice)
        item.price = moneyFormat(item.price)
        return item
      })
      if(data.length == 0){
        this.setData({
          showDefault: true
        })
      }else{
        this.setData({
          showDefault: false
        })
      }
      this.setData({
        proList: data
      })
    })
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  },
  initData(){
    let code = this.data.cateList[0].categoryCode
    this.setData({
      active: code
    })
    this.getCatePro(code)
  },
  getCateList(){
    post("category/getCategoryList.do",{}).then(res => {
      this.setData({ cateList: res.categoryDtoList})
      this.initData()
    }).catch(err => {
      console.error(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getCateList()
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
    this.getCateList()
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