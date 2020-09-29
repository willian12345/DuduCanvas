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
      DuduCanvas.Stage('#myCanvas', (stage, ctx) => {
        let img = DuduCanvas.Image({
          image: loader.get('avatar'),
          sx: 300,
          sy: 0, 
          sWidth: 60, 
          sHeight: 60,
        })
    

        let sprite = DuduCanvas.Sprite(loader.get('btn1'), {left: 30, top: 33, right: 30, bottom: 33})
        sprite.x = 200
        sprite.y = 300
        sprite.regX = 346/2
        sprite.regY = 185/2
        sprite.scaleX = .5
        sprite.scaleY = .5
        sprite.width = 346
        sprite.height = 185
        sprite.rotation = 45

    
        
        let sprite1 = DuduCanvas.Sprite(loader.get('btn'))
        sprite1.setSlice({left: 147, top: 188, right: 101, bottom: 174})
        sprite1.scaleX = .5
        sprite1.scaleY = .5
        sprite1.width = 569
        sprite1.height = 600
    
        stage.addChild(img)
        stage.addChild(sprite)
        stage.addChild(sprite1)
        stage.render()
      })
    })
  }
})
