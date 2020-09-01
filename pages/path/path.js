import DuduCanvas from '../../libs/DuduCanvas.js'

Page({
  onLoad: function () {
    DuduCanvas.Stage('myCanvas', (stage, ctx) => {
      for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
           let path = new DuduCanvas.Shape()
           path.x = 100
           path.y = 220
           path.graphics.beginPath();
           
           var x = 25+j*50; // x 坐标值
           var y = 25+i*50; // y 坐标值
           var radius = 20; // 圆弧半径
           var startAngle = 0; // 开始点
           var endAngle = Math.PI+(Math.PI*j)/2; // 结束点
           var anticlockwise = i%2==0 ? false : true; // 顺时针或逆时针
           
           path.graphics.arc(x, y, radius, startAngle, endAngle, anticlockwise)
           if (i > 1){
             path.graphics.fill();
           } else {
             path.graphics.strokeStyle('blue')
             path.graphics.stroke();
           }
           stage.addChild(path)
         }
       }

      let rect = new DuduCanvas.Shape()
      rect.graphics.fillStyle('yellow').fillRect(0, 100, 100, 40)
      let rect1 = new DuduCanvas.Shape()
      rect1.graphics.strokeStyle('green').strokeRect(20, 110, 100, 10)

      stage.addChild(rect, rect1)

      let shape1 = new DuduCanvas.Shape()
      shape1.graphics.fillStyle('green').fillCircle(375/2, 130, 40)

      stage.addChild(shape1)

      stage.render()
    }, this)
  }
})
