import DuduCanvas from '../../libs/DuduCanvas.js'

Page({
  onLoad: function () {
    DuduCanvas.Stage('myCanvas', (stage, ctx) => {
      const g = DuduCanvas.Group()
      g.x = 375/2
      g.y = 200
      g.rotation = 45
      // const t0 = DuduCanvas.Text({font: 'italic 18px sans-serif'})
      // .fillStyle('red')
      // .fillText('你好嘟嘟-司机开车都在用的社交app')

      const t1 = DuduCanvas.Text()
      .fillStyle('green')
      .fillText('你好嘟嘟-司机开车都在用的社交app')
      // t1.textAlign = 'center'
      g.addChild(t1)
      
       
      
      
      console.log(g.getBound())
      stage.addChild(g)
      stage.render()
    }, this)
    
  }
})
