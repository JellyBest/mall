// pages/search/search.js
import {
  post,
} from '../../api/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchParam: {
      productName: "",
      page: 1,
      size: 20
    }
  },
  onChange(e) {
    this.data.searchParam.productName = e.detail
    this.setData({
      searchParam: this.data.searchParam
    });
    console.log(this.data.searchParam)
  },
  seachName(e) {
    let name = e.currentTarget.dataset.name
    this.data.searchParam.productName = name
    this.setData({
      searchParam: this.data.searchParam
    })
    this.searchPost()
  },
  searchPost() {
    post("mini/getSearchProList.do", this.data.searchParam).then(res => {
      if (res.total > 0) {
        wx.navigateTo({
          url: '/pages/searchResult/searchResult?name=' + this.data.searchParam.productName,
        })
      }
      console.log(res, 'search')
    })
  },
  /**
   * 搜索
   */
  searchClick(e) {
    console.log(e)
    post("mini/getSearchProList.do", this.data.searchParam).then(res => {
      if (res.total > 0) {
        wx.navigateTo({
          url: '/pages/searchResult/searchResult?name=' + this.data.searchParam.productName,
        })
      }
      console.log(res, 'search')
    })
  },
  inputChange(e) {
    console.log(e, 'input')
    let value = e.detail.value
    this.data.searchParam.productName = value
  },
  getSearchNameList() {
    post("mini/getSearchNameList.do", {}).then(res => {
      console.log(res, 'se')
      this.setData({
        searchNames: res.searchNames
      })
    }).catch(err => {
      console.error(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSearchNameList()
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