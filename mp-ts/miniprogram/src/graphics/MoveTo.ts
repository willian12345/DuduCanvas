import DisplayObject from "../DisplayObject"

export default class MoveTo {
    x: number
    y: number
	constructor(x:number, y:number){
		this.x = x
		this.y = y
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject ){
		const [_x, _y] = instance.getPosition()
		ctx.moveTo(this.x + _x, this.y + _y)	
	}
}