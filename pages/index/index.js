//index.js
import DuduCanvas from '../../libs/DuduCanvas.js'
import ImgLoader from '../../libs/ImgLoader.js'
import { findNodes }  from '../../libs/utils'

Page({
  onLoad: function () {
    DuduCanvas.load([{
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      },{
        id: 'health',
        src: '/image/health-bad.png'
      },{
        id: 'btn1',
        src: '/image/btn1.png'
      },{
        id: 'btn',
        src: '/image/btn.png'
      }
    ])
    .done( loader => {
      DuduCanvas.Stage('myCanvas', (stage, ctx) => {
        const stageWidth = 375

        const t1 = DuduCanvas.Text()
        t1.color = 'green'
        t1.text = 'DuduCanvas 示例'
        t1.textAlign = 'center'
        t1.fontSize = 20
        t1.x = stageWidth / 2
        t1.y = 120

        let img = DuduCanvas.Image({
          image: loader.get('avatar'),
          width: 100, 
          height: 100,
        })

        stage.addChild(t1, img)
        stage.render()
      }, this)
    })
    
  }
})
