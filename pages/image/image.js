import { ImgLoader, Stage, Image, Sprite, Text } from '../../duducanvas/index.js'

Page({
  onLoad: function () {
    // 例子按钮来自 LayaAir
    new ImgLoader([
      {
        id: 'button',
        src: '/image/button.png'
      }
    ])
    .done( loader => {
      new Stage('#myCanvas', stage => {
        
        // 原始按钮大小
        let button = new Image({
          image: loader.get('button'),
          width: 128, 
          height: 64
        })
        button.x = stage.width / 2 - button.width / 2
        button.y = 80

        const t1 = new Text({text: '原始按钮大小'})
        t1.x = button.x
        t1.y = button.y + button.height + 10
        
        
        
        // 九宫格按钮，可随意拉升宽高示例
        let sprite = new Sprite(loader.get('button'), {left: 29, top: 21, right: 23, bottom: 24})
        sprite.x = stage.width / 2
        sprite.y = 280
        sprite.width = 328
        sprite.height = 104
        sprite.regX = sprite.width / 2
        sprite.regY = sprite.height / 2

        const t2 = new Text({text: '变成九宫格按钮，可拉伸'})
        t2.textAlign = 'center'
        t2.x = sprite.x
        t2.y = sprite.y + sprite.height

        stage.addChild(button, t1, sprite, t2)
        stage.render()
      })
    })
  }
})
