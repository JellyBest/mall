import {domain} from './base.js'
//加密常量
import {apiConst} from './config.js'
//sha256加密算法
import { sha256_digest } from './sha256.js'
//post请求
export function post(url,data){
  const param = {
    msgSrc: "WUHANHONGYI" 
  }
  data = Object.assign(param, data)
  const token = wx.getStorageSync("token")
  const nonce = wx.getStorageSync("nonce")
  const timeStamp = new Date().getTime()
  let reqStr = JSON.stringify(data) + "|" + apiConst + "|" + token + "|" + timeStamp
  let sign = sha256_digest(reqStr)
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      header: {
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
            reject(res.data)
            console.error("token 过期")
          } else {
            reject(res.data)
          }
        }else{
          console.error(res)
        }
        
      },
      fail: error => {
        reject(error)
      }
    })
  })
  
}