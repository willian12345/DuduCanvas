import DisplayObject from "../DisplayObject"

export default class CreateRadialGradient {
  name = 'CreateRadialGradient'
  colorStops: [number, string][] = []
  /**
   * x0 开始圆形的 x 轴坐标。
   * y0 开始圆形的 y 轴坐标。
   * r0 开始圆形的半径。
   * x1 结束圆形的 x 轴坐标。
   * y1 结束圆形的 y 轴坐标。
   * r1 结束圆形的半径。
   */
  x0: number
  y0: number
  r0: number
  x1: number
  y1: number
  r1: number
  constructor(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number){
    this.x0 = x0
    this.y0 = y0
    this.r0 = r0
    this.x1 = x1
    this.y1 = y1
    this.r1 = r1
  }
  create(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, x0: number, y0: number, r0: number, x1: number, y1: number, r1: number){
    console.log(x0, y0, r0, x1, y1, r1)
    return ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)
  }
  exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject){
    const [_x, _y] = instance.getPosition()
    const gradient = this.create(ctx, this.x0 + _x, this.y0 + _y, this.r0, this.x1 + _x, this.y1 + _y, this.r1)
    this.colorStops.map( v => gradient.addColorStop(v[0], v[1]))
    return gradient
  }
  addColorStop(percent: number, color: string){
    this.colorStops.push([percent, color])
  }
}