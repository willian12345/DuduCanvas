/**
 * 单独引入需要使用的类，以便编译器实现树摇减小体积
 */
import { Stage, Text, Group } from '../../duducanvas/index'

Page({
  onLoad: function () {
    new Stage('#myCanvas', (stage, ctx) => {

      const t0 = new Text({font: 'italic 18px sans-serif'})
      t0.color = 'red'
      t0.lineGap = 10 // 行间距
      t0.writeMode = 'vertical-lr'
      t0.text = '通过 vertical-rl 可实现文字竖排'
      t0.x = 100
      t0.y = 20
      t0.wrapHeight = 200
      console.log(t0.width)

      const t1 = new Text()
      t1.text = '你好嘟嘟-通过单独引用各个类的方式实现编码'
      t1.wrapWidth = 100
      console.log(t1.height)

      stage.addChild(t0, t1)
    }, this)
  }
})
