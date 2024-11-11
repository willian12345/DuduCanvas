export default class SetTextBaseline {
  textBaseline: WechatMiniprogram.CanvasRenderingContext.CanvasTextBaseline
  constructor(textBaseline: WechatMiniprogram.CanvasRenderingContext.CanvasTextBaseline){
    this.textBaseline = textBaseline
  }
  exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
    ctx.textBaseline = this.textBaseline
  }
}