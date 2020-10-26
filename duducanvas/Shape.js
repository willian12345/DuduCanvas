/**
 * Shape 图形类
 * 1、包含了各类绘制 api
 * 2、Shape 对象内 通过 graphics 对象可以绘制无限个图形
 * 3、所有绘制 api 命令都存在于 graphics 对象内， graphics 绘制在 Shape 对象内不参与 z 轴排序
 * 
 */
import { draw, getAlpha, instructions} from './config'
import DisplayObject from './DisplayObject.js'

// 路径
import Graphics from './graphics/index'
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

const bounds = Symbol('bounds')

export default class Shape extends DisplayObject{
	name = 'Shape'
	isMask = false
	constructor(){
		super()
		this[bounds] = []
		this.width = 0
		this.height = 0
		// console.log(Graphics)
		// 绘图命令
		//  this.graphics = new Graphics(this[append])
		//  Object.assign(this.graphics, graphics)
		//  console.log(this.graphics)
		// 新建一个shape对象时先执行beginPath命令，以重新开始 path 上下文
		this.graphics.beginPath()
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
	getBounds(){
		console.error('Shape 不提供getBounds方法')
		return null
	}
}

 