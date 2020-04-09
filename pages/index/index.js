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
        container.rotation = 90
        container.regX = 60
        container.regY = 60
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
        img.regX = 60
        img.regY = 60
        img.y = 0
        img.x = 110
        img.rotation = 180
        stage.addChild(container)

        const rect = new DuduCan.Shape()
        rect.graphics
        .fillStyle('green')
        .fillRect(10, 10, 100, 50)
        .fillStyle('yellow')
        .fillCircle(-20, 120, 30, 40)
        // .fillRect(220, 220, 20, 20)
        stage.addChild(rect, img)

        let sprite = new DuduCan.Sprite(loader.get('btn1'))
        sprite.setSlice(30, 33, 30, 33)
        sprite.width = 346
        sprite.height = 185
        sprite.scaleX = sprite.scaleY = .5
        sprite.x = 150
        sprite.rotation = 10
        sprite.y = 200
        stage.addChild(sprite)
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
