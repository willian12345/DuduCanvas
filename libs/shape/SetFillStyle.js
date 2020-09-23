export default class SetFillStyle{
	constructor(color){
		this.color = color
	}
	exec(ctx){
		ctx.setFillStyle(this.color)
	}
}