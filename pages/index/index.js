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
        const shape = DuduCanvas.Shape()
        shape.graphics.fillRoundRect(0,0,60,60,10,false)

        const avatar = DuduCanvas.Image({
          image: loader.get('avatar'),
          width: 100,
          height: 100
        })
        avatar.regX = 60
        avatar.regY = 60
        avatar.x = 200
        avatar.y = 200
        avatar.rotation = 10

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
        img.regX = 60
        img.regY = 60
        img.rotation = 45
        img.mask = shape
        // img.rotation = 10
        // stage.addChild(img)
        
        
        const t1 = DuduCanvas.Text({
          text: '临感科技是一家由创新交互体验驱动的车辆网泛娱乐社交公司'
        })
        const g = DuduCanvas.Group()
        g.x = 40
        g.y = 40
        
        const g1 = DuduCanvas.Group()
        g1.x = -40
        g1.y = -40
        g1.addChild(avatar)
        g.addChild(t1)
        // const circle = DuduCanvas.Shape()
        // circle.graphics.fillRoundRect(0, 0, 50, 20, 8, true)
        g.addChild(g1, img)
        // console.log('width:', g.getWidth())
        stage.addChild(g)
        console.log(t1.getBound())
        stage.render()
      }, this)
    })
    
  }
})
