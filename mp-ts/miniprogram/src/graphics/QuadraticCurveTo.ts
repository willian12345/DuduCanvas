import DisplayObject from "../DisplayObject"

/**
 * 二次贝塞尔曲线
 * 提示：二次贝塞尔曲线需要两个点。第一个点是用于二次贝塞尔计算中的控制点，第二个点是曲线的结束点。
 * 曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点
 */
export default class QuadraticCurveTo {
    cpx: number
    cpy: number
    x: number
    y: number
    constructor(cpx: number, cpy: number, x: number, y: number) {
        this.cpx = cpx
        this.cpy = cpy
        this.x = x
        this.y = y
    }
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject) {
        const [_x, _y] = instance.getPosition()
        ctx.quadraticCurveTo(this.cpx + _x, this.cpy + _y, this.x + _x, this.y + _y)
    }
}