import { ImgLoader, Stage, Text, Group, ImageDudu, Shape} from '../../duducanvas/index'
Page({
  onLoad: function () {
    new ImgLoader([
      {
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      }
    ])
    .done( loader => {
      new Stage('#myCanvas', stage => {

        const t1 = new Text()
        t1.color = '#cda79f'
        t1.text = 'DuduCanvas 示例'
        t1.fontSize = 20
        t1.x = 40
        t1.y = 40

        // 圆形用于遮罩
        const circle = new Shape()
        circle.graphics.fillCircle(50, 50, 50)

        const avatar = new ImageDudu({
          image: loader.get('avatar'),
          width: 100, 
          height: 100,
        })
        avatar.mask = circle // 给方形的头像设置圆形遮罩


        const name = new Text()
        name.color = '#6c5149'
        name.text = '龙傲天'
        name.textAlign = "center"
        name.x = avatar.width / 2
        name.y = 110

        const group = new Group()
        group.x = stage.width / 2
        group.y = 220
        group.regX = avatar.width / 2
        group.addChild(avatar, name)
        
        stage.addChild(t1, group)
        stage.render()
      }, this)
    })
    
  }
})
