export default class SetFillStyle {
  constructor(style){
    this.style = style
  }
  exec(ctx){
    ctx.fillStyle = this.style
  }
}