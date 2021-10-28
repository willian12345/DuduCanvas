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

        const name = new DuduCanvas.Text()
        name.color = '#6c5149'
        name.text = '龙傲天'
        name.textAlign = "center"
        name.x = avatar.width * .5
        name.y = 110

        stage.addChild(avatar, name)

        // 异步更改属性后需要调用 stage.update() 方法
        timer = setInterval(() => {
          avatar.rotation += 2
          // 文本由于bug无法清除
          // 需要测试新的 canvs2d 是否解决了 bug 
          // https://developers.weixin.qq.com/community/develop/article/doc/000242073903a04e082ab595b52013
          name.text = '6000000000'
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
