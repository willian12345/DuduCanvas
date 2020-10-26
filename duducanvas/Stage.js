import DisplayObject from './DisplayObject.js'
import { draw, createSelectorQuery, createCanvasContext } from './config'
const render = Symbol('render')

export default class Stage extends DisplayObject {
	constructor(id, callback, PageInstance) {
	  super()
		const query = createSelectorQuery()
		query.select(id)
		.fields({node: true, size: true})
		.exec(res => {
			const data = res[0]
			if(data){
				this.width = data.width
				this.height = data.height

				if(data.node){
					const canvas = data.node
					// canvas 新接口, 还处于公测阶段
					this._context = canvas.getContext('2d')
				}else{
					// 旧接口
					this._context = createCanvasContext(id.slice(1), PageInstance)
				}
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
	getContext(){
		return this._context
	}
	update(){
		this[render]()
	}
	[render](){
		this._context.clearRect(0, 0, this.width, this.height)
		// 调用 draw 方法绘制自身级子级
		this[draw]()
		// 调用 canvas draw 方法渲染图像
		this._context.draw(false)
	}
}
