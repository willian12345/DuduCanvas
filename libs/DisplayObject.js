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
			// 如果添加的对象有 mask 遮罩则 mask 也指定父级，以对应对象的坐标
			if(v.mask){
				v.mask.parent = this
			}
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
		let x = this.x - this.regX, y = this.y - this.regY
		while(parent && parent.name != 'Stage'){
			x += parent.x - parent.regX
			y += parent.y - parent.regY
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
	 * 先形变后再绘制
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
		// console.log(_x, _y, rotation, regPointerX, regPointerY, scaleX, scaleY)
		return [_x, _y, rotation, regPointerX, regPointerY, scaleX, scaleY]
	}
	/**
	 * 
	 * 获取旋转后的坐标
	 */
	getPosAfterRotation(rotation, x, y) {
		const angle = rotation * (Math.PI / 180)
		const _x = Math.cos(angle) * x  - Math.sin(angle) * y
		const _y = Math.cos(angle) * y + Math.sin(angle) * x
		return {x: _x , y: _y}
	}
	/**
	 * 获取对象形变后的位置与宽度
	 * scale 形变不在 getBounds 计算之内
	 * scale 形变后宽高可请自行乘上相应的 scale 倍数
	 */
	getBounds(){
		let x = this.x
		let y = this.y 
		let w = this.width
		let h = this.height
		
		if(this.rotation !== 0){
			let regX = this.regX
			let regY = this.regY
			// left top
			let lt = this.getPosAfterRotation(this.rotation, -regX,  -regY)
			// right top
			let rt = this.getPosAfterRotation(this.rotation, w - regX,  -regY)
			// right bottom
			let rb = this.getPosAfterRotation(this.rotation, w - regX, h - regY)
			// left bottom
			let lb = this.getPosAfterRotation(this.rotation, -regX, h - regY)
			
			lt.x = lt.x + x
			lt.y = lt.y + y
			
			rt.x = rt.x + x
			rt.y = rt.y + y
			
			rb.x = rb.x + x
			rb.y = rb.y + y
			
			lb.x = lb.x + x
			lb.y = lb.y + y

			const posArr = [lt, rt,rb, lb]
			let minX = lt.x
			let maxX = lt.x
			let minY = lt.y
			let maxY = lt.y

			// console.log(lt, rt,rb, lb)

			// 计算最小最大的 x,y 值
			for(var i=1; i<4; i++){
				if(minX > posArr[i].x){
					minX = posArr[i].x
				}
				if(posArr[i].x > maxX){
					maxX = posArr[i].x
				}

				if(minY > posArr[i].y){
					minY = posArr[i].y
				}
				if(posArr[i].y > maxY){
					maxY = posArr[i].y
				}

			}
			
			w = maxX - minX
			h = maxY - minY
		}
		
		return {x, y, w, h,}
	}
	getWidth(){
		this.childs.forEach((v)=>{
			console.log(v)
		})
	}
}

 