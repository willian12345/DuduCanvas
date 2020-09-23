export default class LineTo {
	constructor(x, y){
		this.x = x
		this.y = y
	}
	exec(ctx, instance){
		let [_x, _y] = instance.getPosition()
		ctx.lineTo(this.x + _x, this.y + _y)	
	}
}