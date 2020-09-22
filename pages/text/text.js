import DuduCanvas from '../../libs/DuduCanvas.js'

Page({
  onLoad: function () {
    DuduCanvas.Stage('myCanvas', (stage, ctx) => {
      const t0 = DuduCanvas.Text({font: 'italic 18px sans-serif'})
      .fillStyle('green')
      .fillText('余杭区')
      t0.x = 100
      t0.rotation = 45
      stage.addChild(t0)
      
      
      const t1 = DuduCanvas.Text({
        font: 'italic 18px sans-serif',
        text: '临感科技是一家由创新交互体验驱动的车辆网泛娱乐社交公司'
      })
      .setWrapWidth(100)
      t1.color = 'red'
      t1.x = 100
      t1.y = 100
      stage.addChild(t1)
      
      let t2 = DuduCanvas.Text({font: 'italic 18px sans-serif'})
      .setFillStyle('blue')
      .setTextBaseline('top')
      .setWrapWidth(200)
      .setTextAlign('left')
      .setLineDistance(6)
      .fillText(`精巧外观，符合人机工程学，舒适可控
      高性能芯片，续航3～6个月
      快速蓝牙响应，轻松控制行车模式
      `, 10, 100)
      stage.addChild(t2)

      stage.render()
    }, this)
    
  }
})
