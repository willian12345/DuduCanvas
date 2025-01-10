export default class Arc {
    name = 'Arc'
    x: number
    y: number
    radius: number
    startAngle: number
    endAngle: number
    anticlockwise: boolean
	constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean){
		this.x = x
		this.y = y
		this.radius = radius
		this.startAngle = startAngle
		this.endAngle = endAngle
		this.anticlockwise = anticlockwise
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: any){
		const [_x, _y] = instance.getPosition()
		ctx.arc(this.x + _x, this.y + _y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
	}
}