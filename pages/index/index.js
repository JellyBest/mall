//index.js
import {
  domain
} from "../../api/base.js"
import {
  originPost,
  getImg
} from '../../api/http.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    storeInfo: {},

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  code: "",
  fullUserInfo: {},
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  async getStoreInfo() {
    let result = await originPost("/login/getMerchant.do")
    let storeInfo = result.data.merchant
    let pics = storeInfo.picUuid.split(',').map(item => {
      return getImg(item)
    })
    let merchantLogoPic = getImg(storeInfo.merchantLogoPic)
    let backPic = getImg(storeInfo.backPic)
    storeInfo.pics = pics
    storeInfo.merchantLogoPic = merchantLogoPic
    storeInfo.backPic = backPic
    this.setData({
      storeInfo: storeInfo
    })

    console.log(pics, 'sr')
  },
  onLoad: function() {
    this.getStoreInfo()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getLogin() {
    wx.request({
      method: 'POST',
      url: domain + 'login/loginByWeiXin.do',
      data: {
        code: this.code,
        userInfo: this.fullUserInfo
      },
      success: res => {
        // const nonce = res.header.nonce
        // wx.setStorageSync("nonce", nonce)
        if (res.statusCode == 200) {
          if (res.data.respCode == "0000") {
            wx.setStorageSync("token", res.data.data.token)
            wx.setStorageSync("code", res.data.data.userCode)
            app.globalData.userInfo = res.data.data.userInfo
            this.goNext()
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.respInfo,
              showCancel: false
            })
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '网络错误',
            showCancel: false
          })
        }
        // if (res.statusCode == 200 && res.data.respCode == "0000") {
        //   wx.setStorageSync("token", res.data.data.token)
        //   wx.setStorageSync("code", res.data.data.userCode)
        //   app.globalData.userInfo = res.data.data.userInfo
        //   this.goNext()
        // }else{
        //   wx.showModal({
        //     title: '提示',
        //     content: res.data.respInfo,
        //   })
        // }
        console.log(res, 'login')
      }
    })
  },
  goNext() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  getInfo() {
    return new Promise((resolve, reject) => {
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
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          this.code = res.code
          resolve(this.code)
        },
        fail: error => {
          wx.showModal({
            title: '提示',
            content: error,
          })
          reject(error)
        }
      })
    })
  },
  getUserInfo: function(e) {
    this.login().then(res => {
      this.getInfo().then(res => {
        this.getLogin()
      })
    })
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  }
})