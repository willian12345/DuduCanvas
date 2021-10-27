export default class ClearRect{
	constructor(x, y, w, h){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		ctx.clearRect(this.x + _x, this.y + _y, this.w, this.h)
	}
}