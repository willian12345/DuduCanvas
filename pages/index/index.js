//index.js
//获取应用实例
const app = getApp()

import DuduCan from '../../libs/DuduCan.js'

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad: function () {
    let t = DuduCan.load([{
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      },{
        id: 'health',
        src: '/image/health-bad.png'
      },{
        id: 'btn1',
        src: '/image/btn1.png'
      },{
        id: 'btn',
        src: '/image/btn.png'
      }
    ])
    .done((loader) => {
      new DuduCan.Stage('myCanvas', (ctx, stage) => {
        const container = new DuduCan.Container()
        container.x = 120
        container.y = 120
        container.regX = 60
        container.regY = 60
        // container.rotation = 40
        const shape = new DuduCan.Shape()
        shape.graphics.fillStyle('red')
        shape.graphics.fillCircle(60, 60, 40)

        const img = new DuduCan.Image({
          image: loader.get('health'),
          sx: 0,
          sy: 0, 
          sWidth: 72, 
          sHeight: 72,
          dx: 0, 
          dy: 0, 
          dWidth: 120,
          dHeight: 120
        })
        img.mask = shape
        img.x = 100
        img.y = 100
        img.regX = 60
        img.regY = 60
        img.rotation = 90
        // container.addChild(img)
        stage.addChild(img)

        const rect = new DuduCan.Shape()
        rect.graphics
        .fillStyle('green')
        .fillRect(10, 10, 100, 50)
        stage.addChild(rect)



        stage.update()
        
        
        // let i = 1
        // setInterval(()=>{
        //   i+=8
        //   container.rotate = i * Math.PI / 180
        //   stage.update()
        // }, 16)
        
      }, this)
    })
    
  }
})
