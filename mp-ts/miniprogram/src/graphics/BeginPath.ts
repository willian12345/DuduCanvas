export default class BeginPath {
	constructor(){}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D) {
		ctx.beginPath()
	}
}