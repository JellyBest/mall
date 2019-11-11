// pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "../../../assets/carrot.png",
    active: 0,
    cateList: [
      {
        categoryCode: "1",
        categoryName: "时令蔬菜"
      },
      {
        categoryCode: "2",
        categoryName: "时令蔬菜"
      },
      {
        categoryCode: "3",
        categoryName: "时令蔬菜"
      },
      {
        categoryCode: "4",
        categoryName: "时令蔬菜"
      },
      {
        categoryCode: "5",
        categoryName: "时令蔬菜"
      }
    ]
  },
  changeTab(e){
    let code = e.currentTarget.dataset.code
    this.setData({
      active: code
    })
    console.log(e)
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
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