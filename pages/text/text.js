/**
 * 单独引入需要使用的类，以便编译器实现树摇减小体积
 */
import { Stage, Text, Group } from '../../libs/index.js'

Page({
  onLoad: function () {
    console.log(Stage)
    new Stage('#myCanvas', (stage, ctx) => {
      const g = new Group()
      g.x = 375/2
      g.y = 200
      g.rotation = 45
      
      const t0 = new Text({font: 'italic 18px sans-serif'})
      t0.color = 'red'
      t0.text = '通过单独引用各个类的方式实现编码'

      const t1 = new Text()
      t1.color = 'green'
      t1.text = '你好嘟嘟-通过单独引用各个类的方式实现编码'
      g.addChild(t1)
      

      stage.addChild(t0, g)
      stage.render()
    }, this)
    
  }
})
