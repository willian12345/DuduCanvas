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
        shape.graphics.fillRoundRect(0, 0, 120, 120, 18)


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
        img.x = 100
        img.y = 100
        img.mask = shape
        img.regX = 60
        img.regY = 60
        // img.rotation = 50
        img.rotation = 10
        img.scaleX = 1.5
        img.scaleY = 1.5
        // stage.addChild(img)
        // console.log(img.x, img.y)
        const g = DuduCanvas.Group()
        g.x = 30
        g.y = 30

        const circle = DuduCanvas.Shape()
        circle.graphics.fillRoundRect(0, 0, 50, 20, 8, true)
        g.addChild(circle)
        console.log(g.width)
        console.log(img.getBounds())
        stage.addChild(img, g)
        stage.render()
      }, this)
    })
    
  }
})
