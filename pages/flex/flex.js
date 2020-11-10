import { ImgLoader, Stage, Text, Container, Image} from '../../duducanvas/index'
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
        const container = new Container()
        // container.direction = 'row'
        // container.justifyContent = 'center'
        // container.alignItems = 'center'
        // container.x = 50
        // container.y = 100
        container.width = 375
        container.height = 300
        

        container.graphics.beginPath()
        container.graphics.strokeRect(0, 0, container.width, container.height)
        
        const t1 = new Text()
        t1.fontSize = 20
        t1.text = '你好啊世界'

        container.addChild(t1)

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
          container.addChild(avatar)
        }
        // container.regX = 50
        // container.regY = 50
        // container.rotation = 40
        stage.addChild(container)
      }, this)
    }) 
  }
})
