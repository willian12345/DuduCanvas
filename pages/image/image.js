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
        id: 'button',
        src: '/image/button.png'
      },{
        id: 'btn',
        src: '/image/btn.png'
      }
    ])
    .done( loader => {
      DuduCanvas.Stage('#myCanvas', (stage, ctx) => {
        let img = DuduCanvas.Image({
          image: loader.get('avatar'),
          width: 45, 
          height: 45,
        })
        
        let sprite = DuduCanvas.Sprite(loader.get('button'), {left: 29, top: 21, right: 23, bottom: 24})
        sprite.x = 375 / 2
        sprite.y = 300
        sprite.regX = 328/2
        sprite.regY = 64/2
        sprite.width = 328
        sprite.height = 104
    
        stage.addChild(img)
        stage.addChild(sprite)
        stage.render()
      })
    })
  }
})
