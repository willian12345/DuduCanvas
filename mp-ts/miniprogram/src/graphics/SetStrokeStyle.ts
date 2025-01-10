export default class SetStrokeStyle{
    style: string
	constructor(style: string){
		this.style = style
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
		ctx.strokeStyle = this.style
	}
}