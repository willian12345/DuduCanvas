import DisplayObject from './DisplayObject.js'
import { draw } from './config'

export default class Stage extends DisplayObject {
	constructor(id, callback, PageInstance) {
	  super()
		// canvas 旧接口
		
		const query = wx.createSelectorQuery()
		query.select(id)
		.fields({node: true, size: true})
		.exec(res => {
			const data = res[0]
			// canvas 新接口, 还处于公测阶段
			// this.context = canvas.getContext('2d')
			if(data){
				this.width = data.width
				this.height = data.height

				if(data.node){
					this._context = canvas.getContext('2d')
				}else{
					this._context = wx.createCanvasContext(id.slice(1), PageInstance)
				}
				DisplayObject.setContext(this._context)	
				callback(this, this._context)
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
	render(){
		// 调用 draw 方法绘制自身级子级
		this[draw]()
		// 调用 canvas draw 方法渲染图像
		this._context.draw(false)
	}
}
