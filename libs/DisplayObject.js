let _context = null
let scale = Symbol('scale')
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
	get scale(){
		return this[scale]
	}
	set scale(s) {
		this.scaleX = s
		this.scaleY = s
		this[scale] = s
	}
	constructor(){
		this[scale] = 1
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
			_context.save()
			// canvas 上下文 context 先形变
			this.transform(v, _context)
			// 再开始绘制
			v._draw(_context)
			// 绘制完后弹栈
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
	getScale(){
		let parent = this.parent
		let scale = this.scale
		let scaleX = this.scaleX
		let scaleY = this.scaleY
		while(parent && parent.name != 'Stage'){
			scaleX += parent.scaleX
			scaleY += parent.scaleY
			parent = parent.parent
		}
		return [scaleX, scaleY]
	}
	transform(v, _context){
		if(v.name == 'Stage') return
		const ctx = _context
		const [_x, _y] = v.getPosition()
		const rotation = v.getRotation()
		let [scaleX, scaleY] = v.getScale()

		const regPointerX = _x + v.regX
		const regPointerY = _y + v.regY
		
		ctx.translate(regPointerX, regPointerY)
		ctx.scale(scaleX,scaleY)
		ctx.rotate(rotation * Math.PI / 180)
		ctx.translate(-regPointerX, -regPointerY)	
	}
	getBounds(){
		return {x:0, y:0, w:0, h:0,}
	}
}

 