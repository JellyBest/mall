// components/tab-bar/tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // active: 2
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(val){
      console.log(val)
      this.triggerEvent('changeTab', val)
    }
  }
})
