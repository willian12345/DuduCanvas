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
      shape.graphics.fillStyle('red').fillCircle(30, 30, 30)

      // let container = new DuduCan.Container()
      // container.x = 0
      // container.y = 0
      // container.addChild(shape)

      // let shape1 = new DuduCan.Shape()
      // shape1.graphics.fillStyle('green').fillCircle(375/2, 130, 40)

      // stage.addChild(shape1, container)

      // let rect = new DuduCan.Shape()
      // rect.graphics.fillStyle('yellow').fillRect(0, 100, 100, 40)
      // let rect1 = new DuduCan.Shape()
      // rect1.graphics.strokeStyle('green').strokeRect(20, 110, 100, 10)

      // let path = new DuduCan.Shape()
      // path.x = 200
      // path.y = 200
      // path.graphics
      // .strokeStyle('red')
      // .beginPath()
      // .moveTo(75, 50)
      // .lineTo(100, 75)
      // .lineTo(100, 25)
      // .fill()


      // for(var i=0;i<4;i++){
      //  for(var j=0;j<3;j++){
      //     let path = new DuduCan.Shape()
      //     path.x = 100
      //     path.y = 120
      //     path.graphics.beginPath();
          
      //     var x = 25+j*50; // x 坐标值
      //     var y = 25+i*50; // y 坐标值
      //     var radius = 20; // 圆弧半径
      //     var startAngle = 0; // 开始点
      //     var endAngle = Math.PI+(Math.PI*j)/2; // 结束点
      //     var anticlockwise = i%2==0 ? false : true; // 顺时针或逆时针
          
      //     path.graphics.arc(x, y, radius, startAngle, endAngle, anticlockwise)
      //     if (i > 1){
      //       path.graphics.fill();
      //     } else {
      //       path.graphics.strokeStyle('blue')
      //       path.graphics.stroke();
      //     }
      //     stage.addChild(path)
      //   }
      // }

      let t1 = new DuduCan.Text({font: 'italic 18px sans-serif'})
      .setFillStyle('red')
      .setTextBaseline('top')
      .setWrapWidth(100)
      .setTextAlign('left')
      .setLineDistance(6)
      .fillText('你好因s你而美丽阑珊春意秋意浓常用要地人地要w-寺s ff', 10, 20)
      
      let container1 = new DuduCan.Container()
      container1.x = 100
      container1.y = 200
      container1.addChild(t1)
      
      
      stage.addChild(container1)
      stage.update()


      

      // setInterval(()=>{
      //   shape.x += 1
      //   t1.y += 10
      //   stage.update()
      // }, 1000)
      
    }, this)
  }
})
