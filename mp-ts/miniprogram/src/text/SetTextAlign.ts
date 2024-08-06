export default  class SetTextAlign {
  textAlign: WechatMiniprogram.CanvasRenderingContext.CanvasTextAlign
  constructor(textAlign: WechatMiniprogram.CanvasRenderingContext.CanvasTextAlign){
    this.textAlign = textAlign
  }
  exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
    ctx.textAlign = this.textAlign
  }
}