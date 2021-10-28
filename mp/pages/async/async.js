import { DuduCanvas } from '../../src/index.js'
let timer
Page({
  onLoad: function () {
    console.log(DuduCanvas)
    DuduCanvas.load([{
        id: 'avatar',
        src: '/image/132.jpeg'
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
        avatar.borderRadius = '10 40 10'

        stage.addChild(avatar)

        // 异步更改属性后需要调用 stage.update() 方法
        timer = setInterval(() => {
          avatar.rotation += 2
          stage.update()
        }, 400)

      }, this)
    })
  },
  onUnload(){
    if(timer){
      clearInterval(timer)
    }
  }
})
