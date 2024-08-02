import DisplayObject from "../DisplayObject"
export default class LineTo {
    x: number
    y: number
	constructor(x:number, y:number){
		this.x = x
		this.y = y
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject ){
		let [_x, _y] = instance.getPosition()
		ctx.lineTo(this.x + _x, this.y + _y)	
	}
}