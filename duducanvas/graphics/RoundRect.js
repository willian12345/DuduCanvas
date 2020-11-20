export default class RoundRect{
	constructor(x, y, width, height, radius, fill, stroke){
		
		if (typeof stroke === 'undefined') {
			this.stroke = true;
		}else{
			this.stroke = stroke;
		}
		if (typeof radius === 'undefined') {
			radius = 5;
		}
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.fill = fill
		
		if (typeof radius === 'number') {
			radius = {tl: radius, tr: radius, br: radius, bl: radius};

		}

		const defaultRadius = radius;
		this.radius = {}
		for (let side in defaultRadius) {
			this.radius[side] = this.radius[side] || defaultRadius[side];
		}
		
	}
	exec(ctx, instance){
		// 如果是作为遮罩，则需要获取并参照定位于被遮罩物的坐标
		const [_x, _y] = instance.getPosition()
		let x = _x + this.x,
				y = _y + this.y,
				radius = this.radius,
				width = this.width,
				height = this.height
		let fill, stroke
		if(instance.masked){ // instance.isMask
			fill = false
			stroke = false
		}else{
			fill = this.fill
			stroke = this.stroke
		}
		// 该方法来自网络，相比于使用 arc 绘制各个角，此方法可以模拟 css 的 border-radius
		ctx.beginPath();
		// ctx.fillStyle = '#ff0000'
		ctx.moveTo(x + radius.tl, y);
		ctx.lineTo(x + width - radius.tr, y);
		// quadraticCurveTo(控制点: cpx, cpy, 终点: x, y)
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		ctx.lineTo(x + width, y + height - radius.br);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
		ctx.lineTo(x + radius.bl, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
		ctx.lineTo(x, y + radius.tl);
		ctx.quadraticCurveTo(x, y, x + radius.tl, y);
		ctx.closePath();
		if(instance.isMask){
			ctx.clip()
		}else {
			if (fill) {
				ctx.fill();
			}
			if (stroke) {
				ctx.stroke();
			}
		}
	}
}