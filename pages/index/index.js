//index.js
import DuduCanvas from '../../libs/DuduCanvas.js'
import { findNodes }  from '../../libs/utils'

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
        const stageWidth = 375

        
        const handle1 = DuduCanvas.Shape()
        handle1.graphics.fillStyle('red')
        handle1.graphics.fillRect(0, 0, 10, 10)
        handle1.x = 0
        handle1.y = 0
        handle1.width = 10
        handle1.height = 10
        
        const handle2 = DuduCanvas.Shape()
        handle2.graphics.fillStyle('red')
        handle2.graphics.fillRect(0, 0, 10, 10)
        handle2.x = 110
        handle2.y = 0
        handle2.width = 10
        handle2.height = 10

        const handle3 = DuduCanvas.Shape()
        handle3.graphics.fillStyle('red')
        handle3.graphics.fillRect(0, 0, 10, 10)
        handle3.x = 110
        handle3.y = 110
        handle3.width = 10
        handle3.height = 10

        const handle4 = DuduCanvas.Shape()
        handle4.graphics.fillStyle('red')
        handle4.graphics.fillRect(0, 0, 10, 10)
        handle4.x = 0
        handle4.y = 110
        handle4.width = 10
        handle4.height = 10


        const point = DuduCanvas.Shape()
        point.graphics.fillStyle('green')
        point.graphics.fillRect(0, 0, 10, 10)
        point.width = 10
        point.height = 10

        const g = DuduCanvas.Group()
        g.x = stageWidth / 2
        g.y = stageWidth / 2
        g.regX = 60
        g.regY = 60
        g.rotation = 45
        const avatar = DuduCanvas.Image({
          image: loader.get('avatar'),
          width: 100,
          height: 100
        })
        avatar.x = 10
        avatar.y = 10
        g.addChild(avatar, handle1, handle2, handle3, handle4, point)

        
        point.x = 120/2 - 5
        point.y = 120/2 - 5

        // const groupBound = g.getBound()
        // console.log(groupBound)
        // const rect = DuduCanvas.Shape()
        // rect.graphics.fillStyle('blue')
        // .fillRect(0, 0, groupBound.width, groupBound.height)
        // rect.regX = groupBound.width / 2
        // rect.regY = groupBound.height / 2
        // rect.x = groupBound.left + rect.regX
        // rect.y = groupBound.top + rect.regY
        // rect.width = groupBound.width
        // rect.height = groupBound.height
        // rect.rotation = 45
        // console.log(rect.getBound())



        // const img = DuduCanvas.Image({
        //   image: loader.get('health'),
        //   sx: 0,
        //   sy: 0, 
        //   sWidth: 72, 
        //   sHeight: 72,
        //   dx: 0, 
        //   dy: 0, 
        //   dWidth: 120,
        //   dHeight: 120
        // })
        // img.x = 200
        // img.y = 200
        // img.regX = 60
        // img.regY = 60
        // img.rotation = 45
        // img.mask = shape
        // img.alpha = .5
        

        // const g = DuduCanvas.Group()
        // g.x = 40
        // g.y = 40

        // const g1 = DuduCanvas.Group()
        // g1.x = -40
        // g1.y = -40
        // g1.addChild(img)
        // g.addChild(g1)
        // g.rotation = 45
        stage.addChild(g)
        stage.render()
        
        setInterval(()=>{
          g.rotation += 2
          stage.render()
        }, 16)
      }, this)
    })
    
  }
})
