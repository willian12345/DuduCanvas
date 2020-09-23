export default class SetStrokeStyle{
	constructor(color){
		this.color = color
	}
	exec(ctx){
		ctx.setStrokeStyle(this.color)
	}
}