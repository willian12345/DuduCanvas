import { ImgLoader, Stage, Text, Group, ImageDudu, Shape, Sprite} from '../../duducanvas/index'
Page({
  onLoad: function () {
    new ImgLoader([
      {
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      }
    ])
    .then( loader => {
      new Stage('#myCanvas', stage => {

        const stageWidth = stage.width
        const stageHeight = stage.height
          
        const avatar = new ImageDudu({
          image: loader.get('avatar'),
          width: 40, 
          height: 40,
        })
        avatar.x = 20
        avatar.y = 20

        // 圆形用于遮罩
        const circle = new Shape()
        circle.graphics.fillCircle(avatar.width / 2, avatar.height / 2, avatar.width / 2)
        avatar.mask = circle // 给方形的头像设置圆形遮罩

        stage.addChild(avatar)

        
        // 主要类结构图
        
        const g = new Group()
        g.x = stageWidth * .5
        g.y = 140

        const textStage = new Text()
        textStage.text = 'Stage'
        textStage.fontSize = 20
        textStage.textAlign = 'center'

        const rect = new Shape()
        rect.graphics.strokeStyle('#999')
        .strokeRect(-textStage.width * .5,  0, textStage.width,  textStage.height)
        
        g.addChild(textStage, rect)
        stage.addChild(g)
        
        // const g1 = new Group()
        // g1.x = stageWidth * .5
        // g1.y = 140 + textStage.height

    
        
        

        const textDisplayObject = new Text()
        textDisplayObject.text = 'DisplayObject'
        textDisplayObject.fontSize = 20
        textDisplayObject.textAlign = 'center'
        textDisplayObject.x = stageWidth * .5
        textDisplayObject.y = 190
        const rectDisplayObject = new Shape()
        rectDisplayObject.graphics.strokeStyle('#999')
        .strokeRect(textDisplayObject.x - textDisplayObject.width * .5 , textDisplayObject.y, textDisplayObject.width, textDisplayObject.height)
        stage.addChild(textDisplayObject, rectDisplayObject)

        const textArr = ['']
        
        
        
      }, this)
    })
    
  }
})
