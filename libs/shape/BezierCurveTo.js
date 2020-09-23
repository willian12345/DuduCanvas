export default class BezierCurveTo {
  constructor(cp1x, cp1y, cp2x, cp2y, x, y){
    this.cp1x = cp1x
		this.cp1y = cp1y
    this.cp2x = cp2x
		this.cp2y = cp2y
		this.x = x
		this.y = y
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
    ctx.bezierCurveTo(this.cp1x + _x, this.cp1y + _y, this.cp2x + _x, this.cp2y + _y, this.x + _x, this.y + _y)
	}
}