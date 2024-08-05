import SimpleCss from './SimpleCss.js'

/**
 * Image 图片显示类
 * 继承自SimpleCss类，支持 borderRadius、border
 */
export default class Image extends SimpleCss {	
	name = 'Image'
	image: WechatMiniprogram.CanvasRenderingContext.CanvasImageSource
	path = null
	sx?: number
  sy?: number
	sWidth: number
	sHeight: number
	dx: number
	dy: number
	dWidth: number
	dHeight: number
	
	constructor(args: {
    image: WechatMiniprogram.CanvasRenderingContext.CanvasImageSource
    width?: number, 
    height?: number,
    sWidth?: number,
    sHeight?: number,
    sx?: number,
    sy?: number,
    dx?: number,
    dy?: number,
    dWidth?: number,
    dHeight?: number,
  }){
    super()
    if(args.width !== undefined){
      this.width = args.width;
    }
    if(args.height){
      this.height = args.height;
    }

    this.sx = args.sx
    this.sy = args.sy
    this.sWidth = args.sWidth ?? 0
    this.sHeight = args.sHeight ?? 0
    this.dx = args.dx ?? 0
    this.dy = args.dy ?? 0
    this.dWidth = args.dWidth ?? 0
    this.dHeight = args.dHeight ?? 0
	
    this.image = args.image
		// 如果设置了 width 则认 width 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度
		if(!this.width && this.dWidth !== undefined){
			this.width = this.dWidth
		}else{
			this.dWidth = this.width
		}
		// 如果设置了 height 则认 height 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度
		if(!this.height && this.dHeight !== undefined){
			this.height = this.dHeight
		}else{
			this.dHeight = this.height
		}
	}
	
	private _drawImage(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, x: number, y: number){
		/**
		 * !! 注意参数变化,可省略的原始图像位置尺寸信息是排在前面的
		 * drawImage(img, dx, dy);
		 * drawImage(img, dx, dy, dWidth, dHeight);
		 * drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		 */
		
     ctx.globalAlpha = this._getAlpha()
     if(this.sx !== undefined && this.sy !== undefined){
			// 如果传了原始图起点，则说明要填完整所有参数
			ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, x, y, this.dWidth, this.dHeight)
		}else if(this.dWidth != undefined){
			// 如果传了绘制目标宽，则认为不管原图，只管绘制目标位置与宽高
      ctx.drawImage(this.image, x, y, this.dWidth, this.dHeight)
		}else{
			// 只管绘制目标位置，会绘制原始图大小
			ctx.drawImage(this.image, x, y)
		}
	}
	protected _draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
    let [x, y] = this.getPosition()
		x = this.dx + x
    y = this.dy + y
		// 调用 extends class 的 draw 方法，因为有可能需要设置样式
		super._draw(ctx)

		// 绘制图片
		this._drawImage(ctx, x, y)

		// 此处的子元素一般只用于样式绘制，不推荐添加其它类型的子元素
		this.childs.forEach(v=>{
      //@ts-ignore
			v._draw(ctx)
		})
  }
  draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
    this._draw(ctx);
  }
}

 