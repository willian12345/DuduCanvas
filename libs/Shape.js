/**
 * Shape 图形类
 * 1、包含了各类绘制 api
 * 2、Shape 对象内 通过 graphics 对象可以绘制无限个图形
 * 3、所有绘制 api 命令都存在于 graphics 对象内， graphics 绘制在 Shape 对象内不参与 z 轴排序
 * 
 */
import DisplayObject from './DisplayObject.js'
const append = Symbol('append')
const bounds = Symbol('bounds')
const instructions = Symbol('instructions')

class BeginPath {
	constructor(){}
	exec(ctx) {
		ctx.beginPath()
	}
}

class MoveTo {
	constructor(x, y){
		this.x = x
		this.y = y
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		ctx.moveTo(this.x + _x, this.y + _y)	
	}
}

class LineTo {
	constructor(x, y){
		this.x = x
		this.y = y
	}
	exec(ctx, instance){
		let [_x, _y] = instance.getPosition()
		ctx.lineTo(this.x + _x, this.y + _y)	
	}
}

class Arc {
	constructor(x, y, radius, startAngle, endAngle, anticlockwise){
		this.x = x
		this.y = y
		this.radius = radius
		this.startAngle = startAngle
		this.endAngle = endAngle
		this.anticlockwise = anticlockwise
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		ctx.arc(this.x + _x, this.y + _y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
	}
}
class ArcTo {
	constructor(x1, y1, x2, y2, radius){
		this.x1 = x1
		this.y1 = y1
		this.x2 = x2
		this.y2 = y2
		this.radius = radius
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		ctx.arcTo(this.x1 + _x, this.y1 + _y, this.x2 + _x, this.y2 + _y, this.radius)
	}
}

class Stroke {
	exec(ctx){
		ctx.stroke()
	}
}
class Fill {
	exec(ctx){
		ctx.fill()
	}
}
class SetFillStyle{
	constructor(color){
		this.color = color
	}
	exec(ctx){
		ctx.setFillStyle(this.color)
	}
}
class SetStrokeStyle{
	constructor(color){
		this.color = color
	}
	exec(ctx){
		ctx.setStrokeStyle(this.color)
	}
}

class Clip{
	exec(ctx){
		ctx.clip()
	}
}

class DrawCircle {
	constructor(x, y, radius, fill = false){
		this.x = x
		this.y = y
		this.radius = radius
		this.fill = fill
		
	}
	exec(ctx, instance){
		let [_x, _y] = instance.getPosition()
		// 要先 beginPath 重新开始 path 以防之前就有开始的路径影响
		ctx.beginPath()
		ctx.arc(this.x + _x, this.y + _y, this.radius, 0, 2 * Math.PI)
		if(instance.isMask){
			ctx.clip()
		}else{
			if(this.fill){
				ctx.fill()
			}
		}
	}
}



class FillRect{
	constructor(x, y, w, h){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		const dx = this.x + _x
		const dy = this.y + _y
		// 要先 beginPath 重新开始 path 以防之前就有开始的路径影响
		ctx.beginPath()
		if(instance.isMask){
			ctx.rect(dx, dy, this.w, this.h)
			// ctx.clip()
		}else{
			ctx.fillRect(dx, dy, this.w, this.h)
		}
	}
}
class StrokeRect{
	constructor(x, y, w, h){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		ctx.strokeRect(this.x + _x, this.y + _y, this.w, this.h)
	}
}

class ClearRect{
	constructor(x, y, w, h){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		ctx.clearRect(this.x + _x, this.y + _y, this.w, this.h)
	}
}


class RoundRect{
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
		let posArr
		// 如果是作为遮罩，则需要获取并参照定位于被遮罩物的坐标
		if(instance.masked){
			posArr = instance.masked.getPosition()
		}else{
			posArr = instance.getPosition()
		}
		const [_x, _y] = posArr
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
		
		ctx.beginPath();
		ctx.moveTo(x + radius.tl, y);
		ctx.lineTo(x + width - radius.tr, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		ctx.lineTo(x + width, y + height - radius.br);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
		ctx.lineTo(x + radius.bl, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
		ctx.lineTo(x, y + radius.tl);
		ctx.quadraticCurveTo(x, y, x + radius.tl, y);
		ctx.closePath();
		
		if(instance.isMask){
			ctx.fill();
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

export default class Shape extends DisplayObject{
	name = 'Shape'
	isMask = false
	constructor(){
		super()
		// 指令集
		this[instructions] = []	
		this[bounds] = []
		this.width = 0
		this.height = 0
	}
	draw(context, isMask){
		this.isMask = !!isMask
		this[instructions].map((instruction) => {
			instruction.exec(context, this)
		})
	}
	[append](instructionsObject) {
		this[instructions].push(instructionsObject)
	}
	graphics = {
		beginPath: () => {
			this[append](new BeginPath())
			return this.graphics
		},
		moveTo: (x, y) => {
			this[append](new MoveTo(x, y))
			return this.graphics
		},
		lineTo: (x, y) => {
			this[append](new LineTo(x, y))
			return this.graphics
		},
		/**
		 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
		 从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
		 */
		arc: (x, y, radius, startAngle, endAngle, anticlockwise = false) => {
			this[append](new Arc(x, y, radius, startAngle, endAngle, anticlockwise))
			return this.graphics
		},
		/**
		 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
		 */
		arcTo: (x1, y1, x2, y2, radius) => {
			this[append](new ArcTo(x1, y1, x2, y2, radius))
			return this.graphics
		},
		stroke: () => {
			this[append](new Stroke())
			return this.graphics
		},
		fill: () => {
			this[append](new Fill())
			return this.graphics
		},
		fillStyle: color => {
			this[append](new SetFillStyle(color))
			return this.graphics
		},
		strokeStyle: color => {
			this[append](new SetStrokeStyle(color))
			return this.graphics
		},
		fillCircle: (x=0, y=0, radius=20) => {
			this[bounds].push({x: x, y: y, w: radius, h: radius})
			this[append](new DrawCircle(x, y, radius, true))
			return this.graphics
		},
		fillRect: (x=0, y=0, w=10, h=20) => {
			this[bounds].push({x: x, y: y, w: w, h: h})
			this[append](new FillRect(x, y, w, h))
			return this.graphics
		},
		fillRoundRect: (x=0, y=0, w=10, h=10, radius=8, fill, stroke) => {
			this[bounds].push({x: x, y: y, w: w, h: h})
			this[append](new RoundRect(x, y, w, h, radius, fill, stroke))
			return this.graphics
		},
		/**
		 * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
		 */
		strokeRect: (x=0, y=0, w=10, h=20) => {
			this[bounds].push({x: x, y: y, w: w, h: h})
			this[append](new StrokeRect(x,y,w,h))
			return this.graphics
		},
		/**
		 * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方
		 */
		clearRect: (x, y, w, h) => {
			this[append](new ClearRect(x, y, w, h))
			return this.graphics
		}
	}
	// getBounds(){
	// 	let x=this.x, y=this.y, w=0, h=0
	// 	this[bounds].forEach(ins => {
	// 		const distanceW = ins.w + ins.x
	// 		const distanceH = ins.h + ins.y
	// 		if(w < distanceW){
	// 			w = distanceW
	// 		}
	// 		if(h < distanceH){
	// 			h = distanceH
	// 		}
	// 	})
	// 	return {x,y,w,h}
	// }
}

 