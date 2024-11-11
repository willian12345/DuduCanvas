export default class ArcTo {
    name="ArcTo"
    x1: number
    x2: number
    y1: number
    y2: number
    radius: number
	constructor(x1: number, y1: number, x2: number, y2: number, radius: number){
		this.x1 = x1
		this.y1 = y1
		this.x2 = x2
		this.y2 = y2
		this.radius = radius
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: any){
		const [_x, _y] = instance.getPosition()
		ctx.arcTo(this.x1 + _x, this.y1 + _y, this.x2 + _x, this.y2 + _y, this.radius)
	}
}