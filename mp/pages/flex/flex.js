import { ImgLoader, Stage, Text, Container, Image, Shape} from '../../src/index'
Page({
  data:{
    tempPath: ''
  },
  onLoad: async function () {
    const stage = await new Stage('#myCanvas', {width: 375, height: 400}, this)
    const loader = await new ImgLoader(stage.canvas, [
      {
        id: 'avatar',
        src: '/image/132.jpeg'
      }
    ])
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
        image: loader.get('avatar').image,
        width: 20 * i +20, 
        height: 20 * i +20,
      })
      if(i == 1){
        avatar.borderRadius = '100%'
        avatar.alpha = .5
        avatar.border = '4 solid blue'
      }
      container.addChild(avatar)
    }

    const t2 = new Text()
    t2.fontSize = 30
    t2.text = '上将村'

    const subContainer = new Container()
    subContainer.width = 120
    subContainer.height = 40
    subContainer.borderRadius = 20
    subContainer.border = '2 solid red'
    subContainer.backgroundColor = '#999'
    subContainer.addChild(t2)
    
    container.addChild(subContainer)

    stage.addChild(container)
    stage.update();
  }
})
