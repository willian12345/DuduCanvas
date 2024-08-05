import Group from './Group.js'
import Image from './Image.js'
import { draw, getAlpha,instructions } from './config'

const drawImage = Symbol('drawImage')
const drawSliced = Symbol('drawSliced')
const left = Symbol('left')
const top = Symbol('top')
const right = Symbol('right')
const bottom = Symbol('bottom')
const setSlice = Symbol('setSlice')
const _sliceBounds = Symbol('_sliceBounds')

const rotation = Symbol('rotation')
/**
 * Sprite 雪碧类
 * 用于显示九宫格类型的图片
 */
export default class Sprite extends Group{	
	name = 'Sprite'
	img = null
	sliced = false
	get sliceBounds(){
		return this[_sliceBounds]
	}
	set sliceBounds(bounds){
		// const { left, top, right, bottom } = bounds
		this._setSlice(bounds)
		this[_sliceBounds] = bounds
	}
	/**
	 * 
	 * @param {*} img Image 对象
	 * @param {*} sliceBound 九宫格图 {left: 0, top: 0, right: 0, bottom: 0}
	 */
	constructor(img, sliceBound){
		super()
		if(img){
			this.img = img	
		}
		this.parentDraw = super[draw]
		if(sliceBound){
			this[setSlice](sliceBound)
		}
	}
	// get rotation(){
	// 	return this[rotation]
	// }
	// set rotation(r){
	// 	if(this.sliced){
	// 		throw new Error('Sprite 因为旋转后会出现拼接缝隙，在九宫格状态下暂时无法旋转, 待小程序完全支持离屏渲染后修复')
	// 	}else{
	// 		this[rotation] = r
	// 	}
	// }
	[draw](ctx){
		const [x, y] = this.getPosition()
		
		this.wRatio = this.width / this.img.width
		this.hRatio = this.height / this.img.height

		// 伸缩后的宽、高
		this.enableWidth = (this.width - this[left] - this[right]) * this.scaleX
		this.enableHeight = (this.height - this[top] - this[bottom]) * this.scaleY

		// 执行所有命令
		this[instructions].forEach((instruction) => {
			instruction.exec(ctx, this)
		})

		if(this.sliced){
			// sprite 九宫格不允许使用 boxShadow
			this[drawSliced](ctx, x, y, this[getAlpha]())
		}else{
			this[drawImage](ctx, x, y)
		}
		
		// 绘制子元素
		this.childs.forEach( v =>{
			v[draw](ctx)
		})
		
	}
	[drawImage](ctx, x, y){
		const img = new Image({
			image: this.img,
			dx: x,
			dy: y,
			dWidth: this.width,
			dHeight: this.height
		})
		img[draw](ctx)
	}
	// 绘制九宫格图像
	[drawSliced](ctx, x, y, alpha){
		// 计算九宫格每块位置信息
		// 上左
		const ltParams = {
			image: this.img,
			sx: 0,
			sy: 0,
			sWidth: this[left],
			sHeight: this[top],
			dWidth: this[left] * this.scaleX,
			dHeight: this[top] * this.scaleY,
			dx: x,
			dy: y,
		}
		
		// 上中
		const tParams = {
			image: this.img,
			sx: this[left],
			sy: 0,
			sWidth: this.img.width - this[right] - this[left],
			sHeight: this[top],
			dWidth: this.enableWidth,
			dHeight: this[top] * this.scaleY,
			dx: ((this[left] * this.scaleX) + x),
			dy: y,
		}

		// 上右
		const rtParams = {
			image: this.img,
			sx: this.img.width - this[right],
			sy: 0,
			sWidth: this[right],
			sHeight: this[top],
			dWidth: this[right] * this.scaleX,
			dHeight: this[top] * this.scaleY,
			dx: (this[left] * this.scaleX) + tParams.dWidth + x,
			dy: y,
		}

		// 右中
		const rParams = {
			image: this.img,
			sx: this.img.width - this[right],
			sy: this[top],
			sWidth: this[right],
			sHeight: this.img.height - this[bottom] - this[top],
			dWidth: this[right] * this.scaleX,
			dHeight: this.enableHeight,
			dx: rtParams.dx,
			dy: rtParams.dy + (this[top] * this.scaleY),
		}


		// 右下
		const rbParams = {
			image: this.img,
			sx: this.img.width - this[right],
			sy: this.img.height - this[bottom],
			sWidth: this[right],
			sHeight: this[bottom],
			dWidth: this[right] * this.scaleX,
			dHeight: this[bottom]  * this.scaleY,
			dx: rtParams.dx - .3,
			dy: rParams.dy + rParams.dHeight,
		}

		// 下中
		const bParams = {
			image: this.img,
			sx: this[left],
			sy: this.img.height - this[bottom],
			sWidth: this.img.width - this[left] - this[right],
			sHeight: this[bottom],
			dWidth: this.enableWidth,
			dHeight: this[bottom] * this.scaleY,
			dx: tParams.dx,
			dy: rParams.dy + rParams.dHeight,
		}

		// 左下
		const lbParams = {
			image: this.img,
			sx: 0,
			sy: this.img.height - this[bottom],
			sWidth: this[left],
			sHeight: this[bottom],
			dWidth: this[left] * this.scaleX,
			dHeight: this[bottom]  * this.scaleX,
			dx: ltParams.dx,
			dy: rParams.dy + rParams.dHeight,
		}
		// 左中
		const lParams = {
			image: this.img,
			sx: 0,
			sy: this[top],
			sWidth: this[left],
			sHeight: this.img.height - this[top] - this[bottom],
			dWidth: this[left] * this.scaleX,
			dHeight: this.enableHeight,
			dx: ltParams.dx,
			dy: rParams.dy,
		}

		// 中间 
		const cParams = {
			image: this.img,
			sx: ltParams.sWidth,
			sy: ltParams.sHeight,
			sWidth: tParams.sWidth,
			sHeight: lParams.sHeight,
			dWidth: this.enableWidth,
			dHeight: this.enableHeight,
			dx: ltParams.dx + ltParams.dWidth,
			dy: ltParams.dy + ltParams.dHeight,
		}
		const peices = [ltParams]
		// 用离屏渲染成整张图再绘制到主canvas中解决接触缝隙问题以及性能问题
		// const offScreen = wx.createOffscreenCanvas(375, 375)
		// var offScreenCtx = offScreen.getContext("2d")		
		if(this.rotation != 0){
			console.error('Sprite 因为旋转后会出现拼接缝隙，在九宫格状态下暂时无法旋转, 待小程序完全支持离屏渲染后修复')
		}
		peices.forEach( v => {
      console.log(v)
			const i = new Image(v)
			i.alpha = alpha
			i[draw](ctx)
		})

		return this
	}
	/**
	 * 供内部调用的九宫格边界
	 * @param {*} sliceBound: {left: 0, top: 0, right: 0, bottom: 0}
	 */
	_setSlice(sliceBound){
		this.sliced = true
		this[left] = sliceBound.left
		this[top] = sliceBound.top
		this[right] = sliceBound.right
		this[bottom] = sliceBound.bottom
		return this
	}
	/**
	 * 九宫格边界
	 * @param {*} sliceBound: {left: 0, top: 0, right: 0, bottom: 0}
	 */
	setSlice(sliceBound){
		return this._setSlice(sliceBound)
	}
}

 