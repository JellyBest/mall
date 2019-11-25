// pages/editAddress/editAddress.js
import { post } from '../../api/http.js'
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressDetail: "",
    receiveName: "",
    receiveMobile: "",
    isDefault: "",
    districts: [],
    districtArray: [],
    districtIndex: null,
    provinceIndex: null,
    provinceArray: [],
    provinces: [],
    cities: [],
    cityArray: [],
    cityIndex: null,
    array: ['美国', '中国', '巴西', '日本'],
    index: null,
  },
  bindProvinceChange(e) {
    this.setData({
      provinceIndex: e.detail.value
    })
    this.getCity()
    console.log(e, 'p')
  },
  bindCityChange(e) {
    this.setData({
      cityIndex: e.detail.value
    })
    // this.getCity()
    this.getDistrict()
    console.log(e, 'p')
  },
  bindDistrictChange(e) {
    this.setData({
      districtIndex: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },
  getProvince() {
    post("address/address.do", {
      type: "province",
    }).then(res => {
      let arr = res.addressList.map(item => {
        return item.name
      })
      this.setData({
        provinces: res.addressList,
        provinceArray: arr
      })
    }).catch(err => {
      console.error(err)
    })
  },
  getCity() {
    post("address/address.do", {
      type: "city",
      provinceCode: this.data.provinces[this.data.provinceIndex].code
    }).then(res => {
      let arr = res.addressList.map(item => {
        return item.name
      })
      this.setData({
        cities: res.addressList,
        cityArray: arr
      })
    })
  },
  getDistrict() {
    post("address/address.do", {
      type: "district",
      cityCode: this.data.cities[this.data.cityIndex].code
    }).then(res => {
      let arr = res.addressList.map(item => {
        return item.name
      })
      this.setData({
        districts: res.addressList,
        districtArray: arr
      })
    })
  },
  switchChange(e) {
    this.setData({
      isDefault: e.detail.value
    })
    console.log(e)
  },
  /**
   * addClick确认添加地址
   */
  addClick() {
    post("address/wxUserAddress.do", {
      type: 1,
      provinceCode: this.data.provinces[this.data.provinceIndex].code,
      cityCode: this.data.cities[this.data.cityIndex].code,
      districCode: this.data.districts[this.data.districtIndex].code,
      addressDetail: this.data.addressDetail,
      isDefault: this.data.isDefault ? 1 : 0,
      receiveName: this.data.receiveName,
      receiveMobile: this.data.receiveMobile,
    })
  },
  inputChange(e) {
    let name = e.currentTarget.dataset.name
    let value = e.detail.value
    this.setData({
      [name]: value
    })
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvince()
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