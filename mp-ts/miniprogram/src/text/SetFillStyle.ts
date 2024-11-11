export default class SetFillStyle {
  style: string
  constructor(style: string){
    this.style = style
  }
  exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D){
    ctx.fillStyle = this.style
  }
}