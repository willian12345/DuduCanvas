import DisplayObject from "../DisplayObject"
export default class ClearRect{
    x: number
    y: number
    w: number
    h: number
	constructor(x: number, y: number, w: number, h: number){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject) {
		const [_x, _y] = instance.getPosition()
		ctx.clearRect(this.x + _x, this.y + _y, this.w, this.h)
	}
}