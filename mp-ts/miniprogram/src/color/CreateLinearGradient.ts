import DisplayObject from "../DisplayObject"

export default class CreateLinearGradient {
    name = 'CreateLinearGradient'
    colorStops: [number, string][] = []
  /**
   * x0	渐变开始点的 x 坐标
   * y0	渐变开始点的 y 坐标
   * x1	渐变结束点的 x 坐标
   * y1	渐变结束点的 y 坐标
   */
    x0: number
    y0: number
    x1: number
    y1: number
constructor(x0: number, y0: number, x1: number, y1: number){
    this.x0 = x0
    this.y0 = y0
    this.x1 = x1
    this.y1 = y1
}
exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject){
    const [_x, _y] = instance.getPosition()
    const gradient = ctx.createLinearGradient(this.x0 + _x, this.y0 + _y, this.x1 + _x, this.y1 + _y)
    this.colorStops.map(v => gradient.addColorStop(v[0], v[1]))
    return gradient
}
addColorStop(percent: number, color: string){
    this.colorStops.push([percent, color])
}
}