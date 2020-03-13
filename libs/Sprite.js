import DisplayObject from './DisplayObject.js'
import DuduCan from './DuduCan.js'

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
		let [x, y] = this.getPosition()
		
		this.wRatio = this.width / this.img.width
		this.hRatio = this.height / this.img.height

		this.enableWidth = (this.width - this.left - this.right) * this.scaleX
		this.enableHeight = (this.height - this.top - this.bottom) * this.scaleY

		
		if(this.sliced){
			this[drawSliced](ctx, x, y)
		}else{
			this[drawImage](ctx, x, y)
		}

	}
	[drawImage](ctx, x, y){
		const lt = new DuduCan.Image({
			image: this.img,
			dx: x,
			dy: y,
			dWidth: this.width,
			dHeight: this.height
		})
		lt._draw(ctx)	
	}
	[drawSliced](ctx, x, y){
		let ltParams = {
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

		let tParams = {
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


		let rtParams = {
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

		let rParams = {
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


		
		let rbParams = {
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

		let bParams = {
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

		let lbParams = {
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
		let lParams = {
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

		let cParams = {
			image: this.img,
			sx: ltParams.sWidth,
			sy: ltParams.sHeight,
			sWidth: tParams.sWidth,
			sHeight: lParams.sHeight,
			dWidth: this.enableWidth,
			dHeight: this.enableHeight,
			dx: ltParams.dWidth,
			dy: ltParams.dHeight,
		}



		const lt = new DuduCan.Image(ltParams)
		lt._draw(ctx)
		
		const t = new DuduCan.Image(tParams)
		t._draw(ctx)

		const rt = new DuduCan.Image(rtParams)
		rt._draw(ctx)

		const r = new DuduCan.Image(rParams)
		r._draw(ctx)

		const rb = new DuduCan.Image(rbParams)
		rb._draw(ctx)

		const b = new DuduCan.Image(bParams)
		b._draw(ctx)

		const lb = new DuduCan.Image(lbParams)
		lb._draw(ctx)

		const l = new DuduCan.Image(lParams)
		l._draw(ctx)

		const c = new DuduCan.Image(cParams)
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

 