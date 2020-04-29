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
    .done( loader => {
      DuduCan.Stage('myCanvas', (stage, ctx) => {
        const container = DuduCan.Container()
        container.x = 120
        container.y = 120
        container.rotation = 90
        container.regX = 60
        container.regY = 60
        const shape = DuduCan.Shape()
        shape.graphics.fillStyle('red')
        shape.graphics.fillCircle(60, 60, 40)

        const img = DuduCan.Image({
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
        

        const rect = DuduCan.Shape()
        rect.graphics
        .fillStyle('red')
        .fillRect(10, 10, 100, 50)
        .fillStyle('yellow')
        .fillCircle(-20, 120, 30, 40)
        .fillStyle('green')
        .fillRect(220, 220, 20, 20)
        stage.addChild(rect)
        stage.addChild(img)

        let sprite = DuduCan.Sprite(loader.get('btn1'))
        sprite.setSlice(30, 33, 30, 33)
        sprite.width = 346
        sprite.height = 185
        sprite.scaleX = .5
        sprite.scaleY = .5
        sprite.x = 150
        sprite.rotation = 10
        sprite.y = 220

        const t0 = DuduCan.Text({font: 'italic 18px sans-serif'})
        .fillStyle('green')
        .fillText('余杭区')
        sprite.addChild(t0)
        stage.addChild(sprite)
        
        
        const t1 = DuduCan.Text({
          font: 'italic 18px sans-serif',
          text: '你好因s你而美丽阑珊春意秋意浓常用要地人地要w-寺s ff'
        })
        .setWrapWidth(100)
        t1.color = 'red'
        t1.x = 100
        t1.y = 300
        stage.addChild(t1)

        stage.render()
        
      }, this)
    })
    
  }
})
