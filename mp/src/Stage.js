import DisplayObject from './DisplayObject.js'
import { draw, createSelectorQuery, createCanvasContext } from './config'
const render = Symbol('render')
/**
 * Stage
 * 舞台对象
 * 所有显示对象都在舞台对象下，舞台通过渲染函数 
 * Stage 的 render 发起所有子元素的 draw 方法调用
 * 子元素自身再递归调用子元素 draw 方法
 */
export default class Stage extends DisplayObject {
	/**
	 * 
	 * @param {*} id canvas id
	 * @param {*} callback 初始化舞台后的回调
	 * @param {*} componentInstance 如果是在自定义组件内，则需要将组件实例 this 传进来
	 */
	constructor(id, callback, componentInstance) {
	  super()
		const query = componentInstance ? createSelectorQuery().in(componentInstance) : createSelectorQuery()
		
		query.select(id)
		.fields({node: true, size: true})
		.exec(res => {
			const data = res[0]
			if(data){
				this.width = data.width
				this.height = data.height
				this._context = createCanvasContext(id.slice(1), componentInstance)
				DisplayObject.setContext(this._context)	
				callback(this, this._context)
				// 自动调用一次渲染
				this[render]()
			}else{
				throw new Error('无法找到 canvas ')
			}
		})
	}
	name = 'Stage'
	canvas = null
	/**
	 * 获取 canvas 上下文
	 */
	getContext(){
		return this._context
	}
	/**
	 * 重新渲染舞台
	 */
	update(){
		this[render]()
	}
	[render](){
		this._context.clearRect(0, 0, this.width, this.height)
		// 调用 canvas draw 方法渲染图像
		this[draw]()
		this._context.draw(false)
	}
}
