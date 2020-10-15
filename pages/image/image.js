import DuduCanvas from '../../libs/DuduCanvas.js'

Page({
  onLoad: function () {
    DuduCanvas.load([{
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      },{
        id: 'button',
        src: '/image/button.png'
      }
    ])
    .done( loader => {
      DuduCanvas.Stage('#myCanvas', (stage, ctx) => {
        let img = DuduCanvas.Image({
          image: loader.get('avatar'),
          width: 45, 
          height: 45,
        })
        
        //九宫格按钮，可随意拉升宽高示例
        let sprite = DuduCanvas.Sprite(loader.get('button'), {left: 29, top: 21, right: 23, bottom: 24})
        sprite.x = stage.width / 2
        sprite.y = stage.width / 2
        sprite.width = 328
        sprite.height = 104
        sprite.regX = sprite.width / 2
        sprite.regY = sprite.height / 2
        stage.addChild(img, sprite)
        stage.render()
      })
    })
  }
})
