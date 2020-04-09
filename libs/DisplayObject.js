let _context = null
export default class DisplayObject {
	name = "DisplayObject"
	width = 0
	height = 0
	x = 0
	y = 0
	visible = true
	alpha = 1
	regX = 0
	regY = 0
	scale = 1
	scaleX = 1
	scaleY = 1
	rotation = 0
	skewX = 0
	skewY = 0
	filters = null
	mask = null
	name = null
	parent = null
	childs = []
	constructor(){
		
	}
	/**
	 * 保存 Stage 时传入 canvas context
	 */
	static setContext(ctx){
		_context = ctx
	}
	static getContext(){
		return _context
	}
	addChild(...args){
		// 指定父级
		const childs = args.map((v) => {
			v.parent = this
			return v
		})
		this.childs = this.childs.concat(childs)
	}
	_draw(){
		this.childs.forEach((v)=>{
			this.transform(v, _context)
			v._draw(_context)
			_context.restore()
		})
	}
	/**
	 * getPosition 获取实例距画布左上角原点(0,0)的绝对位置
	 * @return {[x, y]} 返回数组
	 */
	getPosition(){
		let parent = this.parent
		let x = this.x, y = this.y
		while(parent && parent.name != 'Stage'){
			x += parent.x
			y += parent.y
			parent = parent.parent
		}
		return [x, y]
	}
	/**
	 * 获取旋转角度
	 */
	getRotation(){
		let parent = this.parent
		let rotation = this.rotation
		
		while(parent && parent.name != 'Stage'){
			rotation += parent.rotation
			parent = parent.parent
		}
		return rotation
	}
	transform(v, _context){
		if(v.name == 'Stage') return
		const ctx = _context
		const [_x, _y] = v.getPosition()
		const rotation = v.getRotation()
		const regPointerX = _x + v.regX
		const regPointerY = _y + v.regY
		
		
		if(rotation){
			ctx.save()
			ctx.translate(regPointerX, regPointerY)
			ctx.rotate(rotation * Math.PI / 180)
			ctx.translate(-regPointerX, -regPointerY)	
		}
	}
	getBounds(){
		return {x:0, y:0, w:0, h:0,}
	}
}

 