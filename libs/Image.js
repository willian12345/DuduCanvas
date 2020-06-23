import DisplayObject from './DisplayObject.js'
const drawImage = Symbol('drawImage')



export default class Image extends DisplayObject{	
	name = 'Image'
	image = null
	path = ''
	sx = undefined
	sy = undefined
	sWidth = undefined
	sHeight = undefined
	dx = 0
	dy = 0
	dWidth = undefined
	dHeight = undefined
	mask = null
	addChild = null
	constructor(args){
		super()
		for(let v in args){
			this[v] = args[v]
		}
		this.path = this.image.path
		this.width = this.dWidth
		this.height = this.dHeight
		this._parentDraw = super._draw
	}
	[drawImage](ctx, x, y){
		/**
		 * !! 注意参数变化,可省略的原始图像位置尺寸信息是排在前面的
		 * drawImage(img, dx, dy);
		 * drawImage(img, dx, dy, dWidth, dHeight);
		 * drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		 */
		
		if(this.sx != undefined){
			// 如果传了原始图起点，则说明要填完整所有参数
			ctx.drawImage(this.path, this.sx, this.sy, this.sWidth, this.sHeight, x, y, this.dWidth, this.dHeight)	
		}else if(this.dWidth != undefined){
			// 如果传了绘制目标宽，则认为不管原图，只管绘制目标位置与宽高
			ctx.drawImage(this.path, x, y, this.dWidth, this.dHeight)
		}else{
			// 只管绘制目标位置，会绘制原始图大小
			ctx.drawImage(this.path, x, y)
		}
	}
	_draw(ctx){
		let [x, y] = this.getPosition()
		x = this.dx + x
		y = this.dy + y

		
		if(this.mask){
			if(this.mask.name == 'Shape'){
				// this.mask.parent = this
				// this._parentDraw()
				// this.mask._draw(ctx, this.mask)
				// ctx.clip()
				// ctx.translate(110, 0)
				ctx.rotate(10* Math.PI / 180)
				
				ctx.fillRect(0, 0, 100, 100)
				// ctx.translate(-110, 0)
				ctx.clip()
				ctx.rotate(-10* Math.PI / 180)
				// ctx.save()
				this[drawImage](ctx, x, y)
				// ctx.restore()
			}
		}else{
			this[drawImage](ctx, x, y)
		}
	}
	setClipCircle(x, y, radius){
		this[circle] = {x, y, radius}
	}
	setClipRect(x, y, w, h, radius = 0){
		this[rect] = {x, y, w, h, radius}	
	}
}

 