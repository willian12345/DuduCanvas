export default class CreateRadialGradient {
  name = 'CreateRadialGradient'
  colorStops = []
  /**
   * x0	渐变的开始圆的 x 坐标
   * y0	渐变的开始圆的 y 坐标
   * r0	开始圆的半径
   * 注意：小程序不支持后面这三个参数
   * x1	渐变的结束圆的 x 坐标
   * y1	渐变的结束圆的 y 坐标
   * r1	结束圆的半径
   */
  constructor(x0, y0, r0, x1, y1, r1){
    this.x0 = x0
    this.y0 = y0
    this.r0 = r0
    this.x1 = x1
    this.y1 = y1
    this.r1 = r1
  }
  create(ctx, ...args){
    if(ctx.createRadialGradient){
      return ctx.createRadialGradient.apply(this, args)
    }else{
      console.warn('微信小程序不支持传6个参数，请查阅: https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.createCircularGradient.html')
      return ctx.createCircularGradient.apply(this, args)
    }
  }
  exec(ctx, instance){
    const [_x, _y] = instance.getPosition()
    const gradient = this.create(ctx, this.x0 + _x, this.y0 + _y, this.r0, this.x1 + _x, this.y1 + _y, this.r1)
    this.colorStops.map( v => gradient.addColorStop(v[0], v[1]))
    return gradient
  }
  addColorStop(percent, color){
    this.colorStops.push([percent, color])
  }
}