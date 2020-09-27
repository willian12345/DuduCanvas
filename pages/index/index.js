//index.js
import DuduCanvas from '../../libs/DuduCanvas.js'

Page({
  onLoad: function () {
    DuduCanvas.load([{
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
        // const shape = DuduCanvas.Shape()
        // shape.graphics.fillCircle(60,60,50)

        // const avatar = DuduCanvas.Image({
        //   image: loader.get('avatar'),
        //   width: 100,
        //   height: 100
        // })
        // avatar.regX = 60
        // avatar.regY = 60
        // avatar.x = 100
        // avatar.y = 100
        // avatar.rotation = 10


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
        img.regX = 100
        img.regY = 100
        // img.rotation = 45
        // img.mask = shape
        img.alpha = .5
        

        // const g = DuduCanvas.Group()
        // g.x = 40
        // g.y = 40

        // const g1 = DuduCanvas.Group()
        // g1.x = -40
        // g1.y = -40
        // g1.addChild(img)
        // g.addChild(g1)

        stage.addChild(img)

        stage.render()
      }, this)
    })
    
  }
})
