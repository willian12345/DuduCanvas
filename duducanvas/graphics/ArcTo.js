export default class ArcTo {
	constructor(x1, y1, x2, y2, radius){
		this.x1 = x1
		this.y1 = y1
		this.x2 = x2
		this.y2 = y2
		this.radius = radius
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		ctx.arcTo(this.x1 + _x, this.y1 + _y, this.x2 + _x, this.y2 + _y, this.radius)
	}
}