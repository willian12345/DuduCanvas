//index.js
import DuduCanvas from '../../libs/DuduCanvas.js'

Page({
  onLoad: function () {
    let t = DuduCanvas.load([{
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
      DuduCanvas.Stage('myCanvas', (stage, ctx) => {
        
        const shape = DuduCanvas.Shape()
        shape.graphics.fillStyle('red')
        shape.graphics.fillRoundRect(20, 20, 60, 60, 8)
        shape.regX = 0
        shape.regY = 0


        const img = DuduCanvas.Image({
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
        // img.rotation = 45

        // stage.addChild(img)

        const g = DuduCanvas.Container()
        g.x = 30
        g.y = 30

        const circle = DuduCanvas.Shape()
        circle.graphics.fillCircle(0, 0, 30)
        g.addChild(circle, img)
        stage.addChild(g)
        stage.render()
      }, this)
    })
    
  }
})
