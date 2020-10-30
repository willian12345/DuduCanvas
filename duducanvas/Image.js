/**
 * 图片类
 * Image 名是为了防止后期可能与系统中保留的 Image 类冲突
 */
import DisplayObject from './DisplayObject.js'
import { draw, getAlpha, drawGraphics } from './config'
import Shape from './Shape.js'

const roundCorner = {tl: 0, tr: 0, br: 0, bl: 0}
const drawImage = Symbol('drawImage')

function getChangedBorderRadiusValue(value){
	let borderRadiusValue
	value = String(value).split(' ').map(v => parseFloat(v))
	const valueLength = value.length
	if(valueLength === 1){
		borderRadiusValue = value[0]
	}else if(valueLength === 2){
		roundCorner.tl = roundCorner.br = value[0]
		roundCorner.tr = roundCorner.bl = value[1]
		borderRadiusValue = roundCorner
	}else if(valueLength === 3){
		roundCorner.tl = value[0]
		roundCorner.br = value[2]
		roundCorner.tr = roundCorner.bl = value[1]
		borderRadiusValue = roundCorner
	}else if(valueLength === 4){
		roundCorner.tl = value[0]
		roundCorner.tr = value[1]
		roundCorner.br = value[3]
		roundCorner.bl = value[4]
		borderRadiusValue = roundCorner
	}
	return borderRadiusValue
}

export default class Image extends DisplayObject {	
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
	borderRadiusValue = ''
	/**
	 * 1、borderRadius值设置请参与 css3 的 border-radius 属性;
	 * eg1: '10'
	 * eg2: '10 20'
	 * eg3: '10 20 10'
	 * eg4: '10, 20, 30, 40'
	 * 
	 * 2、borderRadius设置为 '100%'，则认为是圆形遮罩
	 * eg: '100%'
	 */
	get borderRadius(){
		return this.borderRadiusValue
	}
	set borderRadius(value){
		if(!value) return
		if(value != '100%'){
			this.borderRadiusValue = getChangedBorderRadiusValue(value)
		}else{
			this.borderRadiusValue = value
		}
	}
	constructor(args){
		super()
		this[drawGraphics] = super[drawGraphics]
		for(let v in args){
			this[v] = args[v]
		}
		// 图片地址路径 远程/本地
		this.path = this.image.path

		// 如果设置了 width 则认 width 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度
		if(!this.width){
			this.width = this.dWidth
		}else{
			this.dWidth = this.width
		}
		// 如果设置了 height 则认 height 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度
		if(!this.height){
			this.height = this.dHeight
		}else{
			this.dHeight = this.height
		}
	}
	
	[drawImage](ctx, x, y){
		/**
		 * !! 注意参数变化,可省略的原始图像位置尺寸信息是排在前面的
		 * drawImage(img, dx, dy);
		 * drawImage(img, dx, dy, dWidth, dHeight);
		 * drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		 */
		
		 ctx.globalAlpha = this[getAlpha]()

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
	[draw](ctx){
		let [x, y] = this.getPosition()
		x = this.dx + x
		y = this.dy + y
		// 优先执行 graphics 指令
		this[drawGraphics](ctx)
		// 如果设置了 borderRadius 值则需要使用遮罩实现圆角
		if(this.borderRadiusValue){
			this.initBorderRadiusMask()
		}

		// 如果有遮罩，只能使用 圆形，矩形，圆角矩形
		if(this.mask){
			if(this.mask.name === 'Shape'){
				// 遮罩层不参与显示所以也没有父级元素
				this.mask.masked = this
				this.mask[draw](ctx, true)
				this[drawImage](ctx, x, y)
			}
		}else{
			this[drawImage](ctx, x, y)
		}
		this.childs && this.childs.map( v => v[draw](ctx))
	}
	/**
	 * borderRadius 
	 * 为图像元素添加遮罩以实现圆角
	 */
	initBorderRadiusMask(){
		const s = new Shape()
		if(this.borderRadiusValue === '100%'){
			s.graphics.fillCircle(this.width * .5,  this.height * .5, this.width * .5)
		}else{
			s.graphics.fillRoundRect(0, 0, this.width, this.height, this.borderRadiusValue)
		}
		this.mask = s
	}
}

 