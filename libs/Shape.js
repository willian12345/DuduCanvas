import DisplayObject from './DisplayObject.js'
const append = Symbol('append')
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
		let [_x, _y] = instance.getPosition()
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
		ctx.LineTo(this.x + _x, this.y + _y)	
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
		let [_x, _y] = instance.getPosition()
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
		let [_x, _y] = instance.getPosition()
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
		let centerPointerX = this.radius + this.x
		let centerPointerY = this.radius + this.y
		
		ctx.save()
		ctx.translate(centerPointerX, centerPointerY)
		ctx.rotate(instance.rotate)
		ctx.translate(-centerPointerX, -centerPointerY)
		ctx.beginPath()
		ctx.arc(this.x + _x, this.y + _y, this.radius, 0, 2 * Math.PI)
		if(this.fill){
			ctx.fill()
		}
		ctx.closePath()
		
		ctx.restore()
	}
}

/**
 * 属性变形
 */
const transformProps = (ctx, instance) => {
	let [_x, _y] = instance.getPosition()
	let _rotate = instance.getRotate()
	// 如果有父级，且父级有旋转
	let p = instance.parent
	let regPointerX = _x + instance.regX
	let regPointerY = _y + instance.regY
	ctx.save()
	if(p && p.name != 'Stage' && p.rotate){
		let [_x, _y] = p.getPosition()
		regPointerX = _x + p.regX
		regPointerY = _y + p.regY
	}
	console.log(_rotate)
	ctx.translate(regPointerX, regPointerY)
	ctx.rotate(_rotate)
	ctx.translate(-regPointerX, -regPointerY)
};


class FillRect{
	constructor(x, y, w, h){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}
	exec(ctx, instance){
		let [_x, _y] = instance.getPosition()
		let dx = this.x + _x
		let dy = this.y + _y
		transformProps.call(this, ctx, instance)
		ctx.fillRect(dx, dy, this.w, this.h)
		ctx.restore()
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
		let [_x, _y] = instance.getPosition()
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
		let [_x, _y] = instance.getPosition()
		ctx.clearRect(this.x + _x, this.y + _y, this.w, this.h)
	}
}





export default class Shape extends DisplayObject{
	name = 'Shape'
	constructor(){
		super()

		// 指令集
		this[instructions] = []
		
	}
	_draw(context){
		this[instructions].map((instruction) => {
			instruction.exec(context, this)
		})
	}
	
	[append](instructionsObject) {
		this[instructions].push(instructionsObject)
	}
	fillCircle(x, y, radius){
		this[append](new DrawCircle(x, y, radius, true))
	}
	drawCircle(x, y, radius){
		this[append](new DrawCircle(x, y, radius))
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
			this[append](new LoveTo(x, y))
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
			this[append](new DrawCircle(x, y, radius, true))
			return this.graphics
		},
		fillRect: (x=0, y=0, w=10, h=20) => {
			this.width = w
			this.height = h
			this[append](new FillRect(x, y, w, h))
			return this.graphics
		},
		/**
		 * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
		 */
		strokeRect: (x=0, y=0, w=10, h=20) => {
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
}

 