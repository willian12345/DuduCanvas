export default class Arc {
	constructor(x, y, radius, startAngle, endAngle, anticlockwise){
		this.x = x
		this.y = y
		this.radius = radius
		this.startAngle = startAngle
		this.endAngle = endAngle
		this.anticlockwise = anticlockwise
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		ctx.arc(this.x + _x, this.y + _y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
	}
}