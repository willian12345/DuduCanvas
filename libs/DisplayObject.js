import { getPosAfterRotation, getMaxValue }  from './utils'
import { draw } from './config'

let context = null
const scale = Symbol('scale')
const mask = Symbol('mask')
const nodeBoundArray = Symbol('nodeBoundArray')
const getBound = Symbol('getBound')
let id = 1


/**
 * 显示对象类
 */

export default class DisplayObject {
	name = "DisplayObject"
	x = 0
	y = 0
	width = 0
	height = 0
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
	constructor(){
		this[scale] = 1
		this.id = id++
	}
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
	
	/**
	 * 保存 Stage 时传入 canvas context
	 */
	static setContext(ctx){
		context = ctx
	}
	static getContext(){
		return context
	}
	// 添加子元素
	addChild(...args){
		// 指定父级
		const childs = args.map((v) => {
			if(v.id === this.id){
				throw new Error(`不能自己添加自己为 child :${v.name}`)
			}else if(v.isMask){
				throw new Error(`已被设置成 mask 遮罩 不能 addChild 到其它父级内:${v.name}`)
			}

			// 如果添加的对象有 mask 遮罩则 mask 也指定父级，以对应对象的坐标
			if(v.mask){
				v.mask.parent = this
			}else{
				v.parent = this
			}
			return v
		})
		
		this.childs = this.childs.concat(childs)
	}
	// 删除子元素
	removeChild(child){
		this.childs = this.childs.filter( v =>  v.id != child.id)
	}
	// 绘制
	[draw](){
		this.childs.forEach((v)=>{
			// 绘制前压栈
			context.save()
			// canvas 上下文 context 先 transform 
			this.transform(v, context)
			// 递归绘制
			v[draw](context)
			// 绘制完后弹栈
			context.restore()
		})
	}
	/**
	 * getPosition 获取实例距画布左上角原点(0,0)的绝对位置
	 * @return {[x, y]} 返回数组
	 */
	getPosition(){
		let parent
		// 如果自身是 mask 则坐标取被遮罩的对象为父级
		if(this.masked){
			parent = this.masked
		}else{
			parent = this.parent
		}

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
	transform(v, context){
		if(v.name == 'Stage') return
		const ctx = context
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
		// return [_x, _y, rotation, regPointerX, regPointerY, scaleX, scaleY]
		return this
	}
	
	/**
	 * 获取对象形变后的相较于舞台的绝对位置与宽度
	 * scale 形变不在 getbound 计算之内
	 * scale 形变后宽高可请自行乘上相应的 scale 倍数
	 */
	[getBound](){
		let [x, y] = this.getPosition()
		let w = this.width
		let h = this.height
		let regX = this.regX
		let regY = this.regY
		if(this.rotation !== 0){
			// 获取左上、右上、右下，左下绕自身注册点旋转后的坐标
			// left top
			let lt = getPosAfterRotation(this.rotation, -regX,  -regY)
			// right top
			let rt = getPosAfterRotation(this.rotation, w - regX,  -regY)
			// right bottom
			let rb = getPosAfterRotation(this.rotation, w - regX, h - regY)
			// left bottom
			let lb = getPosAfterRotation(this.rotation, -regX, h - regY)
			
			// 相对坐标+原本的 x y 值成为绝对坐标
			const arr = [lt, rt, rb, lb]
			arr.map((v)=>{
				v.x = v.x + x + regX
				v.y = v.y + y + regY
			})
			
			// 获取最左，最右，最上最下 坐标
			let [minX, minY, maxX, maxY] = getMaxValue(arr)
			w = maxX - minX
			h = maxY - minY
			x = minX
			y = minY
		}else{
			// 如果对象没有旋转，则简单获取对象的 x y
			x = x
			y = y
		}

		return {left: x, top: y, right: x + w, bottom: y + h, width: w, height: h}
	}
	// 寻找所有子元素的 bounds 边界宽高并存入数组
	findNodesBounds(node){
		this[nodeBoundArray] = this[nodeBoundArray] || []
		const arr = this[nodeBoundArray]
		if(!node.childs.length){
			arr.push(node[getBound]())
		}else{
			node.childs.forEach((v) => {
				if(!v.childs.length){
					const b = v[getBound]()
					arr.push(b)
				}else{
					this.findNodesBounds(v)
				}
			})
		}
		return arr
	}
	// 获取元素的绝对宽度
	getBound(){
		// 如果没有子元素，则直接返回自身的宽度
		if(this.childs.length === 0){
			return this[getBound]()
		}else{
			if(this.childs){
				let bounds = this.findNodesBounds(this)
				const l = []
				const r = []
				const t = []
				const b = []
				bounds.map((v)=>{
					l.push(v.left)
					r.push(v.right)
					t.push(v.top)
					b.push(v.bottom)
				})
			
				const left = Math.min(...l)
				const right = Math.max(...r)
				const top = Math.min(...t)
				const bottom = Math.max(...b)
				return {left, top, right, bottom, width: right - left, height: bottom - top}
			}
		}
	}
}