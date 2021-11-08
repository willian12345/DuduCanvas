import { append, remove, instructions,  drawGraphics } from '../config'

// 路径
import BeginPath from './BeginPath'
import MoveTo from './MoveTo'
import LineTo from './LineTo'
import Arc from './Arc'
import ArcTo from './ArcTo'
import Stroke from './Stroke'
import Fill from './Fill'
import SetFillStyle from './SetFillStyle'
import SetStrokeStyle from './SetStrokeStyle'
import Clip from './Clip'
import QuadraticCurveTo from './QuadraticCurveTo'
import BezierCurveTo from './BezierCurveTo'

// 矩形与圆
import DrawCircle from './DrawCircle'
import Rect from './Rect'
import RoundRect from './RoundRect'
import ClearRect from './ClearRect'

// 线条样式
import LineCap from './LineCap'
import LineJoin from './LineJoin'
import LineWidth from './LineWidth'
import SetLineDash from './SetLineDash'

/**
 * Graphics 绘制类
 * 绘制命令，添加绘制命令集，最终在 draw 方法内集中绘制
 */
export default class Graphics{
  name = 'Graphics'
  constructor(){
    this[instructions] = []
  }  	
  // 添加至指令至指令集
	[append](instructionsObject){
		this[instructions].push(instructionsObject)
  }
  // 移除指令
  [remove](instructionName){
    this[instructions] = this[instructions].filter( v => {
      return v.name !== instructionName
    })
  }
  // 绘制时执行所有当前文本
  [drawGraphics](ctx){
    console.log(this[instructions])
    this[instructions].forEach((instruction) => {
			instruction.exec(ctx, this)
		})
  }
  /**
   * 命令方法名与 w3c 一致
   */
  graphics = {
    beginPath: () => {
      this[append](new BeginPath())
      return this.graphics
    },
    moveTo: (x, y) => {
      this[append](new MoveTo(x, y))
      return this.graphics
    },
    setLineDash: (dash) => {
      this[append](new SetLineDash(dash))
      return this.graphics
    },
    lineWidth: (width) => {
      this[append](new LineWidth(width))
      return this.graphics
    },
    lineCap: (style)=> {
      this[append](new LineCap(style))
      return this.graphics
    },
    lineJoin: (style)=> {
      this[append](new LineJoin(style))
      return this.graphics
    },
    lineTo: (x, y)=> {
      this[append](new LineTo(x, y))
      return this.graphics
    },
    quadraticCurveTo: (cpx, cpy, x, y)=> {
      this[append](new QuadraticCurveTo(cpx, cpy, x, y))
      return this.graphics
    },
    bezierCurveTo: (cp1x, cp1y, cp2x, cp2y, x, y)=> {
      this[append](new BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y))
      return this.graphics
    },
    /**
     画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
     从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
     */
    arc: (x, y, radius, startAngle, endAngle, anticlockwise = false)=> {
      this[append](new Arc(x, y, radius, startAngle, endAngle, anticlockwise))
      return this.graphics
    },
    /**
     根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
     */
    arcTo: (x1, y1, x2, y2, radius)=> {
      this[append](new ArcTo(x1, y1, x2, y2, radius))
      return this.graphics
    },
    stroke: ()=> {
      this[append](new Stroke())
      return this.graphics
    },
    fill: ()=> {
      this[append](new Fill())
      return this.graphics
    },
    fillStyle: (style)=> {
      this[append](new SetFillStyle(style))
      return this.graphics
    },
    strokeStyle: (style)=> {
      this[append](new SetStrokeStyle(style))
      return this.graphics
    },
    fillCircle: (x = 0, y = 0, radius = 20)=> {
      this[append](new DrawCircle(x, y, radius, true))
      return this.graphics
    },
    strokeCircle: (x = 0, y = 0, radius = 20)=> {
      this[append](new DrawCircle(x, y, radius))
      this[append](new Stroke())
      return this.graphics
    },
    fillRect: (x = 0, y = 0, w = 10, h = 20)=> {
      this[append](new Rect(x, y, w, h))
      return this.graphics
    },
    /**
     * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
     */
    strokeRect: (x = 0, y = 0, w = 10, h = 20)=> {
      this[append](new Rect(x,y,w,h, true))
      this[append](new Stroke())
      return this.graphics
    },
    fillRoundRect: (x = 0, y = 0, w = 10, h = 10, radius = 8, fill, stroke)=> {
      this[append](new RoundRect(x, y, w, h, radius, fill, stroke))
      return this.graphics
    },
    strokeRoundRect: (x, y, w, h, radius) => {
      this[append](new RoundRect(x, y, w, h, radius, false, true))
      this[append](new Stroke())
      return this.graphics
    },
    /**
     * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方
     */
    clearRect: (x, y, w, h)=> {
      this[append](new ClearRect(x, y, w, h))
      return this.graphics
    },
    clip: () => {
      this[append](new Clip())
      return this.graphics
    }
  }
}
