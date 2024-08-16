import DisplayObject from "../DisplayObject"

export default class DrawCircle {
    x:number
    y:number
    radius:number
    fill:boolean
	constructor(x: number, y: number, radius: number, fill = false){
		this.x = x
		this.y = y
		this.radius = radius
		this.fill = fill
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject){
		const [_x, _y] = instance.getPosition()
		// 要先 beginPath 重新开始 path 以防之前就有开始的路径影响
    ctx.beginPath()
    ctx.arc(this.x + _x, this.y + _y, this.radius, 0, 2 * Math.PI)
    console.log(this.x , this.y,_x, _y )
		if(instance.isMask){
			// ctx.clip()
		}else{
			if(this.fill){
				ctx.fill()
			}
		}
	}
}