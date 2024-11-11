import DisplayObject from "../DisplayObject"

export default class MoveTo {
    x: number
    y: number
	constructor(x:number, y:number){
		this.x = x
		this.y = y
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject ){
		ctx.moveTo(this.x, this.y)	
	}
}