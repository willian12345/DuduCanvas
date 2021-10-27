export default  class SetTextAlign {
  constructor(textAlign){
    this.textAlign = textAlign
  }
  exec(ctx){
    ctx.textAlign = this.textAlign
  }
}