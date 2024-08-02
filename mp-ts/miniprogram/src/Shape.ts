/**
 * Shape 图形类
 * 1、包含了各类绘制 api
 * 2、Shape 对象内 通过 graphics 对象可以绘制无限个图形
 * 3、所有绘制 api 命令都存在于 graphics 对象内， graphics 绘制在 Shape 对象内不参与 z 轴排序
 * 
 */
import { getAlpha,  drawGraphics } from './config'
import DisplayObject from './DisplayObject.js'

export default class Shape extends DisplayObject{
	name = 'Shape'
	isMask = false
	width = 0
	height = 0
	constructor(){
		super()
		this._drawGraphics = super._drawGraphics
		
		// 新建一个shape对象时先执行beginPath命令，以重新开始 path 上下文
		this.graphics.beginPath()
    }
	_draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
		// shape 是否为遮罩
		// this.isMask = !!isMask

		// 设置透明度
		ctx.globalAlpha = this._getAlpha()

		// 执行所有命令
		this._drawGraphics(ctx)
	}
	getBounds(){
		console.error('Shape 不提供getBounds方法')
		return null
	}
}

 