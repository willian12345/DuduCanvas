import DuduCanvas from '../../duducanvas/DuduCanvas.js'

Page({
  onLoad: function () {
    DuduCanvas.load([{
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      }
    ])
    .then( loader => {
      DuduCanvas.Stage('#myCanvas', stage => {

        const avatar = DuduCanvas.Image({
          image: loader.get('avatar'),
          width: 100,
          height: 100
        })
        avatar.x = stage.width / 2
        avatar.y = stage.width / 2
        avatar.regX = 50
        avatar.regY = 50

        stage.addChild(avatar)

        // 异步更改属性后需要调用 stage.update() 方法
        setInterval(() => {
          avatar.rotation += 2
          stage.update()
        }, 16)

      }, this)
    })
    
  }
})
