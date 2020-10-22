/**
 * 单独引入需要使用的类，以便编译器实现树摇减小体积
 */
import { Stage, Text, Group } from '../../duducanvas/index'

Page({
  onLoad: function () {
    new Stage('#myCanvas', (stage, ctx) => {

      const t0 = new Text({font: 'italic 18px sans-serif'})
      t0.color = 'red'
      // t0.text = '1.,文字竖排,从右向左, and hello 嘟嘟'
      t0.text = '1.1.2 文字竖排 abcABC s 地'
      t0.writeMode = 'vertical-rl'
      t0.x = 100
      t0.y = 20

      const t1 = new Text()
      t1.text = '你好嘟嘟-通过单独引用各个类的方式实现编码'

      stage.addChild(t0, t1)
    }, this)
  }
})
