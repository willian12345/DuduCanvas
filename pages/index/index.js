import DuduCanvas from '../../libs/DuduCanvas.js'

Page({
  onLoad: function () {
    DuduCanvas.load([{
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      }
    ])
    .done( loader => {
      DuduCanvas.Stage('#myCanvas', stage => {

        const t1 = DuduCanvas.Text()
        t1.color = '#cda79f'
        t1.text = 'DuduCanvas 示例'
        t1.fontSize = 20
        t1.x = 40
        t1.y = 40


        let avatar = DuduCanvas.Image({
          image: loader.get('avatar'),
          width: 100, 
          height: 100,
        })

        let name = new DuduCanvas.Text()
        name.color = '#6c5149'
        name.text = '龙傲天'
        name.textAlign = "center"
        name.x = avatar.width / 2
        name.y = 110

        let group = DuduCanvas.Group()
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
