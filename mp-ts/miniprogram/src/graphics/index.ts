// 路径
import BeginPath from './BeginPath'
import MoveTo from './MoveTo'
import LineTo from './LineTo'
import Arc from './Arc'
import ArcTo from './ArcTo'
import Stroke from './Stroke'
import Fill from './Fill'
import SetFillStyle from './SetFillStyle'
import type {TStyle} from './SetFillStyle'
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

export default abstract class Graphics{
  name = 'Graphics'
  protected _instructions: any[]
  constructor(){
    this._instructions = []
  }  	
  // 添加至指令至指令集
protected _append(instructionsObject: any){
		this._instructions.push(instructionsObject)
  }
  // 移除指令
  protected _remove(instructionName: string){
    this._instructions = this._instructions.filter( v => {
      return v.name !== instructionName
    })
  }
  // 绘制时执行所有当前文本
  protected _drawGraphics(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
    
    this._instructions.forEach((instruction) => {
			instruction.exec(ctx, this)
		})
  }
  /**
   * 命令方法名与 w3c 一致
   */
  graphics = {
    beginPath: () => {
      this._append(new BeginPath())
      return this.graphics
    },
    moveTo: (x: number, y: number) => {
      this._append(new MoveTo(x, y))
      return this.graphics
    },
    setLineDash: (dash: number[]) => {
      this._append(new SetLineDash(dash))
      return this.graphics
    },
    lineWidth: (width: number) => {
      this._append(new LineWidth(width))
      return this.graphics
    },
    lineCap: (style: WechatMiniprogram.CanvasRenderingContext.CanvasLineCap)=> {
      this._append(new LineCap(style))
      return this.graphics
    },
    lineJoin: (style: WechatMiniprogram.CanvasRenderingContext.CanvasLineJoin)=> {
      this._append(new LineJoin(style))
      return this.graphics
    },
    lineTo: (x: number, y: number)=> {
      this._append(new LineTo(x, y))
      return this.graphics
    },
    quadraticCurveTo: (cpx: number, cpy: number, x: number, y: number)=> {
      this._append(new QuadraticCurveTo(cpx, cpy, x, y))
      return this.graphics
    },
    bezierCurveTo: (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number)=> {
      this._append(new BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y))
      return this.graphics
    },
    /**
     画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
     从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
     */
    arc: (x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise:boolean = false)=> {
			this._remove('Arc')
      this._append(new Arc(x, y, radius, startAngle, endAngle, anticlockwise))
      return this.graphics
    },
    /**
     根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
     */
    arcTo: (x1: number, y1: number, x2: number , y2: number , radius: number)=> {
	    this._remove('ArcTo')
      this._append(new ArcTo(x1, y1, x2, y2, radius))
      return this.graphics
    },
    stroke: ()=> {
      this._append(new Stroke())
      return this.graphics
    },
    fill: ()=> {
      this._append(new Fill())
      return this.graphics
    },
    fillStyle: (style: TStyle)=> {
      this._append(new SetFillStyle(style))
      return this.graphics
    },
    strokeStyle: (style: string)=> {
      this._append(new SetStrokeStyle(style))
      return this.graphics
    },
    fillCircle: (x = 0, y = 0, radius = 20)=> {
      this._append(new DrawCircle(x, y, radius, true))
      return this.graphics
    },
    strokeCircle: (x = 0, y = 0, radius = 20)=> {
      this._append(new DrawCircle(x, y, radius))
      this._append(new Stroke())
      return this.graphics
    },
    fillRect: (x = 0, y = 0, w = 10, h = 20)=> {
      this._append(new Rect(x, y, w, h))
      return this.graphics
    },
    /**
     * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
     */
    strokeRect: (x = 0, y = 0, w = 10, h = 20)=> {
      this._append(new Rect(x,y,w,h, true))
      this._append(new Stroke())
      console.log(this._instructions)
      return this.graphics
    },
    fillRoundRect: (x = 0, y = 0, w = 10, h = 10, radius: number | number[], fill?: boolean, stroke?: boolean)=> {
        //@ts-ignore
      this._append(new RoundRect(x, y, w, h, radius, fill, stroke))
      return this.graphics
    },
    strokeRoundRect: (x: number, y: number, w: number, h: number, radius: number | number[]) => {
      this._append(new RoundRect(x, y, w, h, radius, false, true))
      this._append(new Stroke())
      return this.graphics
    },
    /**
     * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方
     */
    clearRect: (x: number, y: number, w: number, h: number) => {
      this._append(new ClearRect(x, y, w, h))
      return this.graphics
    },
    clip: () => {
      this._append(new Clip())
      return this.graphics
    }
  }
}
