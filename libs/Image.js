import DisplayObject from './DisplayObject.js'
export default class Image extends DisplayObject{	
	name = 'Image'
	path = ''
	sx = undefined
	sy = undefined
	sWidth = undefined
	sHeight = undefined
	dx = 0
	dy = 0
	dWidth = undefined
	dHeight = undefined
	constructor(args){
		super()
		for(let v in args){
			this[v] = args[v]
		}
	}
	_draw(ctx){
		let [x, y] = this.getPosition()
		console.log(x, y)
		this.x = this.dx + x
		this.y = this.dy + y

		/**
		 * !! 注意参数变化,可省略的原始图像位置尺寸信息是排在前面的
		 * drawImage(img, dx, dy);
		 * drawImage(img, dx, dy, dWidth, dHeight);
		 * drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		 */
		
		// ctx.drawImage(this.path, 0, 0, 20, 20, 0, 0, 40, 40)	
		// // console.log(this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
		// return 
		// console.log(this.sx)
		
		if(this.sx != undefined){
			// 如果传了原始图起点，则说明要填完整所有参数
			ctx.drawImage(this.path, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.dWidth, this.dHeight)	
		}else if(this.dWidth != undefined){
			// 如果传了绘制目标宽，则认为不管原图，只管绘制目标位置与宽高
			ctx.drawImage(this.path, this.x, this.y, this.dWidth, this.dHeight)
		}else{
			// 只管绘制目标位置，会绘制原始图大小
			ctx.drawImage(this.path, this.x, this.y)
		}
	}
}

 