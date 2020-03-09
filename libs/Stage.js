import DisplayObject from './DisplayObject.js'

export default class Stage extends DisplayObject {
	constructor(id, callback, that) {
	  super()
		// 旧接口
		this.context = wx.createCanvasContext(id, that)
		super.context = this.context
		callback(this.context, this)
		// 新接口
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
	update(){
		this._draw()
		this.context.draw(false, ()=>{})
	}
}
