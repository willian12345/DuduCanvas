import { getPosAfterRotation, getMaxValue, findNodes }  from './utils'
import { draw, getAlpha } from './config'
let context = null
let displayObjectId = 0
const id = Symbol('id')
const scale = Symbol('scale')
const mask = Symbol('mask')

const getBounds = Symbol('getBounds')
const setShadow = Symbol('setShadow')


/**
 * 显示对象类
 */

export default class DisplayObject {
	name = "DisplayObject"
	x = 0
	y = 0
	width = 0
	height = 0
	alpha = 1
	regX = 0
	regY = 0
	scaleX = 1
	scaleY = 1
	rotation = 0
	parent = null
	childs = []
	shadow = ''
	// skewX = 0
	// skewY = 0
	constructor(){
		this[scale] = 1
		this[id] = displayObjectId++
	}
	get mask(){
		return this[mask]
	}
	set mask(s){
		if(s.name !== 'Shape'){
			throw new Error('遮罩必须是 Shape 对象')
		}
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
		const childs = args.map((v, index) => {
			if(v[id] === this[id]){
				throw new Error(`不能自己添加自己为 child :${v.name}`)
			}else if(v.isMask){
				throw new Error(`已被设置成 mask 遮罩 不能 addChild 到其它父级内:${v.name}`)
			}
			// 如果添加的对象有 mask 遮罩则 mask 也指定父级，以对应对象的坐标
			if(v.mask){
				v.mask.parent = this
			}
			v.parent = this
			v.zIndex = index
			return v
		})
		
		this.childs = this.childs.concat(childs)
	}
	// 删除子元素
	removeChild(child){
		this.childs = this.childs.filter( v =>  v[id] != child[id])
	}
	// 绘制
	[draw](){
		this.childs.forEach((v)=>{
			// 绘制前压栈
			context.save()
			// canvas 上下文 context 先 transform 
			this.transform(v, context)
			

			// 设置投影
			if(v.shadow.length){
				this[setShadow](v)
			}

			// 设置 alpha 透明度
			context.globalAlpha = this[getAlpha]()
			context.rotate(0)
			// 递归绘制
			v[draw](context)
			// 绘制完后弹栈
			context.restore()

			// 调试显示可视对象边界线用于调试
			
			// if(!v.sliced){
			// 	const b = v.getBounds()
			// 	context.beginPath();
			// 	context.strokeStyle = 'blue'
			// 	context.strokeRect(b.left,b.top,b.width,b.height);
			// }
		})
	}
	/**
	 * setShadow
	 * 添加阴影效果， 遮罩(clip)过的对象不支持 shadow 效果
	 * @param {*} shadow "10 10 10 black"
	 */
	[setShadow](el){
		const valueArr = el.shadow.split(' ')
		if(el.name === 'Sprite' || el.name === 'Group'){
			throw new Error('Sprite 或 Group 组件对象不允许设置 shadow')
		}
		if(valueArr.length < 4){
			throw new Error('shadow 需要 4 个值 eg: "10 10 10 black"')
		}
		context.shadowOffsetX = valueArr[0]
		context.shadowOffsetY = valueArr[1]
		context.shadowBlur = valueArr[2]
		context.shadowColor = valueArr[3];
	}
	/**
	 * 获取元素透明度
	 */
	[getAlpha](){
		let parent = this.parent
		let alpha = this.alpha
		while(parent && parent.name != 'Stage'){
			alpha *= parent.alpha
			parent = parent.parent
		}
		return alpha
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
		// 角度不需要根据父级计算叠加
		let parent = this.parent
		let rotation = this.rotation
		// while(parent && parent.name != 'Stage'){
		// 	rotation = parent.rotation
		// 	parent = parent.parent
		// }
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
	 * 移动、缩放、旋转 canvas
	 */
	transform(v, context){
		if(v.name === 'Stage') return
		const ctx = context
		const [_x, _y] = v.getPosition()
		const rotation = v.getRotation()
		let [scaleX, scaleY] = [v.scaleX, v.scaleY]
		const regPointerX = _x + v.regX
		const regPointerY = _y + v.regY
		// 变形过程顺序必须为先移动位置，再放大缩小或旋转
		// 再移动回原来的位置
		ctx.translate(regPointerX, regPointerY)
		ctx.scale(scaleX, scaleY)
		ctx.rotate(rotation * Math.PI / 180)
		ctx.translate(-regPointerX, -regPointerY)	
		// return [_x, _y, rotation, regPointerX, regPointerY, scaleX, scaleY]
		return this
	}

	getRectangleRotatedPosition(rotation, w, h, regX, regY){
		// 获取左上、右上、右下，左下绕自身注册点旋转后的坐标
		// left top
		let lt = getPosAfterRotation(rotation, -regX,  -regY)
		// right top
		let rt = getPosAfterRotation(rotation, w - regX,  -regY)
		// right bottom
		let rb = getPosAfterRotation(rotation, w - regX, h - regY)
		// left bottom
		let lb = getPosAfterRotation(rotation, -regX, h - regY)
		
		return [lt, rt, rb, lb]
	}
	/**
	 * 获取对象形变后的相较于舞台的绝对位置与宽度
	 * scale 形变不在 getBounds 计算之内
	 * scale 形变后宽高可请自行乘上相应的 scale 倍数
	 */
	[getBounds](){
		let [x, y] = this.getPosition()
		let w = this.width
		let h = this.height
		let regX = this.regX
		let regY = this.regY
		
		if(this.rotation !== 0){
			const arr = this.getRectangleRotatedPosition(this.rotation, w, h, regX, regY)
			// 相对坐标+原本的 x y 值成为绝对坐标
			arr.map( v =>{
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
		const arr = []
		findNodes(node).map( v => {
			arr.push(v[getBound]())
		})
		return arr
	}
	// 获取元素的绝对宽度
	getBounds(){
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
				
				if(this.name === 'Group'){
					// 计算子元素合并宽高后，再继续计算整体旋转后的大小位置
					const rect = new DisplayObject()
					rect.width = right - left
					rect.height = bottom - top
					rect.x = this.x
					rect.y = this.y
					rect.regX = this.regX
					rect.regY = this.regY
					rect.rotation = this.rotation
					return this[getBounds].call(rect)
				}else{
					return {left, top, right, bottom, width: right - left, height: bottom - top}
				}
			}
		}
	}
}