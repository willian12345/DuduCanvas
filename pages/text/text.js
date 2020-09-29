import DuduCanvas from '../../libs/DuduCanvas.js'

Page({
  onLoad: function () {
    DuduCanvas.Stage('myCanvas', (stage, ctx) => {
      const g = DuduCanvas.Group()
      g.x = 375/2
      g.y = 200
      g.rotation = 45
      
      const t0 = DuduCanvas.Text({font: 'italic 18px sans-serif'})
      t0.color = 'red'
      t0.text = '你好嘟嘟-司机开车都在用的社交app'

      const t1 = DuduCanvas.Text()
      t1.color = 'green'
      t1.text = '你好嘟嘟-司机开车都在用的社交app'
      g.addChild(t1)
      

      stage.addChild(t0, g)
      stage.render()
    }, this)
    
  }
})
