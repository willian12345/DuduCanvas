//index.js
//获取应用实例
const app = getApp()

import DuduCan from '../../libs/DuduCan.js'

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad: function () {
    new DuduCan.Stage('myCanvas', (ctx, stage)=>{
      let shape = new DuduCan.Shape()
      shape.graphics.beginFill('red').drawCircle(0, 0, 30)
      shape.x = 375/2
      shape.y = 130

      let container = new DuduCan.Container()
      container.x = 0
      container.y = 0
      container.addChild(shape)

      let shape1 = new DuduCan.Shape()
      shape1.graphics.beginFill('green').drawCircle(375/2, 130, 40)


      stage.addChild(shape1, container)
      
      stage.update()

    }, this)
  }
})
