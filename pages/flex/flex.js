import { ImgLoader, Stage, Text, Flex, Image, Shape, Sprite} from '../../duducanvas/index'
Page({
  data:{
    tempPath: ''
  },
  onLoad: function () {
    new ImgLoader([
      {
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      }
    ])
    .then( loader => {
      new Stage('#myCanvas', stage => {    
        const flex = new Flex()
        // flex.direction = 'row'
        // flex.justifyContent = 'center'
        // flex.alignItems = 'center'
        // flex.x = 50
        // flex.y = 100
        flex.width = 375
        flex.height = 300
        

        flex.graphics.beginPath()
        flex.graphics.strokeRect(0, 0, flex.width, flex.height)
        
        const t1 = new Text()
        t1.fontSize = 20
        t1.text = '你好啊世界'

        flex.addChild(t1)

        // display: flex;
        // flex-wrap: wrap;
        // align-content: flex-start;
        // justify-content: center;

        for(let i=0;i<2;i++){
          const avatar = new Image({
            image: loader.get('avatar'),
            width: 20 * i +20, 
            height: 20 * i +20,
          })
          avatar.borderRadius = 3
          flex.addChild(avatar)
        }
        // flex.regX = 50
        // flex.regY = 50
        // flex.rotation = 40
        stage.addChild(flex)
      }, this)
    }) 
  }
})
