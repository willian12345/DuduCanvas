import DisplayObject from './DisplayObject.js'
import { draw } from './config'

export default class Stage extends DisplayObject {
	constructor(id, callback, PageInstance) {
	  super()
		// canvas 旧接口
		this._context = wx.createCanvasContext(id, PageInstance)
		DisplayObject.setContext(this._context)
		callback(this, this._context)

		// canvas 新接口, 还处于公测阶段
		// const query = wx.createSelectorQuery()
		// query.select(id)
		// .fields({ node: true, size: true })
		// .exec((res) => {
		// 	const canvas = res[0].node
			
		// 	// 公测新接口
		// 	// this.context = canvas.getContext('2d')
			
		// 	this.width = canvas.width
		// 	this.height = canvas.height
		// 	this.canvas = canvas
			
		// })
	}
	name = 'Stage'
	canvas = null
	getContext(){
		return this._context
	}
	render(){
		this[draw]()
		this._context.draw(false)
	}
}
