// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "",
  },
  code: "",
  fullUserInfo: {},
  getLogin(){
    wx.request({
      method: 'POST',
      url: 'http://monkeyhao.easy.echosite.cn/api/login/loginByWeiXin.do',
      data: {
        code: this.code,
        userInfo: this.fullUserInfo
      },
      success: res =>{
        // const nonce = res.header.nonce
        // wx.setStorageSync("nonce", nonce)
        if (res.statusCode == 200 && res.data.respCode == "0000"){
          wx.setStorageSync("token", res.data.data.token)
          wx.setStorageSync("code", res.data.data.userCode)
          this.goNext()
        }
        console.log(res,'login')
      }
    })
  },
  getUserInfo(){
    this.login().then(res => {
      this.getInfo().then(res => {
        this.getLogin()
      })
    })
    console.log('ui')
    
  },
  getInfo(){
    return new Promise((resolve,reject) => {
      wx.getUserInfo({
        success: res => {
          this.fullUserInfo = res
          resolve(res)
          console.log(res, 'userInfo')
        },
        fail: error => {
          reject(error)
          console.log(error, 'er')
        }
      })
    })
    
  },
  login(){
    return new Promise((resolve,reject)=>{
      wx.login({
        success: res => {
          this.code = res.code
          resolve(this.code)
        },
        fail: error => {
          reject(error)
        }
      })
    })

  },
  //初始化页面
  initPage() {
    let token = wx.getStorageSync("token")
    if(token){
      this.getUserInfo()
    }
    console.log(token,'token')
    //login
    //跳转到首页
    setTimeout(() => {
      // this.goNext()
    }, 1000)
    // this.goNext()
  },
  goNext() {
    console.log(345)
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initPage()
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