/**
 * Shape 图形类
 * 1、包含了各类绘制 api
 * 2、Shape 对象内 通过 graphics 对象可以绘制无限个图形
 * 3、所有绘制 api 命令都存在于 graphics 对象内， graphics 绘制在 Shape 对象内不参与 z 轴排序
 * 
 */
import { draw, getAlpha } from './config'
import DisplayObject from './DisplayObject.js'

// 路径
import BeginPath from './graphics/BeginPath'
import MoveTo from './graphics/MoveTo'
import LineTo from './graphics/LineTo'
import Arc from './graphics/Arc'
import ArcTo from './graphics/ArcTo'
import Stroke from './graphics/Stroke'
import Fill from './graphics/Fill'
import SetFillStyle from './graphics/SetFillStyle'
import SetStrokeStyle from './graphics/SetStrokeStyle'
import Clip from './graphics/Clip'
import QuadraticCurveTo from './graphics/QuadraticCurveTo'
import BezierCurveTo from './graphics/BezierCurveTo'

// 矩形与圆
import DrawCircle from './graphics/DrawCircle'
import Rect from './graphics/Rect'
import RoundRect from './graphics/RoundRect'
import ClearRect from './graphics/ClearRect'

// 线条样式
import LineCap from './graphics/LineCap'
import LineJoin from './graphics/LineJoin'
import LineWidth from './graphics/LineWidth'



const append = Symbol('append')
const bounds = Symbol('bounds')
const instructions = Symbol('instructions')


export default class Shape extends DisplayObject{
	name = 'Shape'
	isMask = false
	constructor(){
		super()
		// 指令集
		this[instructions] = []	
		this[bounds] = []
		this.width = 0
		this.height = 0
	}
	[draw](context, isMask){
		// shape 是否为遮罩
		this.isMask = !!isMask

		// 设置透明度
		context.globalAlpha = this[getAlpha]()

		// 执行所有命令
		this[instructions].map((instruction) => {
			instruction.exec(context, this)
		})
	}
	[append](instructionsObject) {
		this[instructions].push(instructionsObject)
	}
	// 绘图命令
	graphics = {
		beginPath: () => {
			this[append](new BeginPath())
			return this.graphics
		},
		moveTo: (x, y) => {
			this[append](new MoveTo(x, y))
			return this.graphics
		},
		lineWidth: (width) => {
			this[append](new LineWidth(width))
			return this.graphics
		},
		lineCap: (style) => {
			this[append](new LineCap(style))
			return this.graphics
		},
		lineJoin: (style) => {
			this[append](new LineJoin(style))
			return this.graphics
		},
		lineTo: (x, y) => {
			this[append](new LineTo(x, y))
			return this.graphics
		},
		quadraticCurveTo: (cpx, cpy, x, y) => {
			this[append](new QuadraticCurveTo(cpx, cpy, x, y))
			return this.graphics
		},
		bezierCurveTo: (cp1x, cp1y, cp2x, cp2y, x, y) => {
			this[append](new BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y))
			return this.graphics
		},
		/**
		 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
		 从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
		 */
		arc: (x, y, radius, startAngle, endAngle, anticlockwise = false) => {
			this[append](new Arc(x, y, radius, startAngle, endAngle, anticlockwise))
			return this.graphics
		},
		/**
		 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
		 */
		arcTo: (x1, y1, x2, y2, radius) => {
			this[append](new ArcTo(x1, y1, x2, y2, radius))
			return this.graphics
		},
		stroke: () => {
			this[append](new Stroke())
			return this.graphics
		},
		fill: () => {
			this[append](new Fill())
			return this.graphics
		},
		fillStyle: style => {
			this[append](new SetFillStyle(style))
			return this.graphics
		},
		strokeStyle: style => {
			this[append](new SetStrokeStyle(style))
			return this.graphics
		},
		fillCircle: (x = 0, y = 0, radius = 20) => {
			this[append](new DrawCircle(x, y, radius, true))
			return this.graphics
		},
		fillRect: (x = 0, y = 0, w = 10, h = 20) => {
			this[bounds].push({x: x, y: y, w: w, h: h})
			this[append](new Rect(x, y, w, h))
			return this.graphics
		},
		fillRoundRect: (x = 0, y = 0, w = 10, h = 10, radius = 8, fill, stroke) => {
			this[bounds].push({x: x, y: y, w: w, h: h})
			this[append](new RoundRect(x, y, w, h, radius, fill, stroke))
			return this.graphics
		},
		/**
		 * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
		 */
		strokeRect: (x = 0, y = 0, w = 10, h = 20) => {
			this[bounds].push({x: x, y: y, w: w, h: h})
			this[append](new Rect(x,y,w,h))
			return this.graphics
		},
		/**
		 * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方
		 */
		clearRect: (x, y, w, h) => {
			this[append](new ClearRect(x, y, w, h))
			return this.graphics
		}
	}
}

 