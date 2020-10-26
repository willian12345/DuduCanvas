import { ImgLoader, Stage, Image, Sprite, Text } from '../../duducanvas/index'

Page({
  onLoad: function () {
    // 例子按钮图片来自 LayaAir
    new ImgLoader([
      {
        id: 'button',
        src: '/image/button.png'
      }
    ])
    .then( loader => {
      new Stage('#myCanvas', stage => {

        

        // 原始按钮大小
        const button = new Image({
          image: loader.get('button'),
          width: 128, 
          height: 64
        })
        button.x = stage.width / 2 - button.width / 2
        button.y = 80
        const t1 = new Text({text: '原始按钮大小'})
        t1.fontSize = 14
        t1.textAlign = 'center'
        t1.x = button.width * .5
        t1.y = button.height * .5 - (t1.height * .5)
        button.addChild(t1)
        
        // 九宫格按钮，可随意拉升宽高示例
        const bigButton = new Sprite(loader.get('button'))
        bigButton.sliceBounds = {left: 29, top: 21, right: 23, bottom: 24}
        bigButton.x = stage.width * .5
        bigButton.y = 280
        bigButton.width = 288
        bigButton.height = 80
        bigButton.regX = bigButton.width * .5
        bigButton.regY = bigButton.height * .5

        const t2 = new Text({text: '九宫格拉伸按钮'})
        t2.fontSize = 20
        t2.textAlign = 'center'
        t2.x = bigButton.width * .5
        t2.y = bigButton.height * .5 - (t2.height * .5)
        bigButton.addChild(t2)

        stage.addChild(button, bigButton)
      })
    })
  }
})
