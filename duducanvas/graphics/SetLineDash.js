export default class SetLineDash {
  constructor(dash = []){
    this.lineDash = dash
  }
  exec(ctx, instance){
		ctx.setLineDash(this.lineDash)
	}
}