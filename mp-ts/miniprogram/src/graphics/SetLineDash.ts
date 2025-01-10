
export default class SetLineDash {
    lineDash: number[]
  constructor(dash:number[] = []){
    this.lineDash = dash
  }
  exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
		ctx.setLineDash(this.lineDash)
	}
}