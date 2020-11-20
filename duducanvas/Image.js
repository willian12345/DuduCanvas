/**
 * 图片类
 * Image 名是为了防止后期可能与系统中保留的 Image 类冲突
 */
import SimpleCss from './SimpleCss.js'
import { draw, getAlpha, drawGraphics, drawImage } from './config'

const extendsClassDraw = Symbol('extendsClassDraw')

export default class Image extends SimpleCss {	
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
	
	constructor(args){
		super()
		this[extendsClassDraw] = super[draw]
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
		// 调用 extends class 的 draw 方法，因为有可能需要设置样式
		this[extendsClassDraw](ctx)

		// 绘制图片
		this[drawImage](ctx, x, y)

		// 此处的子元素一般只用来表现描述等绘制，不推荐添加其它类型的子元素
		this.childs.forEach(v=>{
			v[draw](ctx)
		})
	}
}

 