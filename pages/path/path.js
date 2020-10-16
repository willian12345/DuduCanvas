import { Stage, Shape, CreateLinearGradient, CreateRadialGradient } from '../../duducanvas/index.js'

Page({
  onLoad: function () {
    new Stage('#myCanvas', (stage, ctx) => {
      for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
           let path = new Shape()
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

      const curve = new Shape()
      curve.graphics.fillStyle('red')
      .beginPath()
      .lineWidth(10)
      .lineCap('round')
      .moveTo(20,20)
      .bezierCurveTo(20,100,200,100,200,20)
      .stroke()
      curve.x = 100
      curve.y = 100
      curve.shadow = '0 0 10 green'

      
      const linearGradient = new CreateLinearGradient(0, 0, 100, 50)
      linearGradient.addColorStop(.1, 'red')
      linearGradient.addColorStop(.5, 'green')
      linearGradient.addColorStop(1, 'blue')
      
      const rect = new Shape()
      rect.graphics.fillStyle(linearGradient)
      rect.graphics.fillRect(0, 0, 100, 100)

      stage.addChild(rect)

      const radialGradient = new CreateRadialGradient(50, 50, 50)
      radialGradient.addColorStop(.1, 'red')
      radialGradient.addColorStop(.5, 'green')
      radialGradient.addColorStop(1, 'blue')
      
      const rect1 = new Shape()
      rect1.graphics.fillStyle(radialGradient)
      rect1.graphics.fillRect(0, 0, 100, 100)
      rect1.x = 0
      rect1.y = 0


      stage.addChild(rect1, curve)

      stage.render()
    }, this)
  }
})
