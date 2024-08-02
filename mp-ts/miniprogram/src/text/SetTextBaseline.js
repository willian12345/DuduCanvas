export default class SetTextBaseline {
  constructor(textBaseline){
    this.textBaseline = textBaseline
  }
  exec(ctx){
    ctx.textBaseline = this.textBaseline
  }
}