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
        
        // 主要类结构图
        const offsetTop = 140
        const offsetLeft = 40
        const verticalGap = 20
        const fontSize = 12
        
        // 整个结构图都放在 structureGroup 内
        const structureGroup = new Group()
        structureGroup.x = 0
        structureGroup.y = 120
        // 画框
        const rect = new Shape()
        rect.graphics.strokeStyle('#999')
        .strokeRect(offsetLeft,  20, 295,  100)
        structureGroup.addChild(rect)
        // 舞台
        const textStage = new Text()
        textStage.x = offsetLeft
        textStage.text = 'Stage “舞台画布”'
        textStage.fontSize = fontSize
        structureGroup.addChild(textStage)

        // 父类
        const textDisplayObject = new Text()
        textDisplayObject.text = 'DisplayObject 类'
        textDisplayObject.fontSize = fontSize
        textDisplayObject.textAlign = 'center'
        textDisplayObject.x = stageWidth * .5
        textDisplayObject.y = fontSize + verticalGap
        structureGroup.addChild(textDisplayObject)

        // 竖线
        const verticalLine = new Shape()
        verticalLine.graphics
        .strokeStyle('#999')
        .moveTo(textDisplayObject.x , textDisplayObject.y + textDisplayObject.height + 4)
        .lineTo(textDisplayObject.x, textDisplayObject.height + textDisplayObject.y + 40)
        .stroke()
        structureGroup.addChild(verticalLine)

        // 五个一级子类名
        const classArr = ['Text 类', 'Image 类', 'Shape 类',  'Group 类', 'Sprite 类']
        const lineOffsetX = (stageWidth - 80) / classArr.length * .5
        // 集中放在一个 subClassGroup 内
        const subClassGroup = new Group()
        subClassGroup.x = 40
        subClassGroup.y = textDisplayObject.y + textDisplayObject.height + 20
        
        // 横线
        const hozLine = new Shape()
        hozLine.graphics
        .strokeStyle('#999')
        .moveTo(lineOffsetX, 4)
        .lineTo(stageWidth - 80 - 29.5, 4)
        .stroke()
        subClassGroup.addChild(hozLine)

        classArr.map((v,i) => {
          // 画连接向子类的竖线
          const x = 59 * i +lineOffsetX
          const y = verticalGap
          const line = new Shape()
          line.graphics
          .strokeStyle('#999')
          .moveTo(x, 4)
          .lineTo(x, y)
          .stroke()
          // 显示一级子类文本
          const t = new Text({text: v})
          t.textAlign = 'center'
          t.x = x
          t.y = y + 4
          subClassGroup.addChild(line, t)
        })
        
        structureGroup.addChild(subClassGroup)
        stage.addChild(structureGroup)
        
        
      }, this)
    })
    
  }
})
