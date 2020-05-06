import DisplayObject from './DisplayObject.js'
import DuduCanvas from './DuduCanvas.js'

const drawImage = Symbol('drawImage')
const drawSliced = Symbol('drawSliced')

export default class Sprite extends DisplayObject{	
	name = 'Sprite'
	img = null
	sliced = false
	constructor(img){
		super()
		if(img){
			this.img = img	
		}
	}
	_draw(ctx){
		const [x, y] = this.getPosition()
		
		this.wRatio = this.width / this.img.width
		this.hRatio = this.height / this.img.height

		this.enableWidth = (this.width - this.left - this.right) * this.scaleX
		this.enableHeight = (this.height - this.top - this.bottom) * this.scaleY

		
		if(this.sliced){
			this[drawSliced](ctx, x, y)
		}else{
			this[drawImage](ctx, x, y)
		}
		
		// 绘制子元素
		this.childs.forEach( v=>{
			v._draw(ctx)
		})
	}
	[drawImage](ctx, x, y){
		const lt = new DuduCanvas.Image({
			image: this.img,
			dx: x,
			dy: y,
			dWidth: this.width,
			dHeight: this.height
		})
		lt._draw(ctx)	
	}
	[drawSliced](ctx, x, y){
		
		// 计算九宫格每块位置信息

		// 上左
		const ltParams = {
			image: this.img,
			sx: 0,
			sy: 0,
			sWidth: this.left,
			sHeight: this.top,
			dWidth: this.left * this.scaleX,
			dHeight: this.top * this.scaleY,
			dx: x,
			dy: y,
		}

		// 上中
		const tParams = {
			image: this.img,
			sx: this.left,
			sy: 0,
			sWidth: this.img.width - this.right - this.left,
			sHeight: this.top,
			dWidth: this.enableWidth,
			dHeight: this.top * this.scaleY,
			dx: (this.left * this.scaleX) + x,
			dy: y,
		}

		// 上右
		const rtParams = {
			image: this.img,
			sx: this.img.width - this.right,
			sy: 0,
			sWidth: this.right,
			sHeight: this.top,
			dWidth: this.right * this.scaleX,
			dHeight: this.top * this.scaleY,
			dx: (this.left * this.scaleX) + tParams.dWidth + x,
			dy: y,
		}

		// 右中
		const rParams = {
			image: this.img,
			sx: this.img.width - this.right,
			sy: this.top,
			sWidth: this.right,
			sHeight: this.img.height - this.bottom - this.top,
			dWidth: this.right * this.scaleX,
			dHeight: this.enableHeight,
			dx: rtParams.dx,
			dy: rtParams.dy + (this.top * this.scaleY),
		}


		// 右下
		const rbParams = {
			image: this.img,
			sx: this.img.width - this.right,
			sy: this.img.height - this.bottom,
			sWidth: this.right,
			sHeight: this.bottom,
			dWidth: this.right * this.scaleX,
			dHeight: this.bottom  * this.scaleY,
			dx: rtParams.dx,
			dy: rParams.dy + rParams.dHeight,
		}

		// 下中
		const bParams = {
			image: this.img,
			sx: this.left,
			sy: this.img.height - this.bottom,
			sWidth: this.img.width - this.left - this.right,
			sHeight: this.bottom,
			dWidth: this.enableWidth,
			dHeight: this.bottom * this.scaleY,
			dx: tParams.dx,
			dy: rParams.dy + rParams.dHeight,
		}

		// 左下
		const lbParams = {
			image: this.img,
			sx: 0,
			sy: this.img.height - this.bottom,
			sWidth: this.left,
			sHeight: this.bottom,
			dWidth: this.left * this.scaleX,
			dHeight: this.bottom  * this.scaleX,
			dx: ltParams.dx,
			dy: rParams.dy + rParams.dHeight,
		}
		// 左中
		const lParams = {
			image: this.img,
			sx: 0,
			sy: this.top,
			sWidth: this.left,
			sHeight: this.img.height - this.top - this.bottom,
			dWidth: this.left * this.scaleX,
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



		const lt = new DuduCanvas.Image(ltParams)
		lt._draw(ctx)
		
		const t = new DuduCanvas.Image(tParams)
		t._draw(ctx)

		const rt = new DuduCanvas.Image(rtParams)
		rt._draw(ctx)

		const r = new DuduCanvas.Image(rParams)
		r._draw(ctx)

		const rb = new DuduCanvas.Image(rbParams)
		rb._draw(ctx)

		const b = new DuduCanvas.Image(bParams)
		b._draw(ctx)

		const lb = new DuduCanvas.Image(lbParams)
		lb._draw(ctx)

		const l = new DuduCanvas.Image(lParams)
		l._draw(ctx)

		const c = new DuduCanvas.Image(cParams)
		c._draw(ctx)

	}
	/**
	 * 九宫格图
	 * @param {Number} left   左边距
	 * @param {Number} top    上边距
	 * @param {Number} right  右边距
	 * @param {Number} bottom 下边距
	 */
	setSlice(left, top, right, bottom){
		this.sliced = true
		this.left = left
		this.top = top
		this.right = right
		this.bottom = bottom
		return this
	}
}

 