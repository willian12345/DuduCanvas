import DisplayObject from './DisplayObject.js'
const circle = Symbol('circle')
const rect = Symbol('rect')
const drawImage = Symbol('drawImage')

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    const defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (let side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

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
	constructor(args){
		super()
		for(let v in args){
			this[v] = args[v]
		}
		this[circle] = null
		this[rect] = null
		this.path = this.image.path
		this.width = this.dWidth
		this.height = this.dHeight
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
				this.mask.parent = this
				this.mask._draw(ctx, this.mask)
				ctx.save()
				ctx.clip()
				this.transform(this, ctx)
				this[drawImage](ctx, x, y)
				ctx.restore()
			}
		}else if(this[rect]){
			ctx.save()
			if(this[rect].radius > 0){
				roundRect(ctx,
					 x + this[rect].x,
					 y + this[rect].y, 
					 this[rect].w, 
					 this[rect].h, 
					 this[rect].radius,
					 false, false)
			}else{
				ctx.beginPath()
				ctx.rect(x + this[rect].x, y + this[rect].y, this[rect].w, this[rect].h)
			}
			ctx.clip()
			this[drawImage](ctx, x, y)
			ctx.restore()
			console.log(111)
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

 