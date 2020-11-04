import { ImgLoader, Stage, Text, FlexContainer, Image, Shape, Sprite} from '../../duducanvas/index'
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
        const flexContainer = new FlexContainer()
        flexContainer.direction = 'row'
        flexContainer.alignItems = 'center'
        flexContainer.x = 0
        flexContainer.y = 0
        flexContainer.width = 375
        flexContainer.height = 300
        

        flexContainer.graphics.beginPath()
        flexContainer.graphics.strokeRect(0, 0, flexContainer.width, flexContainer.height)
        
        for(let i=0;i<2;i++){
          const avatar = new Image({
            image: loader.get('avatar'),
            width: 20 * i +20, 
            height: 20 * i +20,
          })
          flexContainer.addChild(avatar)
        }

        stage.addChild(flexContainer)
        
      }, this)
    }) 
  }
})
