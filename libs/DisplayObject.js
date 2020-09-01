/**
 * 显示对象类
 */
let _context = null
let scale = Symbol('scale')
let mask = Symbol('mask')
let _id = 1
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
	name = null
	parent = null
	childs = []
	get mask(){
		return this[mask]
	}
	set mask(s){
		s.isMask = true
		this[mask] = s
	}
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
		this._id = _id++
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
	// 添加子元素
	addChild(...args){
		// 指定父级
		const childs = args.map((v) => {
			if(v._id === this._id){
				throw new Error(`不能自己添加自己为 child :${v.name}`)
			}else if(v.isMask){
				throw new Error(`已被设置成 mask 遮罩 不能 addChild 到其它父级内:${v.name}`)
			}
			v.parent = this
			return v
		})
		
		this.childs = this.childs.concat(childs)
	}
	// 删除子元素
	removeChild(child){
		this.childs = this.childs.filter( v =>  v != child)
	}
	// 递归绘制
	_draw(){
		this.childs.forEach((v)=>{
			// 绘制前压栈
			_context.save()
			// canvas 上下文 context 先 transform 
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
	/**
	 * 获取缩放程度
	 */
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
	/**
	 * 移动、缩放、旋转 canvas “坐标矩阵”
	 */
	transform(v, _context){
		if(v.name == 'Stage') return
		const ctx = _context
		const [_x, _y] = v.getPosition()
		const rotation = v.getRotation()
		let [scaleX, scaleY] = [v.scaleX, v.scaleY]

		const regPointerX = _x + v.regX
		const regPointerY = _y + v.regY
		ctx.translate(regPointerX, regPointerY)
		ctx.scale(scaleX, scaleY)
		ctx.rotate(rotation * Math.PI / 180)
		ctx.translate(-regPointerX, -regPointerY)	
		return [_x, _y, rotation, regPointerX, regPointerY, scaleX, scaleY]
	}
	getBounds(){
		return {x:0, y:0, w:0, h:0,}
	}
}

 