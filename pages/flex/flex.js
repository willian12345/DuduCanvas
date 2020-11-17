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
        // container.alignItems = 'center'
        container.justifyContent = 'space-around'
        container.x = 0
        container.y = 0
        container.width = 375
        container.height = 300
        container.backgroundColor = 'green'
        
        const t1 = new Text()
        t1.fontSize = 20
        t1.text = '你好啊世界'

        container.addChild(t1)

        for(let i=0;i<2;i++){
          const avatar = new Image({
            image: loader.get('avatar'),
            width: 20 * i +20, 
            height: 20 * i +20,
          })
          avatar.borderRadius = 4
          container.addChild(avatar)
        }

        const t2 = new Text()
        t2.fontSize = 30
        t2.text = '上将村'

        const subContainer = new Container()
        subContainer.width = 120
        subContainer.height = 80
        subContainer.borderRadius = 20
        subContainer.backgroundColor = '#999'
        subContainer.addChild(t2)
        
        container.addChild(subContainer)

        stage.addChild(container)
      }, this)
    }) 
  }
})
