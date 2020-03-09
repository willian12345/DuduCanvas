export default class DisplayObject {
	constructor(){
		
	}
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
	_childs = []
	addChild(...args){
		let childs = args.map((v) => {
			v.parent = this
			return v
		})
		this._childs = this._childs.concat(childs)
	}
	_draw(){
		this._childs.forEach((v)=>{
			v.draw(this.context)
		})
	}
	context = null
	parent = null
}

 