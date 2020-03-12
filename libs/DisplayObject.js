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
	static getContext(){
		return _context
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
	/**
	 * getPosition 获取自己绝对位置
	 * @return {[x, y]} 返回数组
	 */
	getPosition(){
		let parent = this.parent
		let x = this.x, y = this.y
		
		while(parent && parent.name != 'Stage'){
			x = this.x + parent.x
			y = this.y + parent.y
			parent = parent.parent
		}
		return [x, y]
	}
	getBounds(){
		return {x:0, y:0, w:0, h:0,}
	}
}

 