export default class Rect{
	constructor(x, y, w, h, isStroke=false){
		this.x = x
		this.y = y
		this.w = w
    this.h = h
    this.isStroke = isStroke
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		const dx = this.x + _x
		const dy = this.y + _y
		// 要先 beginPath 重新开始 path 以防之前就有开始的路径影响
		ctx.beginPath()
		if(instance.isMask){
			ctx.rect(dx, dy, this.w, this.h)
			ctx.clip()
		}else{
      if(this.isStroke){
        ctx.strokeRect(dx, dy, this.w, this.h)
      }else{
        ctx.fillRect(dx, dy, this.w, this.h)
      }
		}
	}
}