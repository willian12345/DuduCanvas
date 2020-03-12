//index.js
//获取应用实例
const app = getApp()

import DuduCan from '../../libs/DuduCan.js'

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad: function () {
    let t = DuduCan.load([
      'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132',
      '/image/health-bad.png'
    ])
    .loading( percent => {
      console.log(percent)
    })
    .done(() => {
      new DuduCan.Stage('myCanvas', (ctx, stage) => {
        let img = new DuduCan.Image({
          path: '/image/health-bad.png',
          sx: 0,
          sy: 0, 
          sWidth: 72, 
          sHeight: 72,
          dx: 0, 
          dy: 0, 
          dWidth: 120,
          dHeight: 120
        })
        img.x = 100
        img.y = 100

        stage.addChild(img)
        stage.update()
      
        // setInterval(()=>{
        //   img.y += 1
        //   stage.update()
        // }, 100)
        
      }, this)
    })
    console.log(t)
  }
})
