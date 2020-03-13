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
        // let img = new DuduCan.Image({
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
        // img.x = 100
        // img.y = 100
        let img = new DuduCan.Image({
          image: loader.get('btn1'),
          sx: 0,
          sy: 0, 
          sWidth: 346, 
          sHeight: 85,
          dx: 0, 
          dy: 100, 
          dWidth: 346,
          dHeight: 85
        })


        let sprite = new DuduCan.Sprite(loader.get('btn1'))
        sprite.setSlice(30, 33, 30, 33)
        sprite.width = 346
        sprite.height = 185

        
        let sprite1 = new DuduCan.Sprite(loader.get('btn'))
        sprite1.setSlice(147, 188, 101, 174)
        sprite1.scaleX = .5
        sprite1.scaleY = .5
        sprite1.width = 569
        sprite1.height = 600
        // sprite1.x = 200
        // sprite1.y = 100

        // stage.addChild(img)
        stage.addChild(sprite)
        stage.addChild(sprite1)
        stage.update()
      
        // setInterval(()=>{
        //   img.y += 1
        //   stage.update()
        // }, 100)
        
      }, this)
    })
    
  }
})
