let _context = null
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
	scale = 1
	scaleX = 1
	scaleY = 1
	skewX = 0
	skewY = 0
	filters = null
	mask = null
	name = null
	parent = null
	childs = []
	constructor(){
		
	}
	/**
	 * 保存 Stage 时传入 canvas context
	 */
	static setContext(ctx){
		_context = ctx
	}
	addChild(...args){
		// 指定父级
		let childs = args.map((v) => {
			v.parent = this
			return v
		})
		this.childs = this.childs.concat(childs)
	}
	_draw(){
		this.childs.forEach((v)=>{
			v._draw(_context)
		})
	}
}

 