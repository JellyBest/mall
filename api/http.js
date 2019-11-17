import {domain} from './base.js'
console.log(domain)

export function post(url,data){
  const token = wx.getStorageSync("token")
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      header: {
        token
      },
      url: `${domain}${url}`,
      data,
      success: res => {
        resolve(res)
        if(res.data.respCode == "23249"){

        }else{
          resolve(res)
        }
      },
      fail: error => {
        
        reject(error)
      }
    })
  })
  
}