import {domain} from './base.js'
//加密常量
import {apiConst} from './config.js'
//sha256加密算法
import { sha256 } from './sha256.js'
//post请求
function showModal(info){
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: '提示',
      content: info,
      showCancel: false,
      success(res){
        if(res.confirm){
          resolve()
        }else{
          reject()
        }
      }
    })
  })
  
}
export function getImg(imgId){
  return `${domain}upload/downPic.do/${imgId}`
}
export function originPost(url,data){
  wx.showLoading({
    title: '加载中...',
  })
  const param = {
    msgSrc: "WUHANHONGYI"
  }
  data = Object.assign(param, data)
  
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url: `${domain}${url}`,
      data: JSON.stringify(data),
      success: res => {
        //更新nonce
        // const nonce = res.header.nonce
        // wx.setStorageSync("nonce", nonce)
        console.log(res, 'res')
        if (res.statusCode == 200) {
          if (res.data.respCode == "0000") {
            resolve(res.data)
          }
          else if (res.data.respCode == "23249") {
            wx.showModal({
              title: '提示',
              content: '登录已过期，重新登录',
              showCancel: false,
              success(res) {
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }
            })
            // showModal("登录已过期，重新登录")
            reject(res.data)
            // console.error("token 过期")
          } else {
            showModal(res.data.respInfo)
            reject(res.data)
          }
        } else {
          console.error(res)
        }
        wx.hideLoading()
      },
      fail: error => {
        wx.hideLoading()
        reject(error)
      }
    })
  })
}
export function post(url,data){
  wx.showLoading({
    title: '加载中...',
  })
  const param = {
    msgSrc: "WUHANHONGYI" 
  }
  data = Object.assign(param, data)
  const token = wx.getStorageSync("token")
  const nonce = wx.getStorageSync("nonce")
  const timeStamp = new Date().getTime()
  let reqStr = JSON.stringify(data) + "|" + apiConst + "|" + token + "|" + timeStamp
  let sign = sha256(reqStr)
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      header: {
        "content-type": "application/json;charset=UTF-8",
        token,
        reqTimeStamp: timeStamp,
        // nonce,
        sign
      },
      url: `${domain}${url}`,
      data: JSON.stringify(data),
      success: res => {
        //更新nonce
        // const nonce = res.header.nonce
        // wx.setStorageSync("nonce", nonce)
        console.log(res,'res')
        if(res.statusCode == 200){
          if (res.data.respCode == "0000") {
            resolve(res.data)
          }
          else if (res.data.respCode == "23249") {
            wx.showModal({
              title: '提示',
              content: '登录已过期，重新登录',
              showCancel: false,
              success(res){
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }
            })
            // showModal("登录已过期，重新登录")
            reject(res.data)
            // console.error("token 过期")
          } else {
            showModal(res.data.respInfo)
            reject(res.data)
          }
        }else{
          console.error(res)
        }
        wx.hideLoading()
      },
      fail: error => {
        wx.hideLoading()
        reject(error)
      }
    })
  })
}
export function uploadImg(url,file){
  const token = wx.getStorageSync("token")
  const nonce = wx.getStorageSync("nonce")
  const timeStamp = new Date().getTime()
  let reqStr ="SALE"+ "|" + apiConst + "|" + token + "|" + timeStamp
  let sign = sha256(reqStr)
  console.log(reqStr,':',sign)
  return new Promise((resolve,reject) => {
    wx.uploadFile({
      url: `${domain}${url}`,
      filePath: file.path,
      name: 'file',
      header: {
        // "content-type": "application/json;charset=UTF-8",
        token,
        reqTimeStamp: timeStamp,
        // nonce,
        sign
      },
      formData: { businType: "SALE" },
      success(res) {
        console.log(res)
        
        if(JSON.parse(res.data).code == 0){
          let fileList = []
          fileList.push({ ...file,uuid: JSON.parse(res.data).uuid, url: getImg(JSON.parse(res.data).uuid)});
          // this.setData({ fileList });
          resolve(fileList)
        }else{
          showModal(res.data.respInfo)
          reject(res)
        }
      },
      fail(res){
        reject(res)
      }
    });
  })
  
}