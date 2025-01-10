import DisplayObject from "../DisplayObject"

export default class BezierCurveTo {
    cp1x: number
    cp1y: number
    cp2x: number
    cp2y: number
    x: number
    y: number
    constructor(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
        this.cp1x = cp1x
        this.cp1y = cp1y
        this.cp2x = cp2x
        this.cp2y = cp2y
        this.x = x
        this.y = y
    }
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject) {
        const [_x, _y] = instance.getPosition()
        ctx.bezierCurveTo(this.cp1x + _x, this.cp1y + _y, this.cp2x + _x, this.cp2y + _y, this.x + _x, this.y + _y)
    }
}